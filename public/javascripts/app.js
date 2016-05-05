// dan hates jquery

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

// cancel the update form and return to profile
$("#cancelupdate").on("click", function(){
  window.location.href='/users/profile';
})


// //============================================================
$("#favorite").on("click", function(){
  $("#favorite").css('width', '200px');
  $("#favorite").html("Added to Favorites! &#x2714;");
})

// previous before typed.js
$('#regionA').attr('data-content', 0);
var contentAll = {regionA: [['drummer', 1000], ['violist', 1000], ['keyboardist', 1000], ['synthgod', 1000], ['violinist', 1000], ['pig squealer', 1000], ['soprano', 1000], ['saxophonist', 1000], ['flutist', 1000]]};
var changeRegion = function(id){
  var $el = $('#'+id),
  num = $el.attr('data-content'),
  content = contentAll[id],
  numMax = content.length,
  time = null;
  num = (num+1)%content.length;
  time = content[num][1];
  $el.html(content[num][0]);
  $el.attr('data-content', num);
  setTimeout(function(){
    changeRegion(id)}, time);
};
setTimeout(function(){changeRegion('regionA')},contentAll['regionA'][0][0]);


// typed.js
$(function(){
  $(".element").typed({
    strings: ["drummer", "violist", "keyboardist", "synthgod", "violinist", "pig squealer", "soprano", "saxophonist", "flutist", "guitarist", "bassist", "harmonica god", "accordionist", "organist", "oboist", "cellist", "noise guitarist", "headbanger", "rapper", "diva", "acoustic guitarist", "drummer", "violist", "keyboardist", "synthgod", "violinist", "pig squealer", "soprano", "saxophonist", "flutist", "guitarist", "bassist", "harmonica god", "accordionist", "organist", "oboist", "cellist", "noise guitarist", "headbanger", "rapper", "diva","drummer", "violist", "keyboardist", "synthgod", "violinist", "pig squealer", "soprano", "saxophonist", "flutist", "guitarist", "bassist", "harmonica god", "accordionist", "organist", "oboist", "cellist", "noise guitarist", "headbanger", "rapper", "diva","drummer", "violist", "keyboardist", "synthgod", "violinist", "pig squealer", "soprano", "saxophonist", "flutist", "guitarist", "bassist", "harmonica god", "accordionist", "organist", "oboist", "cellist", "noise guitarist", "headbanger", "rapper", "diva" ],
    typeSpeed: 100,
    showCursor: false,
    backSpeed: 40
  });
});



// image upload?
var base64image = '';

function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
             $("#myImage").val(e.target.result)
             base64image = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
};

var contributeData = {}
$("e").submit(function(e) {
  e.preventDefault();
  contributeData.image = base64image;
  $.ajax({
    url:  "../images/",
    data: contributeData,
    type: "POST",
    success: function(what) {
      console.log('I did it');
      console.log(what);
      location.href = "/thankyou"
    },
    error: function(err) {
      console.log(err);
    }
  })
});
