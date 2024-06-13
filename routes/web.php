<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController:: class, 'index'])->middleware('guest');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::patch('/users/{id}' , [UsersController::class, 'update'])->name('users.update');

    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::post('/chats', [ChatController::class, 'store'])->name('chats.store');

    Route::get('/chats/users', [ChatController::class, 'loadChats'])->name('chats.users');
    
    Route::get('/chats/{id}', [ChatController::class, 'show'])->name('chats.show');
    Route::get('/chats/{id}/messages', [ChatController::class, 'loadMessages'])->name('chats.messages');

    Route::get('/contacts', [ChatController::class, 'index'])->name('contacts.index');
    Route::get('/archived_chats', [ChatController::class, 'index'])->name('archived_chats.index');
});

require __DIR__.'/auth.php';
