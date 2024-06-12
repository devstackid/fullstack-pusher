<?php

namespace App\Http\Controllers;

use App\Traits\Chat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{

    use Chat;

    public function index(){
        $chats = $this->chats();
        return Inertia::render('chats/Index', [
            'chats' => $chats
        ]);
    }

    public function show(string $userId){
        try {
            $chats = $this->chats();
            return Inertia::render('chats/Index', [
                'chats' => $chats
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function loadChats(){
        try {
            $chats = $this->chats();

            return $this->ok($chats);
        } catch (\Exception $e) {
            return $this->oops($e->getMessage());
        }
    }
}
