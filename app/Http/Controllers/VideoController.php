<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VideoDetail;
use Inertia\Inertia;

class VideoController extends Controller
{
    // Renders the Inertia page
    public function index()
    {
        return Inertia::render('Videos');
    }

    // JSON endpoint to return all videos
    public function data()
    {
        $videos = VideoDetail::all();
        return response()->json($videos);
    }

    // JSON endpoint to filter videos by title or description
    public function filter(Request $request)
        {
            $search = $request->input('search');

            $videos = VideoDetail::query()
                ->when($search, function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('title', 'like', "%$search%")
                        ->orWhere('description', 'like', "%$search%");
                    });
                })
                ->get();

            return response()->json($videos);
        }

}
