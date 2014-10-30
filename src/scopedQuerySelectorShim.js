(function() {
  if (!HTMLElement.prototype.querySelectorAll) {
    throw new Error('rootedQuerySelectorAll: This polyfill can only be used with browsers that support querySelectorAll');
  }

  // A temporary element to query against for elements not currently in the DOM
  // We'll also use this element to test for :scope support
  var container = document.createElement('div');

  // Check if the browser supports :scope
  try {
    // Browser supports :scope, do nothing
    container.querySelectorAll(':scope *');
  }
  catch (e) {
    var rxTest = /(?:^|,)\s*:scope\s+/,
      rxStart = /^\s*:scope\s+/i,
      rxOthers = /,\s*:scope\s+/gi;

    // Overrides
    function overrideNodeMethod(prototype, methodName) {
      // Store the old method for use later
      var oldMethod = prototype[methodName];

      // Override the method
      prototype[methodName] = function(query) {
        var nodeList, parentNode, frag, idSelector,
          gaveId = false,
          gaveContainer = false,
          parentIsFragment = false;

        if (rxTest.test(query)) {

          if (!this.parentNode) {
            // Add to temporary container
            container.appendChild(this);
            gaveContainer = true;
          }

          if (this.parentNode instanceof DocumentFragment) {
            frag = this.parentNode;
            while (frag.firstChild) container.appendChild(frag.firstChild);
            parentIsFragment = true;
          }

          parentNode = this.parentNode;

          if (!this.id) {
            // Give temporary ID
            this.id = 'rootedQuerySelector_id_'+(new Date()).getTime();
            gaveId = true;
          }

          // replace :scope with ID selector
          idSelector = '#' + this.id + ' ';
          query = query.replace(rxStart, idSelector).replace(rxOthers, ', ' + idSelector);

          // Find elements against parent node
          nodeList = oldMethod.call(parentNode, query);

          // Reset the ID
          if (gaveId) {
            this.id = '';
          }

          // Remove from temporary container
          if (parentIsFragment) {
            while (container.firstChild) frag.appendChild(container.firstChild);
          } else if (gaveContainer) {
            container.removeChild(this);
          }

          return nodeList;
        }
        else {
          // No immediate child selector used
          return oldMethod.call(this, query);
        }
      };
    }

    // Browser doesn't support :scope, add polyfill
    overrideNodeMethod(HTMLElement.prototype, 'querySelector');
    overrideNodeMethod(HTMLElement.prototype, 'querySelectorAll');
  }
}());