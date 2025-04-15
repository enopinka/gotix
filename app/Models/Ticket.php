<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'id',
        'event_id',
        'user_id',
        'type',
        'price',
        'quota',
        'available_seats',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}