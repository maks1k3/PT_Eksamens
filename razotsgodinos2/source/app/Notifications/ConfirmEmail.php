<?php

namespace App\Notifications;

use Illuminate\Support\Arr;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Logic\Core\Authorization;

class ConfirmEmail extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The password reset token.
     *
     * @var string
     */
    public $confirmationCode;

    /**
     * Create a notification instance.
     *
     * @param  string  $confirmation_code
     * @return void
     */
    public function __construct($confirmationCode)
    {
        $this->confirmationCode = $confirmationCode;
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
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $config = Authorization::getConfig();
        
        $action = Arr::get($config,'email.emailConfirmationAction');
        
        return (new MailMessage)
            ->subject(trans('notifications/confirm_email.title'))
            ->line(trans('notifications/confirm_email.title'))
            ->line(trans('notifications/confirm_email.intro'))
            ->action(trans('notifications/confirm_email.button'), action($action, [
                'lang' => config('app.locale'),
                'code' => $this->confirmationCode
            ]));
    }
}
