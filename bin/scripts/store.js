

  const db = firebase.firestore();
  const productsRef = db.collection('products');
  const storageRef = firebase.storage().ref();

    //referencia a la zona de pedidos del usuario
    const wishsRef = db.collection('wish');
  
  const productsList = document.querySelector('.productslist');
// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('div');
    newProduct.classList.add('product');

    const url = `viewProduct.html?${elem.id}-${elem.title}`;
    newProduct.setAttribute('href',url);

    storageRef.child(elem.img).getDownloadURL().then(function(url) {
      // Or inserted into an <img> element:
      var img = newProduct.querySelector('img');
      img.src = url;
    }).catch(function(error) {
      // Handle any errors
    });

    newProduct.innerHTML = `
    <a href=${url} class="product__container">
    <img class="product__img" src="" alt="imgProduct">
    <div class="product__info">
      <p class="product__price"> ${elem.categorie}</p>
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
    </div>
    </a>
    <div class="product__btn">
      <button class="product__delete">X</button>
      <button class="product__edit"><img src="./data/img/edit.svg" alt="imgEdit"></button>
      <button class="product__add buttom">Agregar</button>
    </div>

    `;





    // seleccionamos el botón "Eliminar" que se acaba de crear en este elemento
    const deleteBtn = newProduct.querySelector('.product__delete');
    deleteBtn.addEventListener('click',function(){
      //loader.classList.add('loader--show');
      productsRef // referencia de la colección
      .doc(elem.id) // referencia de un documento específico en esa colección
      .delete() // elimine el documento asociado a esa referencia
      .then(function() {
        // debería entrar si todo sale bien
        console.log("Document successfully deleted!");
        getProducts(productsRef); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
      })
      .catch(function(error) {
        // debería entrar si ocurre algún error
        console.error("Error removing document: ", error);
      });
    });

    // seleccionar el botón de editar
    // al hacer click al botón de editar
    const editBtn = newProduct.querySelector('.product__edit');
    editBtn.addEventListener('click', function() {
      form.title.value = elem.title;
      form.image.value = elem.img;
      form.price.value = elem.price;
      selectedItem = elem;
    });

    const addBtn = newProduct.querySelector('.product__add');
        //se añade un producto a la colección pedido, si el usuario está registrado
        addBtn.addEventListener('click',function(event){
          event.preventDefault();
          firebase.auth().onAuthStateChanged(function(user) {
            if(user){    
                const newWishRef =  wishsRef.doc();
    
                const newItemWish = {
                  title: elem.title,
                  img: elem.img,
                  price:  elem.price,
                  description :  elem.description,
                  categorie :  elem.categorie,
                  size :  elem.size,
                  numberItems :  elem.numberItems,
                  status:  elem.status,
                  focus :  elem.focus,
                  idUser : user.uid,
                }
    
                newWishRef.set(newItemWish).then(function(){
                  window.location.href = 'checkout.html';
                });
              
    
    
            } else{
              alert("Por favor, inicie sesión");
            }
          });
        });

    productsList.appendChild(newProduct);
  });
}

const sortNode = document.querySelector('.sort');
const orders = sortNode.querySelector('select');


function sortProducts(list){
   
 switch(orders.options[orders.selectedIndex].value){
  case 'morePrice':

    list.sort(
      function(a,b){
        return b.price - a.price;
      }
  );
    break;
  case 'lessPrice':
    list.sort(
      function(a,b){
        return a.price - b.price;
      }
  );
    break;
  case 'moreSize':
    list.sort(
      function(a,b){

        return a.size > b.size ? 1: -1;
      }
  );
    break;
  case 'lessSize':
    list.sort(
      function(a,b){
        console.log(b.size +""+ a.size)
        return b.size > a.size ? 1: -1;
      }
  );
    break;
  case 'lotProducts':
    list.sort(
      function(a,b){
        return b.numberItems - a.numberItems;
        
      }
  );
    break;
  case 'littleProducts':
    list.sort(
      function(a,b){
        return a.numberItems - b.numberItems;
      }
  );
    break;
  }
  
  
}

/////////////Obtiene los productos, se ejecuta dependiendo de la necesidad

function getProducts(referenceFire){
  referenceFire  // referencia de la colección
  .get() // pide todos los documentos de la colección
  .then((querySnapshot) => {
    const objects = [];
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);
        //console.log(`${doc.id} => ${doc.data()}`);
        orders.addEventListener('change',function(){
          sortProducts(objects);
          renderProducts(objects);
        });
        
    });
    ////////////Llama el método Sort para ejecutar los métodos internos
    

    renderProducts(objects);
    
    
    //loader.classList.remove('loader--show');
  });
}

// render inicial con todos los productos
getProducts(productsRef);


//////////////Botones por categorias--tipo de categoria
const snackBtn = document.querySelector('.snackBtn');
const breakfastBtn  = document.querySelector('.breakfastBtn');
const trayBtn = document.querySelector('.trayBtn');
const basketBtn = document.querySelector('.basketBtn');

const lessMoneyBtn = document.querySelector('.lessMoneyBtn');
const sosoMoneyBtn = document.querySelector('.sosoMoneyBtn');
const moreMoneyBtn = document.querySelector('.moreMoneyBtn');

const lessSizeBtn = document.querySelector('.lessSizeBtn');
const middleSizeBtn = document.querySelector('.middleSizeBtn');
const lotSizeBtn = document.querySelector('.lotSizeBtn');



//selecciona por merienda
snackBtn.addEventListener('click',function(){
  getProducts(productsRef.where("categorie", "==", "Merienda"));
});

breakfastBtn.addEventListener('click',function(){
  getProducts(productsRef.where("categorie", "==", "Desayuno"));
});

trayBtn.addEventListener('click',function(){
  getProducts(productsRef.where("categorie", "==", "Bandeja"));
});

basketBtn.addEventListener('click',function(){
  getProducts(productsRef.where("categorie", "==", "Ancheta"));
});

//selecciona por tamaño
lessSizeBtn.addEventListener('click',function(){
  getProducts(productsRef.where("size", "==", "little"));
});

middleSizeBtn.addEventListener('click',function(){
  getProducts(productsRef.where("size", "==", "middle"));
});

lotSizeBtn.addEventListener('click',function(){
  getProducts(productsRef.where("size", "==", "big"));
});

//selecciona por precio

lessMoneyBtn.addEventListener('click',function(){
  getProducts(productsRef.where("price", ">=", "20.000").where("price","<=","40.000"));
});

sosoMoneyBtn.addEventListener('click',function(){
  getProducts(productsRef.where("price", ">=", "40.000").where("price","<=","60.000"));
});

moreMoneyBtn.addEventListener('click',function(){
  getProducts(productsRef.where("price", ">=", "60.000").where("price","<=","80.000"));
});






////////Código no utilizado pero con funcionalidad a futuro

 /*
 switch(orders.options[orders.selectedIndex].value){
    case 'morePrice':
       product.orderBy('price','desc');
      break;
    case 'lessPrice':
      product.orderBy('price');
      break;
    case 'moreSize':
      product.orderBy('size','desc');
      break;
    case 'lessSize':
      product.orderBy('size');
      break;
    case 'lotProducts':
      product.orderBy('numberItems','desc');
      break;
    case 'littleProducts':
      product.orderBy('numberItems');

      break;
 

  }*/