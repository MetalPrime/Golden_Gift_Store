

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
