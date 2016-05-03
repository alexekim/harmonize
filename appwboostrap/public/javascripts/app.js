$(document).ready(function(){
  console.log("the window is loaded")
  $('.login').hide();
  $('#youtubediv').hide();
});


//============================================================
//login register toggle
$("#toggleloginreg").on("click", function(){
  $('.register').fadeOut();
  $('.login').delay(500).fadeIn();
})

$("#waitgoback").on("click", function(){
  $('.login').fadeOut();
  $('.register').delay(500).fadeIn();
})


//============================================================
// Youtube helper toggle
$("#youtubeguide").on("click", function(){
  $("#youtubediv").slideDown();
})

$("#youtubediv").on("click", function(){
  $("#youtubediv").slideUp();
})
