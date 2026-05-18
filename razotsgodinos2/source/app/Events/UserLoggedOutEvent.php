<?php

namespace App\Events;

use App\Models\Core\User;

class UserLoggedOutEvent
{
    public $user;


    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        //
        $this->user = $user;
    }
}
