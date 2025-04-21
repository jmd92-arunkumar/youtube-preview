<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoDetail extends Model
{
    protected $table = 'video_details';

    protected $fillable = [
        'title',
        'thumbnail',
        'duration',
        'uploaded_at',
        'views',
        'author',
        'video_url',
        'description',
        'subscriber',
        'is_live',
    ];
}
