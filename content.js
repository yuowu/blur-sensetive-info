const sensitiveWords = ["John Doe", "69 Femboy St, Columbus, OH", "creampie@femboy.com"]
var textNodes = [];


function highlightText(text) {
  var span = document.createElement('span');
  span.style.filter = 'blur(8px)';
  span.textContent = text;

  span.addEventListener('mouseover', function() {
    this.style.filter = 'blur(0px)';
  });
  
  span.addEventListener('mouseout', function() {
    this.style.filter = 'blur(8px)';
  });
  
  return span;
}

(function getTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  } else {
    for (var i = 0, len = node.childNodes.length; i < len; ++i) {
      getTextNodes(node.childNodes[i]);
    }
  }
})(document.body);

textNodes.forEach(function(node) {
  var text = node.textContent;

  sensitiveWords.forEach(function(sensitiveWord) {
    var regex = new RegExp(sensitiveWord, 'gi');
    var match;

    while ((match = regex.exec(text)) !== null) {
      var startIndex = text.lastIndexOf('.', match.index) + 1;
      var endIndex = text.indexOf('.', match.index + match[0].length);
      if (endIndex === -1) endIndex = text.length;

      if (endIndex > node.length) {
        endIndex = node.length;
      }
      var sentence = text.slice(startIndex, endIndex);
      var highlightedSentence = highlightText(sentence);
      var range = document.createRange();
      range.setStart(node, startIndex);
      range.setEnd(node, endIndex);
      range.deleteContents();
      range.insertNode(highlightedSentence);
    }
  });
});
