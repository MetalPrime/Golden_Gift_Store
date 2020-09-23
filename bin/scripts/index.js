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
