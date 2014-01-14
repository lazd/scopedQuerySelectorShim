function rootedQuerySelectorAll(root, query) {
  var nodeList,
      gaveId = false,
      gaveContainer = false;

  if (query.charAt(0) === '>') {
    try { // Browser supports :scope
      return root.querySelectorAll(':scope '+query);
    }
    catch (e) { // Browser does not support :scope
      if (!root.parentNode) {
        // Add to temporary container
        document.createElement('div').appendChild(root);
        gaveContainer = true;
      }

      parentNode = root.parentNode;

      if (!root.id) {
        // Give temporary ID
        root.id = 'rootedQuerySelectorAll_id_'+(new Date()).getTime();
        gaveId = true;
      }

      // Find elements against parent node
      nodeList = parentNode.querySelectorAll('#'+root.id+' '+query);

      // Reset the ID
      if (gaveId) {
        root.id = '';
      }

      // Remove from temporary container
      if (gaveContainer) {
        parentNode.removeChild(root);
      }

      return nodeList;
    }
  }
  else {
    // No immediate child selector used
    return root.querySelectorAll(query);
  }
}
