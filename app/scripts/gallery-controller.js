// (function(){
//   alert('test')
// })();


// // my-script.js

$(document).ready(function() {

  $('.gallery__button--right').click( function (){
      gallerySildeRight ();
  })

  $('.gallery__button--left').click( function (){
      gallerySildeLeft ();
  })



});


// functions
var gallerySildeRight = function(){
  $('.gallery').hide()
};

var gallerySildeLeft = function(){
  $('.gallery').show()
};
