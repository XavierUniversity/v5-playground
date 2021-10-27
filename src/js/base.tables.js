function wrap(top, selector, bottom){
  var matches = document.querySelectorAll(selector);
  for (var i = 0; i < matches.length; i++){
    var modified = top + matches[i].outerHTML + bottom;
    matches[i].outerHTML = modified;
  }
}
wrap("<div style='display: grid;'><div class='resp-table'>", "table:not(.no-resp)", "</div></div>");
