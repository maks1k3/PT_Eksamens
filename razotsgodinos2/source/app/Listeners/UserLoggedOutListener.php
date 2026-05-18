<?php

namespace App\Listeners;

use App\Events\UserLoggedOutEvent;
use App\Models\Core\User;

class UserLoggedOutListener
{
    /**
     * Handle the event.
     *
     * @param  UserLoggedOutEvent $event
     * @return void
     */
    public function handle(UserLoggedOutEvent $event)
    {
        //$this->check($event->user);
       
    }
    
    /**
    * Check 
    *
    * @access public           
    * @param  App\Models\Core\User $user - user 
    * @return void
    */
    public function check(User $user) {
        
        
        
    }
    
}
