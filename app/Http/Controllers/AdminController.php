<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Event;
use App\Models\Order;
use App\Models\Revenue;
use App\Models\Ticket;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Total Users by Role
        $totalCustomers = User::where('role', 'customer')->count();
        $totalPromotors = User::where('role', 'partner')->count();
        $totalAdmins = User::where('role', 'admin')->count();
        $totalUsers = User::count();

        // Events Statistics
        $totalEvents = Event::count();
        $activeEvents = Event::where('date', '>=', now()->toDateString())->count();
        $pastEvents = Event::where('date', '<', now()->toDateString())->count();

        // Orders Statistics
        $totalOrders = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $paidOrders = Order::where('status', 'paid')->count();
        $cancelledOrders = Order::where('status', 'cancelled')->count();

        // Revenue Statistics - perbaikan perhitungan
        // $totalRevenue = Order::where('status', 'paid')->sum('total_price') ?? 0;
        // $monthlyRevenue = Order::where('status', 'paid')
        //     ->whereMonth('created_at', now()->month)
        //     ->whereYear('created_at', now()->year)
        //     ->sum('total_price') ?? 0;
        $totalRevenue = Revenue::sum('total_revenue');
        $monthlyRevenue = Revenue::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_revenue');


        // Tickets Statistics
        $totalTickets = Ticket::count();
        $soldTickets = Order::where('status', 'paid')->sum('quantity') ?? 0;
        $availableTickets = Ticket::sum('available_seats') ?? 0;

        // Recent Activities
        $recentOrders = Order::with(['user', 'event', 'ticket'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $recentEvents = Event::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Top Promotors by Revenue - perbaikan query
        // $topPromotors = User::select('users.*')
        //     ->where('role', 'partner')
        //     ->leftJoin('events', 'users.id', '=', 'events.user_id')
        //     ->leftJoin('orders', function ($join) {
        //         $join->on('events.id', '=', 'orders.event_id')
        //             ->where('orders.status', '=', 'paid');
        //     })
        //     ->groupBy('users.id', 'users.name', 'users.email', 'users.role', 'users.created_at', 'users.updated_at', 'users.email_verified_at')
        //     ->selectRaw('COALESCE(SUM(orders.total_price), 0) as total_revenue')
        //     ->orderBy('total_revenue', 'desc')
        //     ->limit(5)
        //     ->get();
        $topPromotors = User::where('role', 'partner')
            ->leftJoin('revenues', 'users.id', '=', 'revenues.user_id')
            ->groupBy(
                'users.id',
                'users.name',
                'users.email',
                'users.role',
                'users.created_at',
                'users.updated_at',
                'users.email_verified_at'
            )
            ->select(
                'users.*',
                DB::raw('COALESCE(SUM(revenues.total_revenue), 0) as total_revenue')
            )
            ->orderByDesc('total_revenue')
            ->limit(5)
            ->get();


        // Monthly Orders Chart Data (last 6 months)
        $monthlyOrdersData = collect();
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $orderCount = Order::whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year)
                ->count();

            $monthlyOrdersData->push([
                'month' => $date->format('M Y'),
                'orders' => $orderCount
            ]);
        }

        // Monthly Revenue Chart Data (last 6 months)
        $monthlyRevenueData = collect();
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $revenue = Order::where('status', 'paid')
                ->whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year)
                ->sum('total_price') ?? 0;

            $monthlyRevenueData->push([
                'month' => $date->format('M Y'),
                'revenue' => $revenue
            ]);
        }

        return Inertia::render('Admin/Dashboard', [
            'statistics' => [
                'users' => [
                    'total' => $totalUsers,
                    'customers' => $totalCustomers,
                    'promotors' => $totalPromotors,
                    'admins' => $totalAdmins,
                ],
                'events' => [
                    'total' => $totalEvents,
                    'active' => $activeEvents,
                    'past' => $pastEvents,
                ],
                'orders' => [
                    'total' => $totalOrders,
                    'pending' => $pendingOrders,
                    'paid' => $paidOrders,
                    'cancelled' => $cancelledOrders,
                ],
                'revenue' => [
                    'total' => $totalRevenue,
                    'monthly' => $monthlyRevenue,
                ],
                'tickets' => [
                    'total' => $totalTickets,
                    'sold' => $soldTickets,
                    'available' => $availableTickets,
                ],
            ],
            'recentActivities' => [
                'orders' => $recentOrders,
                'events' => $recentEvents,
            ],
            'topPromotors' => $topPromotors,
            'chartData' => [
                'monthlyOrders' => $monthlyOrdersData,
                'monthlyRevenue' => $monthlyRevenueData,
            ],
        ]);
    }

    public function promotor()
    {
        $promotors = User::where('role', 'partner')
            ->with(['events' => function ($query) {
                $query->select(
                    'id',
                    'created_at',
                    'updated_at',
                    'title',
                    'description',
                    'date',
                    'time',
                    'place',
                    'user_id',
                    'poster',
                    'seating_chart'
                );
            }])
            ->get()
            ->map(function ($user) {
                // Perbaikan perhitungan revenue per promotor
                $totalRevenue = DB::table('orders')
                    ->join('events', 'orders.event_id', '=', 'events.id')
                    ->where('events.user_id', $user->id)
                    ->where('orders.status', 'paid')
                    ->sum('orders.total_price') ?? 0;

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'description' => $user->description ?? null,
                    'profile_picture' => $user->profile_picture ?? null,
                    'created_at' => $user->created_at,
                    'total_revenue' => $totalRevenue,
                    'events' => $user->events->map(function ($event) {
                        // Hitung revenue per event
                        $eventRevenue = Order::where('event_id', $event->id)
                            ->where('status', 'paid')
                            ->sum('total_price') ?? 0;

                        return [
                            'id' => $event->id,
                            'created_at' => $event->created_at,
                            'updated_at' => $event->updated_at,
                            'title' => $event->title,
                            'description' => $event->description,
                            'date' => $event->date,
                            'time' => $event->time,
                            'place' => $event->place,
                            'user_id' => $event->user_id,
                            'poster' => $event->poster,
                            'seating_chart' => $event->seating_chart,
                            'revenue' => $eventRevenue,
                        ];
                    }),
                ];
            });

        return Inertia::render('Admin/Promotor', [
            'promotors' => $promotors,
        ]);
    }

    public function laporan()
    {
        // Revenue analytics for admin reports
        $totalRevenue = Order::where('status', 'paid')->sum('total_price') ?? 0;

        // Monthly revenue for the current year
        $monthlyRevenueCurrentYear = collect();
        for ($month = 1; $month <= 12; $month++) {
            $revenue = Order::where('status', 'paid')
                ->whereMonth('created_at', $month)
                ->whereYear('created_at', now()->year)
                ->sum('total_price') ?? 0;

            $monthlyRevenueCurrentYear->push([
                'month' => date('M', mktime(0, 0, 0, $month, 1)),
                'revenue' => $revenue
            ]);
        }

        // Perbaikan query top events
        $topEvents = Event::select([
            'events.id',
            'events.title',
            'events.date',
            'events.user_id',
            DB::raw('COALESCE(SUM(orders.total_price), 0) as total_revenue')
        ])
            ->leftJoin('orders', function ($join) {
                $join->on('events.id', '=', 'orders.event_id')
                    ->where('orders.status', '=', 'paid');
            })
            ->groupBy('events.id', 'events.title', 'events.date', 'events.user_id')
            ->orderBy('total_revenue', 'desc')
            ->limit(10)
            ->with('user:id,name')
            ->get();

        return Inertia::render('Admin/Laporan', [
            'totalRevenue' => $totalRevenue,
            'monthlyRevenue' => $monthlyRevenueCurrentYear,
            'topEvents' => $topEvents,
        ]);
    }

    public function acara()
    {
        // Perbaikan query events dengan revenue
        $events = Event::select([
            'events.id',
            'events.title',
            'events.description',
            'events.poster',
            'events.date',
            'events.time',
            'events.place',
            'events.user_id',
            'events.created_at',
            DB::raw('COALESCE(SUM(orders.total_price), 0) as total_revenue')
        ])
            ->leftJoin('orders', function ($join) {
                $join->on('events.id', '=', 'orders.event_id')
                    ->where('orders.status', '=', 'paid');
            })
            ->with(['user:id,name'])
            ->groupBy(
                'events.id',
                'events.title',
                'events.description',
                'events.poster',
                'events.date',
                'events.time',
                'events.place',
                'events.user_id',
                'events.created_at'
            )
            ->orderBy('events.created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Acara', [
            'events' => $events,
        ]);
    }

    public function customer()
    {
        // Perbaikan query customer dengan total spent dan total tickets purchased
        $customers = User::select([
            'users.*',
            DB::raw('COALESCE(SUM(CASE WHEN orders.status = "paid" THEN orders.total_price END), 0) as total_spent'),
            DB::raw('COUNT(CASE WHEN orders.status = "paid" THEN orders.id END) as total_orders'),
            DB::raw('COALESCE(SUM(CASE WHEN orders.status = "paid" THEN orders.quantity END), 0) as total_tickets_purchased')
        ])
            ->where('users.role', 'customer')
            ->leftJoin('orders', 'users.id', '=', 'orders.user_id')
            ->groupBy(
                'users.id',
                'users.name',
                'users.email',
                'users.role',
                'users.created_at',
                'users.updated_at',
                'users.email_verified_at',
                'users.password',
                'users.remember_token'
            )
            ->orderBy('total_tickets_purchased', 'desc')
            ->get();

        return Inertia::render('Admin/Customer', [
            'customers' => $customers,
        ]);
    }

    public function deleteCustomer(Request $request, $id)
    {
        try {
            // Cari customer berdasarkan ID dan pastikan rolenya customer
            $customer = User::where('id', $id)
                ->where('role', 'customer')
                ->first();

            if (!$customer) {
                return response()->json([
                    'success' => false,
                    'message' => 'Customer tidak ditemukan.'
                ], 404);
            }

            // Simpan nama customer untuk response
            $customerName = $customer->name;

            // Hapus customer (pastikan foreign key constraints diatur dengan benar)
            $customer->delete();

            return response()->json([
                'success' => true,
                'message' => "Customer {$customerName} berhasil dihapus."
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting customer: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menghapus customer.'
            ], 500);
        }
    }

    public function deletePartner(Request $request, $id)
    {
        try {
            // Cari partner berdasarkan ID dan pastikan rolenya partner
            $partner = User::where('id', $id)
                ->where('role', 'partner')
                ->first();

            if (!$partner) {
                return response()->json([
                    'success' => false,
                    'message' => 'Partner tidak ditemukan.'
                ], 404);
            }

            // Simpan nama partner untuk response
            $partnerName = $partner->name;

            // Hapus profile picture jika ada
            if ($partner->profile_picture) {
                Storage::disk('public')->delete($partner->profile_picture);
            }

            // Force delete partner - akan menghapus semua relasi terkait
            $partner->forceDelete();

            return response()->json([
                'success' => true,
                'message' => "Partner {$partnerName} berhasil dihapus secara permanen."
            ]);
        } catch (\Exception $e) {
            Log::error('Error force deleting partner: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menghapus partner secara permanen.'
            ], 500);
        }
    }
}
