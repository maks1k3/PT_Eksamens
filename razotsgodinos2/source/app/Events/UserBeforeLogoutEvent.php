<?php

namespace App\Events;

use App\Models\Core\User;

class UserBeforeLogoutEvent
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
