<?php

namespace App\Listeners;

use App\Events\UserBeforeLogoutEvent;
use App\Models\Core\User;

class UserBeforeLogoutEventListener
{
    /**
     * Handle the event.
     *
     * @param  UserBeforeLoginEvent $event
     * @return void
     */
    public function handle(UserBeforeLogoutEvent $event)
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
