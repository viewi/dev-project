<?php

namespace Components\Views\Test;

use Components\Models\UserModel;
use Components\Services\Reducers\CounterReducer;
use Viewi\Components\BaseComponent;
use Viewi\Components\DOM\DomEvent;
use Viewi\Components\DOM\HtmlNode;

class TestComponent extends BaseComponent
{
    public string $name = 'MyName';
    public string $name2 = '';
    public string $_name2_Test = 'MyName_2';
    public $empty = '';
    public $null = null;
    public string $url = '/home';
    public string $attr = 'title';
    public string $event = '(click)';
    public $arr = ['a', 'b', 'c'];
    public $arrWithKeys = ['a' => 'Apple', 'b' => 'Orange', 'c' => 'Lemon'];
    public $arrNested = [
        'a' => ['a' => 'Apple', 'b' => 'Orange', 'c' => 'Lemon'],
        'b' => ['a' => 'Apple', 'b' => 'Orange', 'c' => 'Lemon'],
        'c' => ['a' => 'Apple', 'b' => 'Orange', 'c' => 'Lemon']
    ];
    public $ifValue = true;
    public $ifElseValue = true;
    public $nestedIf = true;
    public $dynamic = 'div';
    public $dynamic2 = 'ItemComponent';
    public string $raw = '<b><i>Raw html text</i></b>';
    public bool $isDisabled = true;
    public string $message = 'Some message';
    public bool $checked = false;
    public bool $checked2 = true;
    public array $checkedNames = [];
    public string $picked = 'One';
    public string $selected = '';
    public array $selectedList = ['A', 'C'];
    public ?UserModel $user = null;
    public ?HtmlNode $NameInput = null;
    public string $testModel = 'some test';

    public function __construct(public CounterReducer $counterReducer)
    {
        $this->user = new UserModel();
        $this->user->id = 1;
        $this->user->name = 'Miki the cat';
        $this->counterReducer->increment();
    }

    function getNames()
    {
        return json_encode($this->checkedNames);
    }

    public function getName(?string $name = null)
    {
        $sum = (1 + 5) * 10;
        return $name ?? 'DefaultName';
    }

    public function addTodo()
    {
        // $this->arr = [...$this->arr, 'Viewi'];
        $this->arrNested = [
            'a' => ['a' => 'Apple', 'b' => 'Orange', 'c' => 'Lemon'],
            // 'c' => ['a' => 'Apple', 'b' => 'Orange', 'c' => 'Lemon'],
            'd' => ['R' => 'Rat', 'T' => 'Dog', 'G' => 'Cat'],
            'b' => ['a' => 'Apple', 'b' => 'Orange', 'c' => 'Lemon'],
        ];
        // Test cases
        // $this->arr = ['E', 'a'];
        // $this->arr = ['c', 'b', 'a'];
        // $this->arr = ['c', 'b', 'c', 'c'];
        // $this->arr = [...$this->arr, 'Viewi', ...$this->arr];
        // $this->arr = ['g', 'b', 'a', 'c'];
    }

    public function onEvent(DomEvent $event)
    {
        $event->preventDefault();
    }

    public function toggleIf()
    {
        $this->ifValue = !$this->ifValue;
        $this->arr = $this->ifValue ? ['a', 'b', 'c'] : ['x', 'b', 'r'];
    }

    public function toggleElseIf()
    {
        $this->ifElseValue = !$this->ifElseValue;
    }
}
