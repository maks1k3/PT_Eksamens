<?php
use App\Logic\Core\Settings;

$footer_js = '';
if (session()->get('marketing_cookies','notVisted') == '1') {
    $footer_js = Settings::getFooterJs();
}

?><?=$footer_js?>