const content = document.getElementById('content').innerHTML

function slicedWords() {
  var words = content.split(/\s+/);
  var limitedText = words.slice(0, 30).join(" ");
  document.getElementById("shortText").innerText = limitedText + (words.length > 30 ? "..." : "");
}
