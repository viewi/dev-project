<?php

use Viewi\App;

$config = require  __DIR__ . '/config.php';

$app = new App($config);

return $app;
