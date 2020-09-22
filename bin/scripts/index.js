

const slider = document.querySelectorAll('.experiences__slider');
const img = document.querySelectorAll('.experiences__interaction img');

console.log(slider);
console.log(img);
function handleSlider () {
  console.log('hola', slider.value);
  img.array.forEach(ele => {
    ele.style.opacity = element.value;
  });
  
  //img1.style.width = (slider1.value * 100) + '%';
}
slider.forEach(element => {
    element.addEventListener('input', handleSlider);
});
