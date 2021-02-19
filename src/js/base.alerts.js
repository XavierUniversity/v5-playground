var alert   = document.querySelector('.alert');
var header  = document.querySelector('.header');
var button  = document.getElementById('close-alert') !== null;
var expires = alert.dataset.date;

if ( alert !== null && header.classList.contains('header--fixed') ){
  var styles = 'position: absolute; top: 58px; width: 100%; z-index: 10;';
  alert.style.cssText = styles;
}

if (window.localStorage.getItem('no_alert_'+expires)) {
	alert.style.display = 'none';
}

if ( button ){
  document.getElementById('close-alert').addEventListener('click', function ( event ){
    event.preventDefault();
    window.localStorage.setItem('no_alert_'+expires, true);
    alert.style.display = 'none';
  })
}