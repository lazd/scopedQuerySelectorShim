# scopedQuerySelectorShim
> querySelector/querySelectorAll shims that enable the use of :scope

## What is :scope in the context of querySelector?

`:scope`, when combined with the immediate child selector `>`, lets you query for elements that are immediate children of a [HTMLElement] instance.

For instance, you might want to find all list items of an unordered list that is an immediate child of `node`:

```javascript
var listItems = node.querySelector(':scope > ul > li');
```

This is effectively equivalent to using [jQuery's `find()`][jQuery.find]:

```javascript
var $listItems = $(node).find('> ul > li');
```

See the [Mozilla Developer Network article on :scope][:scope] for more information.


## Usage

Simply include the JavaScript file:

```html
<script src="scopeQuerySelectorShim.js"></script>
```


## Notes

* Tests `:scope` support before inserting itself, and uses it if it's available
  * Falls back to an ID-based `querySelector` call against the the parent if not
* Shimmed `querySelectorAll` returns a [NodeList], just like the native method
* Can be called on an element that does not have an ID
* Can be called on an element that is not currently in the DOM
* Modifies `HTMLElement.prototype`
* `Document.prototype`'s `querySelector`/`querySelectorAll` methods are not shimmed
  * `:scope` is not relevant at the document level
  * Use `document.documentElement.querySelector` instead without `:scope`


## Tests

To run the tests:

```shell
npm install
grunt test
```


## License

scopedQuerySelectorShim is licensed under the permissive BSD license.


[:scope]: https://developer.mozilla.org/en-US/docs/Web/CSS/:scope
[NodeList]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[HTMLElement]: http://mdn.io/HTMLElement
[jQuery.find]: http://api.jquery.com/find/
