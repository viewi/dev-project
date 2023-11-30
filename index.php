<?php

// local development server for testing
// Run:
// php -S localhost:8000 -t server/

// npm watch
// cd server/viewi-app/js/
// npm run watch


use Components\Models\PostModel;
use Viewi\Components\Http\Message\Response;

require __DIR__ . '/../vendor/autoload.php';

// Viewi application here
/**
 * @var Viewi\App
 */
$app = include __DIR__ . '/viewi-app/viewi.php';

// Demo API
$router = $app->router();
$router->get('/api/post/{id}', function (int $id) {
    $post = new PostModel();
    $post->id = $id;
    $post->name = 'View Post Demo';
    return $post;
});

$router->post('/api/session', function () {
    return ['CSRFToken' => 'token'];
});

// Viewi components
include __DIR__ . '/viewi-app/routes.php';

$response = $app->run();

if (is_string($response)) {
    header("Content-type: text/html; charset=utf-8");
    echo $response;
} elseif ($response instanceof Response) {
    http_response_code($response->status);
    foreach ($response->headers as $name => $value) {
        header("$name: $value");
    }
    echo $response->body;
} else {
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($response);
}
