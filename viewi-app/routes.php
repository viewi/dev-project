<?php

use Components\Views\Home\HomePage;
use Components\Views\NotFound\NotFoundPage;
use Components\Views\Pages\CounterPage;
use Components\Views\Pages\PostPage;
use Components\Views\Pages\TestLayoutPage;
use Components\Views\Pages\TestPage;
use Components\Views\Pages\TodoAppPage;
use Viewi\App;

/**
 * @var App $app
 */
$router = $app->router();
$router->get('/', HomePage::class);
$router->get('/counter', CounterPage::class);
$router->get('/todo', TodoAppPage::class);
$router->get('/test', TestPage::class);
$router->get('/layout-test', TestLayoutPage::class);
$router->get('/post/{id}', PostPage::class);
$router->get('*', NotFoundPage::class);
