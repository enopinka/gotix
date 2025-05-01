<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerProfileController extends Controller
{
    /**
     * Display landing page with events listing
     */
    public function index()
    {
        $events = Event::with(['tickets', 'user'])->get();
        return Inertia::render('LandingPage', compact('events'));
    }

    /**
     * Show user profile
     */
    public function profile()
    {
        $user = Auth::user();
        return Inertia::render('Customer/Profile', compact('user'));
    }

    /**
     * Update user profile information
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string|max:255',
            'email' => "required|string|email|max:255|unique:users,email,{$user->id}",
        ]);
        
        // Menggunakan DB query untuk menghindari masalah dengan model
        DB::table('users')
            ->where('id', $user->id)
            ->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'photo' => $validated['photo'] ?? $user->photo,
            ]);
        
        return redirect()->back()->with('success', 'Profile updated successfully');
    }
    
    /**
     * Update user password
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);
        
        $user = Auth::user();
        
        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect']);
        }
        
        DB::table('users')
            ->where('id', $user->id)
            ->update([
                'password' => Hash::make($request->password),
            ]);
        
        return redirect()->back()->with('success', 'Password updated successfully');
    }

    /**
     * Update profile photo
     */
    public function updatePhoto(Request $request)
    {
        dd($request->file('photo'));

        $validated = $request->validate([
            'photo' => 'required',
        ]);
        dd($validated);
        
        $user = Auth::user();
        if ($request->hasFile('photo')) {
            
            // Hapus foto lama jika ada
            $this->deleteExistingPhoto($user);
            
            // Sanitasi nama file untuk keamanan
            $filename = time() . '_' . $this->sanitizeFilename($request->file('photo'));
            
            // Simpan foto baru
            $path = $request->file('photo')->storeAs('profile-photos', $filename, 'public');
            
        
        // Update data foto pada user
        // $user->update(['photo' => $path]);

        // Debug untuk melihat path file yang disimpan
        
        // DB::table('users')
        //     ->where('id', $user->id)
        //     ->update(['photo' => $path]);
        
        return redirect()->back()->with('success', 'Profile photo updated successfully');
    
        }
        return redirect()->back()->withErrors(['photo' => 'Failed to upload photo']);
    }

    /**
     * Delete profile photo
     */
    public function deletePhoto()
    {
        $user = Auth::user();
        
        $this->deleteExistingPhoto($user);
        
        DB::table('users')
            ->where('id', $user->id)
            ->update(['photo' => null]);
            
        return redirect()->back()->with('success', 'Profile photo removed successfully');
    }
    
    /**
     * Display user's purchased tickets
     */
    public function myTickets()
    {
        $orders = Order::with(['event', 'ticket'])
                    ->where('user_id', Auth::id())
                    ->latest()
                    ->get();
        
        return Inertia::render('Customer/MyTickets', compact('orders'));
    }
    
    /**
     * Helper untuk menghapus foto yang sudah ada
     */
    private function deleteExistingPhoto($user): void
    {
        if ($user->photo && Storage::disk('public')->exists($user->photo)) {
            Storage::disk('public')->delete($user->photo);
        }
    }
    
    /**
     * Helper untuk sanitasi nama file
     */
    private function sanitizeFilename($file): string
    {
        $originalName = $file->getClientOriginalName();
        $name = pathinfo($originalName, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $sanitized = preg_replace('/[^A-Za-z0-9\-]/', '', $name);
        
        return "{$sanitized}.{$extension}";
    }

    public function profileScreenV2(){
        $user = Auth::user();

        return Inertia::render('Customer/UserProfile', [
            'user' => $user,
        ]);
    }

    public function updateProfileV2(Request $request){
        $user_id = Auth::user()->getAuthIdentifier();
       

        $validated = $request->validate([
            'name' => 'required',
            'email' => "required",
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = User::find($user_id);
        $user->name = $validated['name'];
        $user->email = $validated['email'];

        // Handle file jika ada
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('images', 'public');
            $user->photo = "/storage/{$photoPath}";
        }

    $user->save();

    return redirect('/profile')->with('success', 'Profile telah diupdate!');

    }
}