<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Psr\Http\Message\RequestInterface;

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
}