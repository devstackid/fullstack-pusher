<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
if(!function_exists('upload_file')){
    /**
     * 
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $directory
     * @return void
     * 
     */
    function upload_file($file, $directory){
        $extension = $file->getClientOriginalExtension();
        $filename = Str::uuid() . '.' . $extension;

        Storage::disk('public')->putFileAs($directory, $file, $filename);

        return "/storage/$directory/$filename";
    }
}

if(!function_exists('remove_file')){
    /**
     * 
     * @param string $filePath
     * @return void
     * 
     */
    function remove_file($filePath){
        if($filePath && Storage::disk('public')->exists($filePath)){
            return Storage::disk('public')->delete($filePath);
        }

        return false;
    }
}