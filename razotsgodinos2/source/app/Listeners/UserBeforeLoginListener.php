<?php

namespace App\Listeners;

use App\Events\UserBeforeLoginEvent;
use App\Models\Core\User;

class UserBeforeLoginListener
{
    /**
     * Handle the event.
     *
     * @param  UserBeforeLoginEvent $event
     * @return void
     */
    public function handle(UserBeforeLoginEvent $event)
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
