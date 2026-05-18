<!DOCTYPE html>
<?php
use Illuminate\Support\Arr;

$src = asset("dist/administration.js")."?version=".config("configuration.version");

$check_header = Arr::get(request()->headers->all(), 'remote-dev-server', ['']);
$referer =  Arr::get(request()->headers->all(), 'referer', ['']);
$dev = head($check_header);
if ($dev === 'yes') {
    $src = 'http://remote-dev-server:8080/admin/Administration.jsx';
//    $src = 'http://192.168.1.177:8080/administration/App.jsx';
}
//    dd(request()->headers->get('referer'));
?>

<html lang="<?=config('app.locale')?>">

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
        
        <link rel="shortcut icon" type="image/x-icon" href="<?=asset("favicon/main.png")?>">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet" type='text/css'>   
        
        <link rel="stylesheet" href="<?=asset("dist/administration.css")."?version=".config("configuration.version")?>" data-id="administration"> 
        <link rel="stylesheet" href="<?=asset("dist/client.css")."?version=".config("configuration.version")?>" data-id="public"> 
        <link rel="stylesheet" href="<?=asset("dist/modules.css")."?version=".config("configuration.version")?>" > 

        <meta name="csrf-token" content="<?=csrf_token()?>">
        <?php
            if ($dev) { 
                echo '<script type="module" src="http://remote-dev-server:8080/@vite/client"></script>';
                //echo '<script type="module" src="http://192.168.1.177:8080/@vite/client"></script>';
            }
        ?>
    </head>

  <body>
      
    <script>       
        window.__PRELOADED_STATE__ = <?=json_encode($state)?>;    
    </script>

    <div id="app"></div>
    <script type="module" src="<?=$src?>" defer data-id="administration"></script>   
    
  </body>
</html>
    
