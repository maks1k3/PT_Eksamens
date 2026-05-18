<?php
use App\Helpers\Core\MetaHelper;

$title = MetaHelper::getTitle();
$description = MetaHelper::getDescription();
$image = MetaHelper::getImage();

if (empty($image)) {
    $image = asset('img/logo/logo.png');
}

?>
        <title><?=$title?></title>
        <meta name="title" content="<?=$title?>" />
        <meta property="og:title" content="<?=$title?>" />   

        <meta name="description" content="<?=$description?>" />
        <meta property="og:description" content="<?=$description?>" />
        
        <link rel="image_src" href="<?=$image?>" />
        <meta name="image" content="<?=$image?>" />
        <meta property="og:image" content="<?=$image?>" />
        