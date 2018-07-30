<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
// use function GuzzleHttp\json_encode;

class UserController extends Controller
{
    public function getAuth() {
        return response()->json(Auth::user());
    }
}
