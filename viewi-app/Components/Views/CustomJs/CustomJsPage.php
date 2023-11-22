<?php

namespace Components\Views\CustomJs;

use Viewi\Components\Attributes\LazyLoad;
use Viewi\Components\BaseComponent;

#[LazyLoad()]
class CustomJsPage extends BaseComponent
{
    public string $title = 'Custom JS page with lazy loading';
    public string $markText = "some text \n\n# Marked in browser\n\nRendered by **marked**.";

    public function getMarkedHtml($text)
    {
        return "";
    }
}
