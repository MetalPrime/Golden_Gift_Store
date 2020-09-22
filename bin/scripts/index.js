const btn_nav = document.querySelector('.burgermenu__btn');
console.log(btn_nav);
btn_nav.addEventListener('click',()=>{
  console.log("está clickeando");
  btn_nav.classList.add('burgermenu__btn--clicked');
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

slider.forEach(element => {
    element.addEventListener('input', () =>{
        img.forEach(ele => {
            if(element === ele){
                ele.style.opacity = element.value;
            }
            
          }); 
    });
});
