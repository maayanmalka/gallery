var $gallery;
var $galleryBtnRight;
var $galleryBtnLeft;
var galleryWidth;
var currentSlide = 1;
var numOfSlides
var width = 300;
var speed = 300;
var $counter;


$(document).ready(function() {


  //configuration


  $counter = $('.counter')
  $gallery = $('#gallery');
  $galleryBtnRight = $('.gallery__button--right')
  $galleryBtnLeft = $('.gallery__button--left')
  numOfSlides = $('.gallery__item').length;
  galleryWidth = 300 * (numOfSlides - 1) ;
  setCounter()

  $galleryBtnRight.click( function (){
      gallerySildeRight ();
  })
  $galleryBtnLeft.click( function (){
      gallerySildeLeft ();
  })


  // configure hammer.js
  var galleryTouchElement = document.getElementById('gallery');
  var galleryTouchControl = new Hammer(galleryTouchElement);

  function dragElement (event){
    gallerySildeRight ();
    currentSlide++
  }

  // listen to events...
  galleryTouchControl.on("swipeleft swipeup", gallerySildeLeft );
  galleryTouchControl.on("swiperight swipeup", gallerySildeRight );





});

// functions
function gallerySildeLeft () {
  if (currentSlide === numOfSlides ){
    console.log("eached End of gallery")
    currentSlide = 1;
    $gallery.css({'margin-left' : 0});
  }
  $gallery.animate({'margin-left' : '-=' + width} , speed)

  currentSlide++
  setCounter()
};
function gallerySildeRight (){
  if (currentSlide === 1){
    console.log("eached Start of gallery")
    currentSlide = numOfSlides;
    $gallery.css({'margin-left' :  galleryWidth * (-1)});
  }
  $gallery.animate({'margin-left' : '+=' + width} , speed)

  currentSlide--
  setCounter()
};

function setCounter () {
  $counter.html('slide: ' + currentSlide)
}
