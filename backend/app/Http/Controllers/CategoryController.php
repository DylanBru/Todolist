<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::all()->load('tasks');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->input('name');

        // On crée une nouvelle instance, puis on lui définit la propriété name
        $category = new Category();
        $category->name = $name;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        if ($category->save()) {
            return response()->json($category, 201);
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
        return Category::find($id)->tasks;
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
        $category= Category::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$category) {
            return response(null, 404);
        }

        // Extraction des valeurs passées de la body de la requête
        $name = $request->input('name');

        $category->name = $name;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($category->save()) {
            return response()->json($category);
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
        $category= Category::find($id);
        // Si on n'a rien, on ne peut pas faire de mise à jour
        // 404 : not found
        if (!$category) {
            return response(null, 404);
        }
        // On supprime puis on gère la réponse avec le code HTTP qui convient
        // 500 : Internal Server Error
        if ($category->delete()) {
            return response(null, 200);
        } else {
            return response(null, 500);
        }
    }
}
