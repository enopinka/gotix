<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
App\Http\Controllers\Hash

class AuthController extends Controller
{
    public function index(){
        return Inertia::render("Login");
    }

    public function login (Request $request){
        
        $credentials = $request->validate([
            'email'=>['required'],
            'password'=>['required']
        ]);

        
        if (Auth::attempt($credentials)){
            $request->session()->regenerate();
            
            $user = Auth::user();
            
            
            if ($user->role === 'admin') {
                return redirect('/admin');
            } elseif ($user->role === 'partner') {
                return redirect('/partner');
            } elseif ($user->role === 'customer') {
                return redirect()->route('/');
            }
            return back()->withErrors([
                'password'=>'Password salah'
                ])->onlyInput('password');
            }
            
    }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate(); 
        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function registerScreen(){
        return Inertia::render("Register");
    }

    public function register(Request $request){
        // Validasi input
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'in:admin,partner,customer'], // Sesuaikan dengan kebutuhan
        ]);

        // Buat user baru
        $user = user::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);
        Auth::login($user);

        // Redirect berdasarkan peran
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        } elseif ($user->role === 'partner') {
            return redirect()->route('partner.dashboard');
        } else {
            return redirect()->route('home');
        }
    }
}