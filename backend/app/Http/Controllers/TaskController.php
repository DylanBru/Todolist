<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Task::all()->load(['category', 'tags']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $title = $request->input('title');
        $category_id = $request->input('category_id');

        // On crée une nouvelle instance, puis on lui définit la propriété title
        $task = new Task();
        $task->title = $title;
        $task->category_id = $category_id;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        if ($task->save()) {
            return response()->json($task->load('category'), 201);
        } else {
            return response(null, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Task::find($id)->load('category');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task= Task::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$task) {
            return response(null, 404);
        }

        // Extraction des valeurs passées de la body de la requête
        $title = $request->input('title');

        $task->title = $title;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($task->save()) {
            return response()->json($task);
        } else {
            return response(null, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // On recherche avec l'id
        $task= Task::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$task) {
            return response(null, 404);
        }
        // On supprime puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($task->delete()) {
            return response(null, 200);
        } else {
            return response(null, 500);
        }
    }
}
