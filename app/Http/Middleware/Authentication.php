<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
       
        // if(Auth::check() && Auth::user()->role == $role){
        //     return $next($request);
        // }

        if (!Auth::check()) {
            // Simpan URL yang diakses
            session(['url.intended' => $request->fullUrl()]);
            return redirect()->route('login');
        }

        // Kalau login tapi role tidak sesuai
        if (Auth::user()->role !== $role) {
            abort(403, 'Anda tidak mendapatkan akses halaman ini!');
        }

        return $next($request);
    }
}