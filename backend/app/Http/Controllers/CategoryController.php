<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function find($id)
    {
        $task = Category::find($id);
        return $task;
    }

    public function browse()
    {
        $tasks = Category::all();
        return $tasks;
    }
}
