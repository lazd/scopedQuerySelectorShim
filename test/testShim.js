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

  function testChildNode(node) {
    expect(node.innerHTML).to.equal('Child');
  }

  function testChildNodeList(nodeList) {
    expect(nodeList.length).to.equal(1);
    testChildNode(nodeList[0]);
  }

  function testGrandChildNode(node) {
    expect(node.innerHTML).to.equal('Grandchild 1');
  }

  function testGrandChildNode1(node) {
    expect(node.innerHTML).to.equal('Grandchild 2');
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
  </div>';

  var listHTML = '<div>\
    <ul>\
      <li>Grandchild 1</li>\
      <li>Grandchild 2</li>\
    </ul>\
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
  });

  describe('when temporary containers and IDs are used', function() {
    it('should not leave nodes in temporary container', function() {
      var node = makeNode(childHTML);
      expect(node.parentNode).to.be.null;
      node.querySelectorAll(':scope > header');
      expect(node.parentNode).to.be.null;
    });

    it('should not leave temporary IDs', function() {
      var node = makeNode(childHTML);
      expect(node.id).to.equal('');
      node.querySelectorAll(':scope > header');
      expect(node.id).to.equal('');
    });
  });

  describe('when nodes have IDs', function() {
    it('should not overwrite existing IDs', function() {
      var node = makeNode(idHTML);
      expect(node.id).to.equal('myDiv');
      node.querySelectorAll(':scope > header');
      expect(node.id).to.equal('myDiv');
    });
  });
});
