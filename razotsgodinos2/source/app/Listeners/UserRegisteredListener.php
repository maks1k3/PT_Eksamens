<?php

namespace App\Listeners;

use App\Events\UserRegisteredEvent;
use App\Models\Core\User;

class UserRegisteredListener
{
    /**
     * Handle the event.
     *
     * @param  UserRegisteredEvent  $event
     * @return void
     */
    public function handle(UserRegisteredEvent $event)
    {
        //$this->checkReferral($event->user);
    }
    
    /**
    * Check if user was invited
    *
    * @access public           
    * @param  App\Models\Core\User $user - user 
    * @return void
    */
    public function checkReferral(User $user) {
        
        
        
    }
}
