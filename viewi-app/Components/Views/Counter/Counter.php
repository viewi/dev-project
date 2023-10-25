<?php

namespace Components\Views\Counter;

use Viewi\Components\BaseComponent;

class Counter extends BaseComponent
{
    public int $count = 0;
    public $message = 'My message';

    public function increment()
    {
        $this->count++;
        $this->message .= '!';
    }

    public function decrement()
    {
        $this->count--;
    }
}
