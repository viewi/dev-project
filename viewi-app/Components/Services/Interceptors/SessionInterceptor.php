<?php

namespace Components\Services\Interceptors;

use Components\Models\PostModel;
use Viewi\Components\Http\HttpClient;
use Viewi\Components\Http\Interceptor\IHttpInterceptor;
use Viewi\Components\Http\Interceptor\IRequestHandler;
use Viewi\Components\Http\Interceptor\IResponseHandler;
use Viewi\Components\Http\Message\Request;
use Viewi\Components\Http\Message\Response;
use Viewi\DI\Singleton;

#[Singleton]
class SessionInterceptor implements IHttpInterceptor
{
    private ?string $CSRFToken = null;
    public function __construct(private HttpClient $http)
    {
    }

    public function request(Request $request, IRequestHandler $handler)
    {
        // $handler->reject($request);
        // return;
        if ($this->CSRFToken === null) {
            $this->http->post("/api/session")
                ->then(function ($session) use ($request, $handler) {
                    $this->CSRFToken = $session['CSRFToken'];
                    $this->handleRequest($request, $handler);
                }, function () use ($request, $handler) {
                    $handler->reject($request);
                });
        } else {
            $this->handleRequest($request, $handler);
        }
    }

    private function handleRequest(Request $request, IRequestHandler $handler)
    {
        // modify/clone request
        $newRequest = $request->withHeader('X-CSRF-TOKEN', $this->CSRFToken);
        $handler->next($newRequest);
        // OR
        // $handler->reject($newRequest);
    }

    public function response(Response $response, IResponseHandler $handler)
    {
        $handler->reject($response);
        return;
        if ($response->status === 0) {
            // rejected
            $response->status = 200; // to avoid failing
            $response->body = new PostModel();
            $response->body->id = 0;
            $response->body->name = 'Mockup Post due to rejected request';
        } else {
            $response->body->id += 1000; // PostModel
        }
        $handler->next($response);
    }
}
