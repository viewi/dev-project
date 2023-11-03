<?php

namespace Components\Services\Interceptors;

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
        $response->body->id += 1000; // PostModel
        $handler->next($response);
    }
}
