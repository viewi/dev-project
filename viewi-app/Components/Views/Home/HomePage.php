<?php

namespace Components\Views\Home;

use Viewi\Components\BaseComponent;

class HomePage extends BaseComponent
{
    public string $title = 'Viewi v2 - Build reactive front-end with PHP';
    public int $timerId = 0;
    public int $seconds = 0;

    public function init()
    {
        $this->seconds = 100;
        <<<'javascript'
        this.timerId = setInterval(() => $this.tick(), 1000);
        javascript;
    }

    public function destroy()
    {
        <<<javascript
        clearInterval(this.timerId);
        javascript;
    }

    public function tick()
    {
        $this->seconds++;
        <<<'javascript'
        console.log('HomePage time ' + $this.seconds);
        javascript;
    }
}
