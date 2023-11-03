<?php

namespace Components\Views\Pages;

use Components\Models\PostModel;
use Components\Services\Interceptors\SessionInterceptor;
use Viewi\Components\BaseComponent;
use Viewi\Components\Http\HttpClient;

class PostPage extends BaseComponent
{
    public ?PostModel $post = null;
    public string $error = '';
    public string $message = '';

    public function __construct(private HttpClient $http, public int $id)
    {
    }

    public function init()
    {
        $this->http
            ->withInterceptor(SessionInterceptor::class)
            ->get("/api/post/{$this->id}")
            ->then(function (?PostModel $post) {
                $this->post = $post;
                $this->message = 'Post has been read successfully';
            }, function () {
                $this->error = 'Server error';
            });
    }
}
