<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $hidden = ['deleted_in_id', 'seen_in_id'];

    public const CHAT_TYPE = 'chats';
    public const CHAT_GROUP_TYPE = 'group_chats';

    public const SVG_IMAGE_ATTACHMENT = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
</svg>';

    public const SVG_FILE_ATTACHMENT = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg>';


    public function from(){
        return $this->belongsTo(User::class, 'from_id');
    }

    public function to(){
        return $this->morphTo();
    }

    public function another_user(){
        return $this->belongsTo(User::class, 'another_user_id');
    }

    public function attachments(){
        return $this->hasMany(ChatMessageFile::class, 'chat_id');
    }

    /**
     * Bootstrap the model and its traits.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('default_sort', function(Builder $builder){
            $builder->orderBy('sort_id');
        });

        static::creating(function ($model){
            $model->sort_id = static::max('sort_id') + 1;
            $model->seen_in_id = json_encode([['id' => auth()->id(), 'seen_at' => now()]]);
        });
    }

    public function scopeForUserOrGroup(Builder $query, string $id) 
    {
        $group = GroupMember::where('member_id', auth()->id())
            ->select('member_id', 'group_id')
            ->groupBy('member_id', 'group_id');

        $query->where(function (Builder $query) use ($id) {
                $query->where('from_id', auth()->id())
                      ->where('to_id', $id);
            })
            ->orWhere(function (Builder $query) use ($id) {
                $query->where('from_id', $id)
                      ->where('to_id', auth()->id());
            })
            ->orWhere(function (Builder $query) use ($id, $group) {
                $query->where('to_type', ChatGroup::class)
                      ->where('to_id', $id)
                      ->whereIn('to_id', $group->pluck('group_id')?->toArray());
            });
    }

    public function scopeDeletedInIds(Builder $query) 
    {
        $query->where(function (Builder $query) {
            $query->whereNull('deleted_in_id')
                  ->orWhereRaw("JSON_SEARCH(deleted_in_id, 'ONE', ?, NULL, '$[*].id') IS NULL", auth()->id());
        });
    }

    public function scopeNotSeen(Builder $query) 
    {
        $query->whereRaw("JSON_SEARCH(seen_in_id, 'ONE', ?, NULL, '$[*].id') IS NULL", auth()->id());
    }

    
}
