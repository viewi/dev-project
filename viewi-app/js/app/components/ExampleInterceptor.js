
class ExampleInterceptor {
    request(request, handler) {
        var $this = this;
        var newRequest = request.withHeader("X-Test-ID", "mytoken");
        handler.next(newRequest);
        // OR
        // $handler->reject($newRequest);
    }

    response(response, handler) {
        var $this = this;
        var nextResponse = response.withBody("Access denied").withStatus(400);
        handler.next(nextResponse);
        // OR
        // $handler->reject($nextResponse);
    }
}

export { ExampleInterceptor }