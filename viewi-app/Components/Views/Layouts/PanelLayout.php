<?php

namespace Components\Views\Layouts;

use Viewi\Components\BaseComponent;

class PanelLayout extends BaseComponent
{
    public string $title = 'Viewi';

    public int $timerId = 0;
    public int $seconds = 0;

    public function init()
    {
        $this->seconds = 500;
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
        console.log('PanelLayout time ' + $this.seconds);
        javascript;
    }
}
