<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{


    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'place',
        'date',
        'time',
        'poster',
        'seating_chart',
        'user_id',
        'banner'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'event_id');
    }
}
