$("#all-button").click(function() {
     $(".select-box__container").addClass("academic-programs__visible");
     $("h2").show();
      $( ".select-box" ).each(function( index ) { // Loop each of the groups
        if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
          $( this ).prev().hide(); // Hide the previous element
        }
      });
     $(".all-categories").show();
     $(".undergraduate-categories").hide();
     $(".graduate-categories").hide();
});

$("#undergrad-button").click(function() {
    $(".all-categories").hide();
    $(".undergraduate-categories").show();
    $(".graduate-categories").hide();
});

$("#grad-button").click(function() {
  $(".all-categories").hide();
    $(".undergraduate-categories").hide();
    $(".graduate-categories").show();
});

$("#undergrad-button, #grad-button, #all-button").click(function() {
  var val1 = $('[name=degree-radio]:checked').val();
  var degree = $(this).data('degree');
  $(".select-box__container[data-degree!='"+degree+"']").removeClass("academic-programs__visible");
  $(".select-box__container[data-degree='"+degree+"']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$(".cats-btn-a").click(function() {
  var category = $(this).data('category');
  $(".select-box__container[data-category!='"+category+"']").removeClass("academic-programs__visible");
  $(".select-box__container[data-category*='"+category+"']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$(".cats-btn-u").click(function() {
  var category = $(this).data('category');
  $(".select-box__container[data-category!='"+category+"'][data-degree='undergraduate']").removeClass("academic-programs__visible");
  $(".select-box__container[data-category*='"+category+"'][data-degree='undergraduate']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$(".cats-btn-g").click(function() {
  var category = $(this).data('category');
  $(".select-box__container[data-category!='"+category+"'][data-degree='graduate']").removeClass("academic-programs__visible");
  $(".select-box__container[data-category*='"+category+"'][data-degree='graduate']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$("#all-a-button").click(function() {
     $(".select-box__container").addClass("academic-programs__visible");
     $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});
$("#all-u-button").click(function() {
     $(".select-box__container[data-degree='undergraduate']").addClass("academic-programs__visible");
     $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});
$("#all-g-button").click(function() {
     $(".select-box__container[data-degree='graduate']").addClass("academic-programs__visible");
     $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});