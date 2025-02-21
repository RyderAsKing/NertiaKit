<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ThemeController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'theme' => 'required|in:light,dark'
        ]);

        $request->user()->update([
            'theme' => $request->theme
        ]);

        return response()->json(['theme' => $request->theme]);
    }
}
