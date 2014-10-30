/* jshint -W030 */
describe('scopedQuerySelectorShim', function() {
  function makeNode(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    var node = div.children[0];
    div.removeChild(node);
    return node;
  }

  function makeNodeAndAddToDOM(html) {
    var node = makeNode(html);
    document.body.appendChild(node);
    return node;
  }

  function makeNodeAndAddToFragment(html) {
    var frag, node;
    frag = document.createDocumentFragment();
    node = makeNode(html);
    frag.appendChild(node);
    return node;
  }

  function testChildNode(node) {
    expect(node.innerHTML).toBe('Child');
  }

  function testChildNodeList(nodeList) {
    expect(nodeList.length).toBe(1);
    testChildNode(nodeList[0]);
  }
  
  function testComplexNodeList(nodeList) {
    testGrandChildNode(nodeList[0]);
    testGrandChildNode1(nodeList[1]);
    testGrandChildNode2(nodeList[2]);
    testGrandChildNode3(nodeList[3]);
  }

  function testGrandChildNode(node) {
    expect(node.innerHTML).toBe('Grandchild 1');
  }

  function testGrandChildNode1(node) {
    expect(node.innerHTML).toBe('Grandchild 2');
  }

  function testGrandChildNode2(node) {
    expect(node.innerHTML).toBe('Grandchild 3');
  }

  function testGrandChildNode3(node) {
    expect(node.innerHTML).toBe('Grandchild 4');
  }

  function testGrandChildNodeList(nodeList) {
    testGrandChildNode(nodeList[0]);
    testGrandChildNode1(nodeList[1]);
  }

  var idHTML = '<div id="myDiv">\
    <header>Child</header>\
  </div>';

  var childHTML = '<div>\
    <header>Child</header>\
    <div>\
      <header>Grandchild</header>\
    </div>\
  <div>';

  var listHTML = '<div>\
    <ul>\
      <li>Grandchild 1</li>\
      <li>Grandchild 2</li>\
    </ul>\
  </div>';

  var complexHTML = '<div>\
    <ul>\
      <li>Grandchild 1</li>\
      <li>Grandchild 2</li>\
    </ul>\
    <ol>\
      <li>Grandchild 3</li>\
      <li>Grandchild 4</li>\
    </ol>\
  </div>';

  describe('when nodes are in the DOM', function() {
    it('should find child nodes', function() {
      testChildNode(makeNodeAndAddToDOM(childHTML).querySelector(':scope > header'));
      testChildNodeList(makeNodeAndAddToDOM(childHTML).querySelectorAll(':scope > header'));
    });

    it('should find grandchild nodes', function() {
      testGrandChildNode(makeNodeAndAddToDOM(listHTML).querySelector(':scope > ul > li'));
      testGrandChildNodeList(makeNodeAndAddToDOM(listHTML).querySelectorAll(':scope > ul > li'));
    });

    it('should handle complex queries', function() {
      testGrandChildNode(makeNodeAndAddToDOM(complexHTML).querySelector(':scope > ul > li, :scope > ol > li'));
      testComplexNodeList(makeNodeAndAddToDOM(complexHTML).querySelectorAll(':scope > ul > li, :scope > ol > li'));
    });
  });

  describe('when nodes are not in the DOM', function() {
    it('should find child nodes', function() {
      testChildNode(makeNode(childHTML).querySelector(':scope > header'));
      testChildNodeList(makeNode(childHTML).querySelectorAll(':scope > header'));
    });

    it('should find grandchild nodes', function() {
      testGrandChildNode(makeNode(listHTML).querySelector(':scope > ul > li'));
      testGrandChildNodeList(makeNode(listHTML).querySelectorAll(':scope > ul > li'));
    });

    it('should handle complex queries', function() {
      testGrandChildNode(makeNode(complexHTML).querySelector(':scope > ul > li, :scope > ol > li'));
      testComplexNodeList(makeNode(complexHTML).querySelectorAll(':scope > ul > li, :scope > ol > li'));
    });
  });

  describe('when nodes are in a document fragment', function() {
    it('should find child nodes', function() {
      testChildNode(makeNodeAndAddToFragment(childHTML).querySelector(':scope > header'));
      testChildNodeList(makeNodeAndAddToFragment(childHTML).querySelectorAll(':scope > header'));
    });

    it('should find grandchild nodes', function() {
      testGrandChildNode(makeNodeAndAddToFragment(listHTML).querySelector(':scope > ul > li'));
      testGrandChildNodeList(makeNodeAndAddToFragment(listHTML).querySelectorAll(':scope > ul > li'));
    });

    it('should handle complex queries', function() {
      testGrandChildNode(makeNodeAndAddToFragment(complexHTML).querySelector(':scope > ul > li, :scope > ol > li'));
      testComplexNodeList(makeNodeAndAddToFragment(complexHTML).querySelectorAll(':scope > ul > li, :scope > ol > li'));
    });
  });

  describe('when temporary containers and IDs are used', function() {
    it('should not leave nodes in temporary container', function() {
      var node = makeNode(childHTML);
      expect(node.parentNode).toBe(null);
      node.querySelectorAll(':scope > header');
      expect(node.parentNode).toBe(null);
    });

    it('should not leave temporary IDs', function() {
      var node = makeNode(childHTML);
      expect(node.id).toBe('');
      node.querySelectorAll(':scope > header');
      expect(node.id).toBe('');
    });
  });

  describe('when nodes have IDs', function() {
    it('should not overwrite existing IDs', function() {
      var node = makeNode(idHTML);
      expect(node.id).toBe('myDiv');
      node.querySelectorAll(':scope > header');
      expect(node.id).toBe('myDiv');
    });
  });
});
