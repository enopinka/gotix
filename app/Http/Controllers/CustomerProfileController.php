<?php

namespace App\Http\Controllers;

use App\Models\Event;
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
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $events = Event::with(['tickets', 'user'])->get();
        return Inertia::render('LandingPage', ['events' => $events]);
    }

    /**
     * Show user profile
     *
     * @return \Inertia\Response
     */
    public function profile()
    {
        $user = Auth::user();
        
        return Inertia::render('Customer/Profile', [
            'user' => $user
        ]);
    }

    /**
     * Update user profile information
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);
        
        DB::table('users')
            ->where('id', $user->id)
            ->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);
        
        return redirect()->back()->with('success', 'Profile updated successfully');
    }
    
    /**
     * Update user password
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
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
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        $user = Auth::user();
        
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($user->photo && Storage::disk('public')->exists($user->photo)) {
                Storage::disk('public')->delete($user->photo);
            }
            
            // Store the new photo with a sanitized filename
            $filename = time() . '_' . preg_replace('/[^A-Za-z0-9\-]/', '', pathinfo($request->file('photo')->getClientOriginalName(), PATHINFO_FILENAME));
            $extension = $request->file('photo')->getClientOriginalExtension();
            $path = $request->file('photo')->storeAs('profile-photos', $filename . '.' . $extension, 'public');
            
            DB::table('users')
                ->where('id', $user->id)
                ->update([
                    'photo' => $path,
                ]);
                
            return redirect()->back()->with('success', 'Profile photo updated successfully');
        }
        
        return redirect()->back()->withErrors(['photo' => 'Failed to upload photo']);
    }

    /**
     * Delete profile photo
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deletePhoto()
    {
        $user = Auth::user();
        
        // Delete the photo file if it exists
        if ($user->photo && Storage::disk('public')->exists($user->photo)) {
            Storage::disk('public')->delete($user->photo);
        }
        
        DB::table('users')
            ->where('id', $user->id)
            ->update([
                'photo' => null,
            ]);
            
        return redirect()->back()->with('success', 'Profile photo removed successfully');
    }
}