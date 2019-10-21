var data;
// Load the data....
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.xavier.edu/student-outcomes/custom/outcomes.read.php', false);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function(){
  if ( xhr.status === 200 ){
    data = JSON.parse(xhr.responseText);
  }
  document.getElementById("swapper").addEventListener("change", loadData);
  window.addEventListener("load", loadData("all"));
};
xhr.send();
function updateStat(svgID, stat){
  var circle = document.getElementById(svgID);
  var bar = circle.childNodes[3];
  var r = bar.getAttribute('r');
  var c = Math.PI*(r*2);
  if ( stat < 0 ) stat = 0;
  if ( stat > 100 ) stat = 100;
  
  var pct = ((100-stat)/100)*c;
  bar.style.strokeDashoffset = pct;
  document.getElementById(svgID+"-cont").setAttribute('data-pct', stat); 
}

function arraySearch(arr, val){
  for ( var i=0; i<arr.length; i++)
    if ( arr[i]['Grouping'].toLowerCase() === val.toLowerCase())
      return i;
  return false;
}

function loadData(e){
  var i = ( e == "all" ? arraySearch(data, "all") : arraySearch(data, e.target.value) );
  var val = data[i];
  updateStat("success", val['Success Rate']);
  updateStat("employed", val['Employed']);
  updateStat("continuing-ed", val['Grad School']);
  updateStat("serving", val['Volunteering']);
  updateData("employers", val['Top Employers']);
  updateData("majors_list", val['Majors']);
  updateData("jobs", val['Top Jobs']);
}
function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

function updateData(id, content){
  var div = document.getElementById(id);
  content = content.split(/(?:;)\s*/);
  var html = '';
  var size = ( content.length > 7 ? 7 : content.length);
  for ( var i = 0; i < size; i++ ){
    if ( id == "majors_list" ){
      var all = content[i];
      var link = all.match(/\(([^)]+)\)/)[1];
      var prog = all.replace(/\(([^)]+)\)/, '');
      html += '<li><a href="'+link+'">'+prog+'</a></li>';
    } else {
      html += "<li>"+ escapeHtml(content[i]) + "</li>";  
    }
  }
  if ( id == "majors_list" ){
    html += '<li><a id="view_all" href="/academics/undergraduate#show-programs"><strong>View all Majors</strong></a></li>';
  }
  div.innerHTML = "<ul>"+html+"</ul>";
}