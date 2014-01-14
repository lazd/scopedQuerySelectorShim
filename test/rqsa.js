/* jshint -W030 */
describe('rootedQuerySelectorAll', function() {
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

  function testChild(nodeList) {
    expect(nodeList.length).to.equal(1);
    expect(nodeList[0].innerHTML).to.equal('Child');
  }

  function testList(nodeList) {
    expect(nodeList[0].innerHTML).to.equal('Grandchild 1');
    expect(nodeList[1].innerHTML).to.equal('Grandchild 2');
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
      testChild(rootedQuerySelectorAll(makeNodeAndAddToDOM(childHTML), '> header'));
    });

    it('should find grandchild nodes', function() {
      testList(rootedQuerySelectorAll(makeNodeAndAddToDOM(listHTML), '> ul > li'));
    });
  });

  describe('when nodes are not in the DOM', function() {
    it('should find child nodes', function() {
      testChild(rootedQuerySelectorAll(makeNode(childHTML), '> header'));
    });

    it('should find grandchild nodes', function() {
      testList(rootedQuerySelectorAll(makeNode(listHTML), '> ul > li'));
    });
  });

  describe('when temporary containers and IDs are used', function() {
    it('should not leave nodes in temporary container', function() {
      var node = makeNode(childHTML);
      expect(node.parentNode).to.be.null;
      rootedQuerySelectorAll(node, '> header');
      expect(node.parentNode).to.be.null;
    });

    it('should not leave temporary IDs', function() {
      var node = makeNode(childHTML);
      expect(node.id).to.equal('');
      rootedQuerySelectorAll(node, '> header');
      expect(node.id).to.equal('');
    });
  });

  describe('when nodes have IDs', function() {
    it('should not overwrite existing IDs', function() {
      var node = makeNode(idHTML);
      expect(node.id).to.equal('myDiv');
      rootedQuerySelectorAll(node, '> header');
      expect(node.id).to.equal('myDiv');
    });
  });
});
