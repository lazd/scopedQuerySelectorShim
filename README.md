# rootedQuerySelectorAll
> querySelectorAll that can be called against immediate children

* Uses [`:scope`][:scope] if available
	* Falls back to an ID-based `querySelectorAll` call against the the parent if not
* Can be called on an element that does not have an ID
* Can be called on an element that is not currently in the DOM


## Usage

To perform a query rooted to a particular element:

```javascript
var nodeList = rootedQuerySelectorAll(rootElement, '> ul > li');
```

This is equivalent to using jQuery's `find()`:

```javascript
var $nodeList = $(rootElement).find('> ul > li');
```


## Tests

To run the tests:

```shell
npm install
grunt test
```


## License

This software is public domain.


[:scope]: https://developer.mozilla.org/en-US/docs/Web/CSS/:scope
