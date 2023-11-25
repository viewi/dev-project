<?php

use Components\Views\CustomJs\CustomJsPage;
use Components\Views\Home\HomePage;
use Components\Views\NotFound\NotFoundPage;
use Components\Views\Pages\CounterPage;
use Components\Views\Pages\LazyPostPage;
use Components\Views\Pages\MemberPage;
use Components\Views\Pages\MemberPageNoAccess;
use Components\Views\Pages\PostPage;
use Components\Views\Pages\TestLayoutPage;
use Components\Views\Pages\TestPage;
use Components\Views\Pages\TodoAppPage;
use Components\Views\Portal\PortalPage;
use Viewi\App;
use Viewi\Components\Http\Message\Response;

/**
 * @var App $app
 */
$router = $app->router();
$router->get('/', HomePage::class);
$router->get('/counter', CounterPage::class);
$router->get('/todo', TodoAppPage::class);
$router->get('/test', TestPage::class);
$router->get('/marked', CustomJsPage::class);
$router->get('/portal', PortalPage::class);
$router->get('/layout-test', TestLayoutPage::class);
$router->get('/post/{id}', PostPage::class);
$router->get('/lazy-post/{id}', LazyPostPage::class);
$router->get('/member', MemberPage::class);
$router->get('/member-no-access', MemberPageNoAccess::class);

$router
    ->get('*', NotFoundPage::class)
    ->transform(function (Response $response) {
        return $response->withStatus(404, 'Not Found');
    });
