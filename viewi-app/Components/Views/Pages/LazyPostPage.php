<?php

namespace Components\Views\Pages;

use Components\Models\PostModel;
use Components\Services\Interceptors\SessionInterceptor;
use Viewi\Components\Attributes\LazyLoad;
use Viewi\Components\BaseComponent;
use Viewi\Components\Http\HttpClient;

#[LazyLoad()]
class LazyPostPage extends BaseComponent
{
    public ?PostModel $post = null;
    public string $error = '';
    public string $message = '';
    public PostModel $newPost;

    public function __construct(private HttpClient $http, public int $id)
    {
    }

    public function init()
    {
        $this->newPost = new PostModel();
        $this->newPost->id = 0;
        $this->newPost->name = 'New';

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

    public function clean()
    {
        $this->newPost = new PostModel();
        $this->newPost->id = 10;
        $this->newPost->name = 'From scratch';
        $this->newPost->child = new PostModel();
        $this->newPost->child->name = 'Child';
    }
}
