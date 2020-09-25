const btn_nav = document.querySelector('.burgermenu__btn');
const navbar = document.querySelector('.navbar');
console.log(btn_nav);

btn_nav.addEventListener('click',()=>{
  console.log("está clickeando");

  if(btn_nav.classList.contains('burgermenu__btn--clicked')){
    btn_nav.classList.remove('burgermenu__btn--clicked');
    btn_nav.classList.remove('burgermenu__btn--collapsed');

    navbar.classList.remove('navbar--isActived');

  } else{
    btn_nav.classList.add('burgermenu__btn--clicked');
    btn_nav.classList.add('burgermenu__btn--collapsed');

    navbar.classList.add('navbar--isActived');
  }
  
  
})



////////////////////////////////////

const slider = document.querySelectorAll('.experiences__slider');
const img = document.querySelectorAll('.experiences__interaction img');

console.log(slider);
console.log(img);

function handleSlider () {
  console.log('hola', slider.value);
 
  //img1.style.width = (slider1.value * 100) + '%';
}

slider.forEach((element,index) => {
  
    element.addEventListener('input', () =>{
        img[index].style.opacity = element.value;
    });
});

//////////////////////////////////


let current = 0;
const values_stripe = document.querySelector('.values__stripe');
const values_items = document.querySelectorAll('.values__items');




function handleSliderValues() {
  current++;
  if(current >= values_items.length) {
    current = 0;
  }
  const height = values_stripe.clientHeight;
  values_stripe.style.transform = 'translate(0px, -' + (height * current) + 'px)';
}

if(window.matchMedia("(max-width: 600px)").matches){
  values_stripe.addEventListener('click',handleSliderValues);
  setInterval(handleSliderValues,2000);
}



/*values_stripe.setAttribute('max', values_stripe.children.length - 1);
values_stripe.addEventListener('click', function() {
  const heiight = values_stripe.clientHeight;
  const value = values_stripe.children.length;
  values_items.style.transform = '0px,translate(-' + (heiight * value) + 'px )';
  console.log(value)
});*/


///////////////////////////////////////////////
//Creation of the star rating in the product

const starsContainer = document.querySelectorAll('.products__rating');

starsContainer.forEach(function(element,i){


  const ratingStars = element.querySelectorAll('.products__star');

  ratingStars.forEach(function (elem, index) {

    elem.addEventListener('click', function() {
      console.log(i);
  
      /* ratingStars.forEach(function (star, i) {
        if(i <= index) {
          star.classList.add('rating__star--filled');
        } else {
          star.classList.remove('rating__star--filled');
        }
      }); */
  
      for(let i = 0; i < ratingStars.length; i++) {
        if(i <= index) {
          ratingStars[i].classList.add('products__star--filled');
        } else {
          ratingStars[i].classList.remove('products__star--filled');
        }
      }
  
    });
  });


});
 