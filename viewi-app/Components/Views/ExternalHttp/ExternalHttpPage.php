<?php

namespace Components\Views\ExternalHttp;

use Viewi\Components\BaseComponent;
use Viewi\Components\Http\HttpClient;

class ExternalHttpPage extends BaseComponent
{
    public string $title = 'External Http support';
    public string $error = '';
    public string $message = '';
    public ?array $users = null;
    public $data = [];

    public function __construct(private HttpClient $http)
    {
    }

    public function init()
    {
        $this->message = 'Loading..';
        // $this->http
        //     ->get("https://apingweb.com/api/users")
        //     ->then(function ($response) {
        //         $this->message = 'Users has been read successfully';
        //         $this->users = $response['data'];
        //     }, function () {
        //         $this->error = 'Server error';
        //     }, function () {
        //         $this->message = '';
        //     });

        // $this->http
        //     ->post("https://jsonplaceholder.typicode.com/todos", [
        //         "userId" => 1,
        //         "title" => "laboriosam mollitia et enim quasi adipisci quia provident illum",
        //         "completed" => false
        //     ])
        //     ->then(function ($response) {
        //         $this->data = $response;
        //     }, function () {
        //     }, function () {
        //     });

        $this->http
            ->post("/api/movies")
            ->then(function ($response) {
                $this->data = $response;
            }, function () {
            }, function () {
            });
    }
}
