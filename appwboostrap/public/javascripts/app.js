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

//============================================================
// explore button click -> browse MUSICIANS
$("#explorebtn").on("click", function(){
  window.location.href='/users/all';
})


$("#cancelupdate").on("click", function(){
  window.location.href='/users/profile';
})
