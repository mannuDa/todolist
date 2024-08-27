<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Http;

class TodoController extends Controller
{
    public function index(request $req, $case, $id=NULL)
    {
        switch ($case) {
            case 'view':
                if ($req->isMethod('get')) {
                    $todos = Todo::all();
                    return response()->json($todos);
                }
                break;
            case 'add':
                if($req->isMethod('post')){
                    $validatedData = $req->validate([
                        'title' => 'required|unique:todos',
                    ]);
            
                    $task = Todo::create($validatedData);
                    return response()->json($task, 201);

                }
                break;
            case 'update':
                if($req->isMethod('put')){
                    $task = Todo::findOrFail($id);
                    $task->update(['completed' => 'yes']);
                    return response()->json($task);

                }
                break;
            case 'delete':
                if($req->isMethod('delete')){
                    $task = Todo::findOrFail($id)->delete();            
                    return response()->json(null, 204);

                }
                break;
                
        }
    }
}
