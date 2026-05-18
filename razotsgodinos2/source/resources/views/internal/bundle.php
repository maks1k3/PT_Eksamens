<!DOCTYPE html>
<html lang="<?=config('app.locale')?>">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <title></title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="theme-color" content="#37474F">
        
        <link rel="shortcut icon" type="image/x-icon" href="<?=asset("favicon/main.png")?>">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet" type='text/css'>   
        
        <link rel="stylesheet" href="<?=asset("dist/{$bundle}.css")?>"  data-id="<?=$bundle?>"> 
        

        <meta name="csrf-token" content="<?=csrf_token()?>">

    </head>

  <body>
      
<script>
   
    window.__PRELOADED_STATE__ = <?=json_encode($state)?>;  
      
</script>

    <div id="app"></div>
    <script src="<?=asset("dist/{$bundle}.js")?>" defer data-id="<?=$bundle?>"></script>
  </body>
</html>