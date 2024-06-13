<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\User;
use App\Traits\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function show(string $id){
        try {
            $user = User::find($id);
            if(!$user) {
                throw new \Exception('User not found');
            }


            $user->chat_type = ChatMessage::CHAT_TYPE;

            $chats = $this->chats();
            return Inertia::render('chats/Show', [
                'user' => $user,
                'chats' => $chats,
                'messages' => $this->messages($id)
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

    public function loadMessages(String $id){
        try {
            $messages = $this->messages($id);

            return $this->ok($messages);
        } catch (\Exception $e) {
            return $this->oops($e->getMessage());
        }
    }

    public function store(Request $request){
        DB::beginTransaction();
        try {
           $chat = ChatMessage::create([
                'from_id' => auth()->id(),
                'to_id' => $request->to_id,
                'to_type' => User::class,
                'body' => $request->body
           ]);

           DB::commit();
           return $this->ok(data: $chat, code: 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }
}
