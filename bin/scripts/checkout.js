window.addEventListener('load',function(event){

const db = firebase.firestore();
const wishRef = db.collection('wish');
const storageRef = firebase.storage().ref();
const orderRef = db.collection('order');

const steps__cart = document.querySelector('.steps__cart');
const steps__send = document.querySelector('.steps__send');
const steps__pay = document.querySelector('.steps__pay');
const steps__result = document.querySelector('.steps__result');


const steps__cartNext = steps__cart.querySelector('.steps__cartNext');
const steps__cartReturn = steps__cart.querySelector('.steps__cartReturn');

const steps__sendNext = steps__send.querySelector('.steps__sendNext');
const steps__sendReturn = steps__send.querySelector('.steps__sendReturn');

const steps__payNext = steps__pay.querySelector('.steps__payNext');
const steps__payReturn = steps__pay.querySelector('.steps__payReturn');

const steps__resulttNext = steps__result.querySelector('.steps__resultNext');
const steps__resultReturn = steps__result.querySelector('.steps__resultReturn');

///////////////////

steps__cartNext.addEventListener('click',function(){
    steps__cart.classList.add('hidden');
    steps__send.classList.remove('hidden');
});

steps__sendNext.addEventListener('click',function(){
    const form = steps__send.querySelector('form');
    form.addEventListener('submit',function(event){
        event.preventDefault();

        steps__send.classList.add('hidden');
        steps__pay.classList.remove('hidden');
    });

});

steps__payNext.addEventListener('click',function(){
    const form = steps__pay.querySelector('form');
    form.addEventListener('submit',function(event){
    event.preventDefault();
    steps__pay.classList.add('hidden');
    steps__result.classList.remove('hidden');
    });
});

const form__one = document.querySelector('.form__one');
const form__two = document.querySelector('.form__two');

steps__resulttNext.addEventListener('click',function(){
    
    const newOrder = {
        sendName : form__one.sendName.value,
        sendPhone : form__one.sendPhone.value,
        sendEmail : form__one.sendEmail.value,
        sendDirection : form__one.sendDirection.value,
        sendReceiver : form__one.sendReceiver.value,
        sendReceiverEmail : form__one.sendReceiverEmail.value,
        sendReceiverDirection : form__one.sendReceiverDirection.value,
        sendMsgShare : form__one.sendMsgShare.value,
        sendTime : form__one.sendTime.value,
        sendHour : form__one.sendHour.value,
        payName : form__two.payName.value,
        payPhone : form__two.payPhone.value,
        payEmail : form__two.payEmail.value,
        payDirection : form__two.payDirection.value,
        total : totalPrice,
        products : objects,
    }

    orderRef
    .add(newOrder)
    .then(
        function(){
            steps__result.classList.add('hidden');
            steps__cart.classList.remove('hidden');
            
            wishRef.onSnapshot(snapshot => {
                snapshot.docs.forEach(doc => {
                    wishRef.doc(doc.id).delete().then(
                        function(){
                            console.log("Document successfully deleted!");
                            window.location.href = 'store.html';
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    })
                })
            })

        }
    )
    .catch(function(error){
        console.error("Error adding document: ", error);

    });


});

////////////////////

steps__cartReturn.addEventListener('click',function(){
    steps__cart.classList.remove('hidden');
    window.location.href = 'store.html';
});

steps__sendReturn.addEventListener('click',function(){
        steps__send.classList.add('hidden');
        steps__cart.classList.remove('hidden');
    

});

steps__payReturn.addEventListener('click',function(){
    steps__pay.classList.add('hidden');
    steps__send.classList.remove('hidden');
});

steps__resultReturn.addEventListener('click',function(){
    steps__result.classList.add('hidden');
    steps__pay.classList.remove('hidden');
});



let price;
let totalProducts = 0;
let totalPrice = 0;
/////////////////////
const steps__cartList = document.querySelector('.steps__cartList');
function renderItemsCarts (list) {

    steps__cartList.innerHTML = '';


    list.forEach(element => {
        const newCartItem = document.createElement('div');
        newCartItem.classList.add('cartItem');

        storageRef.child(element.img).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:
            var img = newCartItem.querySelector('img');
            img.src = url;
          }).catch(function(error) {
            // Handle any errors
          });

        newCartItem.innerHTML = `
        <img class="carItem__img" src="" alt="imgProduct">
        <h3 class="carItem__title">${element.title}</h3>
        <p class="cartItem__price">$ ${element.price}</p>
        <button class="carItem__delete buttom">Eliminar</button>
        `;

        const carItem__delete = newCartItem.querySelector('.carItem__delete');

        if(carItem__delete!=null){
            carItem__delete.addEventListener('click',function(){
                //loader.classList.add('loader--show');
                wishRef // referencia de la colección
                .doc(element.id) // referencia de un documento específico en esa colección
                .delete() // elimine el documento asociado a esa referencia
                .then(function() {
                  // debería entrar si todo sale bien
                  console.log("Document successfully deleted!");
                  getCarItems(); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
                  
                })
                .catch(function(error) {
                  // debería entrar si ocurre algún error
                  console.error("Error removing document: ", error);
                });
              }); 
        }

        const priceVanilaNumber = document.querySelector('.priceVanilaNumber');
        const taxNumber = document.querySelector('.taxNumber');
        const sendPriceNumber = document.querySelector('.sendPriceNumber');
        const discountNumber = document.querySelector('.discountNumber');
        const totalNumber = document.querySelector('.totalNumber');


        price = parseInt(element.price,0);
        totalProducts = price+=totalProducts;
        priceVanilaNumber.innerHTML = totalProducts+".000";
        taxNumber.innerHTML = '5.000';
        sendPriceNumber.innerHTML = '5.000';
        discountNumber.innerHTML = '0';

        totalPrice = totalProducts+5+5+0;
        totalNumber.innerHTML = totalPrice + ".000";
        console.log(totalProducts);


        steps__cartList.appendChild(newCartItem);
    });

    
}


const objects = [];
function getCarItems(){
    wishRef.
    get().
    then((querySnapshot) =>{
        
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);

    });
    window.addEventListener('load',function (event) {
                      
    })
    renderItemsCarts(objects);
});


}

getCarItems();

});