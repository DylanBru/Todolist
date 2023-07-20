<?php

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    public function find($id)
    {
        $task = Task::find($id);
        return $task;
    }

    public function browse()
    {
        $tasks = Task::all();
        return $tasks;
    }
}
