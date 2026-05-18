<!DOCTYPE html>
<html lang="<?=config('app.locale')?>">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <?=view('common.meta_data')->render()?>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        
        <link rel="shortcut icon" type="image/x-icon" href="<?=asset("favicon/main.png")?>">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet" type='text/css'>   
       
        
        <link rel="stylesheet" href="<?=asset("system/login.css")."?version=".config("configuration.version")?>"> 
        

        <meta name="csrf-token" content="<?=csrf_token()?>">

    </head>

  <body>
      <div id="app"></div>
      <script src="<?=asset('system/login.js')."?version=".config("configuration.version")?>" defer></script>
  </body>
</html>
    
