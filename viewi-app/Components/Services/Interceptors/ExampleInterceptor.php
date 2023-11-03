<?php

namespace Components\Services\Interceptors;

use Viewi\Components\Http\Interceptor\IHttpInterceptor;
use Viewi\Components\Http\Interceptor\IRequestHandler;
use Viewi\Components\Http\Interceptor\IResponseHandler;
use Viewi\Components\Http\Message\Request;
use Viewi\Components\Http\Message\Response;
use Viewi\DI\Singleton;

#[Singleton]
class ExampleInterceptor implements IHttpInterceptor
{
    public function request(Request $request, IRequestHandler $handler)
    {
        // modify/clone request
        $newRequest = $request->withHeader('X-Test-ID', 'mytoken');
        $handler->next($newRequest);
        // OR
        // $handler->reject($newRequest);
    }

    public function response(Response $response, IResponseHandler $handler)
    {
        // modify response
        $nextResponse = $response->withBody('Access denied')->withStatus(400);

        $handler->next($nextResponse);
        // OR
        // $handler->reject($nextResponse);
    }
}
