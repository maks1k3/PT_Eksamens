<!DOCTYPE html>
<?php
use Illuminate\Support\Arr;

$src = asset("dist/public.js")."?version=".config("configuration.version");

$check_header = Arr::get(request()->headers->all(), 'remote-dev-server', ['']);
$referer =  Arr::get(request()->headers->all(), 'referer', ['']);
$dev = head($check_header);
if ($dev === 'yes') {
    $src = 'http://remote-dev-server:8080/main/main.jsx';
//    $src = 'http://192.168.1.177:8080/main/main.jsx';
}
?>
<html lang="<?=Arr::get($state, 'ui.currentLang', 'en')?>">
    <head>
        <?php
            if ($dev) {
                echo '
                <script type="module">
                    import { injectIntoGlobalHook } from "/@react-refresh";
                    injectIntoGlobalHook(window);
                    window.$RefreshReg$ = () => {};
                    window.$RefreshSig$ = () => (type) => type;
                </script>';
            }
        ?>
         
        <meta charset="utf-8"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <?=view('common.meta_data')->render()?>
                         
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="theme-color" content="#37474F">
        
        <link href="<?=asset("favicon/main.png")?>" type="image/x-icon" rel="icon" media="(prefers-color-scheme: light)">
        <link href="<?=asset("favicon/main.png")?>" type="image/x-icon" rel="icon" media="(prefers-color-scheme: dark)">
        
        <link rel="stylesheet" href="<?=asset("dist/public.css")."?version=".config("configuration.version")?>" > 
        <link rel="stylesheet" href="<?=asset("dist/client.css")."?version=".config("configuration.version")?>" > 
        <link rel="stylesheet" href="<?=asset("dist/modules.css")."?version=".config("configuration.version")?>" > 
        
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet" type='text/css'>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
        
        <meta name="csrf-token" content="<?=csrf_token()?>">
        <?php
            if ($dev) { 
                echo '<script type="module" src="http://remote-dev-server:8080/@vite/client"></script>';
//                echo '<script type="module" src="http://192.168.1.177:8080/@vite/client"></script>';
            }
        ?>
        
    </head>
    <body>
    
        <script>
            var global = global || window;

            window.__PRELOADED_STATE__ = <?=json_encode($state)?>;    
        </script>
        
        <div id="app"></div> 
        
        <script type="module" src="<?=$src?>" defer data-id="public"></script>   
        <?=view('common.footer_js')->render()?>

    </body>
</html>
    
