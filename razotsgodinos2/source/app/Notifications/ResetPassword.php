<?php

namespace App\Notifications;

use Illuminate\Support\Arr;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Logic\Core\Authorization;

class ResetPassword extends Notification implements ShouldQueue
{
    use Queueable;
    
    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * Create a notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail()
    {
        
        $config = Authorization::getConfig();
        
        $action = Arr::get($config,'email.passwordResetAction');
        
        return (new MailMessage)
            ->subject(trans('notifications/reset_password.subject'))
            ->line([
                trans('notifications/reset_password.intro'),
                trans('notifications/reset_password.click'),
            ])            
            ->action(trans('notifications/reset_password.button'), action($action, [
                'lang' => config('app.locale'),
                'token' => $this->token
            ]))
            ->line(trans('notifications/reset_password.end'));
    }
}
