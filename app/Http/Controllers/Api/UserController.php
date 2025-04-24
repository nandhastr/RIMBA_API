<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        try {
            $user = User::all();

            return response()->json(new UserResource(200, 'success', $user),200);
        } catch (\Throwable $e) {
            return response()->json(new UserResource(500, 'error : ' . $e->getMessage(), null),500);
        }
    }
    public function show($id)
    {
        try {
            $user = User::where('id', $id)->first();

           
            if (!$user) {
                return response()->json(new UserResource(404, 'Data tidak ditemukan', null), 404);
            }

           
            return response()->json(new UserResource(200, 'success', $user), 200);
        } catch (\Throwable $e) {
           
            return response()->json(new UserResource(500, 'error: ' . $e->getMessage(), null), 500);
        }
    }



    public function store(Request $request)
    {
        try{
            $request->validate([
                'email' => 'required|email|unique:users,email',
            ]);
    
            $user = User::create([
                'id' => Str::uuid(),
                'name' => $request->name,
                'email' => $request->email,
                'age' => $request->age
            ]);
    
            return response()->json(new UserResource(201, 'Data Berhasil Di Tambahkan', $user),201);
        }catch(\Throwable $e){
            return response()->json(new UserResource(500, 'error: ' . $e->getMessage(), []), 500);
        }

    }

    public function update(Request $request, $id)
    {
        try{

            $user = User::find($id);
            if (!$user) {
                return response()->json(new UserResource(404, 'Data tidak ditemukan', []), 404);
            } else {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->age = $request->age;
                $user->save();
                return response()->json(new UserResource(200, 'Data Berhasil Di Update', $user), 200);
            }
        }catch(\Throwable $e){
            return response()->json(new UserResource(500, 'error: ' . $e->getMessage(), []), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(new UserResource(404, 'Data tidak ditemukan', []), 404);
            }
            $user->delete();
            return response()->json(new UserResource(200, 'Data Berhasil Di Hapus', null), 200);
        } catch (\Throwable $e) {
            return response()->json( new UserResource(500, 'error:' . $e->getMessage(), []), 500);
        }
    }
}
