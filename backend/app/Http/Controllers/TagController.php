<?php

namespace App\Http\Controllers;

use App\Models\Tag;

class TagController extends Controller
{
    public function find($id)
    {
        $task = Tag::find($id);
        return $task;
    }

    public function browse()
    {
        $tasks = Tag::all();
        return $tasks;
    }
}
