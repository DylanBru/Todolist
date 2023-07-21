<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('tasks', TaskController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('tags', TagController::class);

// Route::get('/tasks', [TaskController::class, 'browse']);
// Route::get('/tasks/{id}', [TaskController::class, 'find']);
// Route::get('/categories', [CategoryController::class, 'browse']);
// Route::get('/categories/{id}', [CategoryController::class, 'find']);
// Route::get('/tags', [TagController::class, 'browse']);
// Route::get('/tags/{id}', [TagController::class, 'find']);
