import { PostModel } from "./PostModel";
import { register } from "../../../viewi/core/di/register";

var HttpClient = register.HttpClient;

class SessionInterceptor {
    CSRFToken = null;
    http = null;

    constructor(http) {
        var $this = this;
        $this.http = http;
    }

    request(request, handler) {
        var $this = this;
        if ($this.CSRFToken === null) {
            $this.http.post("\/api\/session").then(function (session) {
                $this.CSRFToken = session["CSRFToken"];
                $this.handleRequest(request, handler);
            }, function () {
                handler.reject(request);
            });
        }
        else {
            $this.handleRequest(request, handler);
        }
    }

    handleRequest(request, handler) {
        var $this = this;
        var newRequest = request.withHeader("X-CSRF-TOKEN", $this.CSRFToken);
        handler.next(newRequest);
        // OR
        // $handler->reject($newRequest);
    }

    response(response, handler) {
        var $this = this;
        if (response.status === 0) {
            response.status = 200;
            response.body = new PostModel();
            response.body.id = 0;
            response.body.name = "Mockup Post due to rejected request";
        }
        else {
            response.body.id+=1000;
            // PostModel
        }
        handler.next(response);
    }
}

export { SessionInterceptor }