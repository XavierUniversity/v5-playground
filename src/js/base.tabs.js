var Tabs = {
   init: function() {
     this.bindUIfunctions();
     this.pageLoadCorrectTab();
   },
   bindUIfunctions: function() {
     // Delegation
     $(document)
       .on("click", ".tabs a[href^='#']:not('.visible')", function(event) {
         Tabs.changeTab(this.hash);
         event.preventDefault();
       })
       .on("click", ".tabs a.visible", function(event) {
         event.preventDefault();
       });
   },
   changeTab: function(hash) {
     var anchor = $('[href="' + hash + '"]');
     var div = $(hash);
     var btn = $('[data-toggle="' + hash + '"]');
     // activate correct anchor (visually)
     anchor.addClass("visible").parent().siblings().find("a").removeClass("visible");
     anchor.addClass('on').parent().siblings().find('a').removeClass('on');
     btn.addClass('on').parent().siblings().find('button').removeClass('on');
     // activate correct div (visually)
     div.addClass("visible").siblings().removeClass("visible");
     // update URL, no history addition
     window.history.replaceState("", "", hash);
   },
   // If the page has a hash on load, go to that tab
   pageLoadCorrectTab: function() {
     if ( document.location.hash != ""){
       this.changeTab(document.location.hash);
     }
   }
 }
 Tabs.init(); 