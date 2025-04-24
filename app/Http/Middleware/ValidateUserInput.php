<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidateUserInput
{
    public function handle(Request $request, Closure $next)
    {
        if (in_array($request->method(), ['POST', 'PUT', 'PATCH'])) {
            $rules = [
                'name' => 'required|string|max:50',
                'email' => 'required|email',
                'age' => 'required|integer'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }
        }

        return $next($request);
    }
}
