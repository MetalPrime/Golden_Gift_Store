

  const db = firebase.firestore();
  const productsRef = db.collection('products');
  const storageRef = firebase.storage().ref();

  
  const productsList = document.querySelector('.productslist');
// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('a');
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
    <img class="product__img" src="" alt="imgProduct">
    <div class="product__info">
      <p class="product__price"> ${elem.categorie}</p>
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
      <button class="product__delete">Eliminar</button>
      <button class="product__edit">Editar</button>
    </div>
    `;

    // seleccionamos el botón "Eliminar" que se acaba de crear en este elemento
    const deleteBtn = newProduct.querySelector('.product__delete');
    deleteBtn.addEventListener('click',function(){
      loader.classList.add('loader--show');
      productsRef // referencia de la colección
      .doc(elem.id) // referencia de un documento específico en esa colección
      .delete() // elimine el documento asociado a esa referencia
      .then(function() {
        // debería entrar si todo sale bien
        console.log("Document successfully deleted!");
        getProducts(); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
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

    productsList.appendChild(newProduct);
  });
}

const sortNode = document.querySelector('.sort');
const orders = sortNode.querySelector('select');
console.log(orders);
console.log(orders.options[orders.selectedIndex].value);

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

function getProducts(){
  productsRef  // referencia de la colección
  .get() // pide todos los documentos de la colección
  .then((querySnapshot) => {
    const objects = [];
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);
        console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objects);


    orders.addEventListener('change',function(){
      sortProducts(objects);
      renderProducts(objects);
    })

    
    //loader.classList.remove('loader--show');
  });
}

// render inicial con todos los productos
getProducts();
