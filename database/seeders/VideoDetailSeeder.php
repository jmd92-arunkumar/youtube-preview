<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VideoDetail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


class VideoDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('dump/videodetail.json')); 
        $videoDetails = json_decode($json, true);

        foreach ($videoDetails as $video) {
            VideoDetail::updateOrCreate(['id' => $video['id']], $video);
        }
    }
}
