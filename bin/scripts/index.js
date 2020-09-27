///////////////burger menu interaction

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
  
  
});

///////////////////////////// products carrousel

let currentProductsNew = 0;
const products__section__new = document.querySelector('.products__section--new');
const products__item__new = products__section__new.querySelectorAll('.products__item');

console.log(products__item__new);

function handleSliderProductsNew() {
  currentProductsNew++;
  if(currentProductsNew >= products__item__new.length) {

    currentProductsNew = 0;
  }
  const widthNew = products__item__new[0].clientWidth;
  products__section__new.style.transform = 'translate(-' + (widthNew * currentProductsNew) + 'px,0px)';
}

if(window.matchMedia("(max-width: 600px)").matches){
  //values_stripe.addEventListener('click',handleSliderValues);
  //setInterval(handleSliderProductsNew,3000);
}

let currentProductsFavorite = 0;
const products__section__favorite = document.querySelector(' .products__section--favorite');
  //const products__item__favorite = elementProduct.querySelectorAll('.products__item');

/*
  function handleSliderProducts() {
    currentProducts++;
    console.log(products__item.length)
    if(currentProducts >= products__item.length) {
  
      currentProducts = 0;
    }
    const width = products__section[indexProduct].clientWidth;
    products__section[indexProduct].style.transform = 'translate(-' + (width * currentProducts) + 'px,0px)';
  }

  if(window.matchMedia("(max-width: 600px)").matches){
    //values_stripe.addEventListener('click',handleSliderValues);
    setInterval(handleSliderProducts,3000);
  }
*/




//////////////////////////////////// experiences interaction

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

//////////////////////////////////values carrousel interaction

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
 