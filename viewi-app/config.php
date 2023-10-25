<?php

use Viewi\AppConfig;

$d = DIRECTORY_SEPARATOR;
$viewiAppPath = __DIR__ . $d;
$componentsPath =  $viewiAppPath . 'Components';
$buildPath = $viewiAppPath . 'build';
$jsPath = $viewiAppPath . 'js';
$publicPath = __DIR__ . $d . '..' . $d . 'assets';
$assetsPath = '/assets';

return (new AppConfig())
    ->buildTo($buildPath)
    ->buildFrom($componentsPath)
    ->withJsEntry($jsPath)
    ->putAssetsTo($publicPath)
    ->fetchAssetsFrom($assetsPath)
    ->developmentMode(true);
