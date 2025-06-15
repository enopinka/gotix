<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Event;
use App\Models\Order;
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
        $completedOrders = Order::where('status', 'completed')->count();
        $cancelledOrders = Order::where('status', 'cancelled')->count();

        // Revenue Statistics - calculated from Orders
        $totalRevenue = Order::where('status', 'completed')->sum('total_price');
        $monthlyRevenue = Order::where('status', 'completed')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');
        
        // Tickets Statistics
        $totalTickets = Ticket::count();
        $soldTickets = Order::where('status', 'completed')->sum('quantity');
        $availableTickets = Ticket::sum('available_seats');

        // Recent Activities
        $recentOrders = Order::with(['user', 'event', 'ticket'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $recentEvents = Event::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Top Promotors by Revenue - calculated from Orders through Events
        $topPromotors = User::where('role', 'partner')
            ->withSum([
                'events as total_revenue' => function($query) {
                    $query->join('orders', 'events.id', '=', 'orders.event_id')
                          ->where('orders.status', 'completed');
                }
            ], 'orders.total_price')
            ->orderBy('total_revenue', 'desc')
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
            $revenue = Order::where('status', 'completed')
                ->whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year)
                ->sum('total_price');
            
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
                    'completed' => $completedOrders,
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
        $promotors = User::with(['events' => function($query) {
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
            ->where('role', 'partner')
            ->get()
            ->map(function ($user) {
                // Calculate total revenue for each promotor
                $totalRevenue = Order::whereHas('event', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->where('status', 'completed')
                ->sum('total_price');

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'description' => $user->description ?? null,
                    'profile_picture' => $user->profile_picture ?? null,
                    'total_revenue' => $totalRevenue,
                    'events' => $user->events->map(function ($event) {
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
        $totalRevenue = Order::where('status', 'completed')->sum('total_price');
        
        // Monthly revenue for the current year
        $monthlyRevenueCurrentYear = collect();
        for ($month = 1; $month <= 12; $month++) {
            $revenue = Order::where('status', 'completed')
                ->whereMonth('created_at', $month)
                ->whereYear('created_at', now()->year)
                ->sum('total_price');
            
            $monthlyRevenueCurrentYear->push([
                'month' => date('M', mktime(0, 0, 0, $month, 1)),
                'revenue' => $revenue
            ]);
        }

        // Top performing events by revenue
        $topEvents = Event::select('events.id', 'events.title', 'events.date', 'events.user_id')
            ->join('orders', 'events.id', '=', 'orders.event_id')
            ->where('orders.status', 'completed')
            ->groupBy('events.id', 'events.title', 'events.date', 'events.user_id')
            ->selectRaw('SUM(orders.total_price) as total_revenue')
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
        // Optimasi: hanya ambil field yang diperlukan dan gunakan pagination
        $events = Event::select(
            'id',
            'title',
            'description',
            'poster',
            'date',
            'time',
            'place',
            'user_id',
            'created_at'
        )
        ->with(['user:id,name']) // Hanya ambil id dan name dari user
        ->withSum(['orders as total_revenue' => function($query) {
            $query->where('status', 'completed');
        }], 'total_price')
        ->orderBy('created_at', 'desc')
        ->get();

        return Inertia::render('Admin/Acara', [
            'events' => $events,
        ]);
    }

    public function customer()
    {
        // Ambil semua user yang rolenya 'customer' dengan total pembelian
        $customers = User::where('role', 'customer')
            ->withSum(['orders as total_spent' => function($query) {
                $query->where('status', 'completed');
            }], 'total_price')
            ->withCount(['orders as total_orders'])
            ->get();

        // Kirim data ke halaman Admin/Customer
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

            // Hapus customer
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
}