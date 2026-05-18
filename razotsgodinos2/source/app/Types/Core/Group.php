<?php
namespace App\Types\Core;

enum Group: string
{
    case user = 'user';
    case admin = 'admin';
    case super_admin = 'super_admin';
}
