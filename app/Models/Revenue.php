<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Revenue extends Model
{
    protected $fillable = [
        'total_revenue',
        'unreleased_earnings',
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}