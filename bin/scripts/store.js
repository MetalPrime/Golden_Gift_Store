const products = [
    {
      title: 'Celular Motorola Moto One Macro',
      category : 'Nicotina',
      img: 'https://http2.mlstatic.com/D_NQ_NP_671655-MCO43438392203_092020-V.webp',
      price: 499900,
    },
    {
      title: 'Celular Motorola One Action Color Blanco',
      category : 'Nicotina',
      img: 'https://http2.mlstatic.com/D_NQ_NP_760318-MCO42908273986_072020-V.webp',
      price: 679900,
    },
    {
      title: 'Celular Motorola Moto G8 Plus 64gb',
      category : 'Nicotina',
      img: 'https://http2.mlstatic.com/D_NQ_NP_846737-MCO43497294331_092020-V.webp',
      price: 649900,
    },
    {
      title: 'Motorola Moto G8 Power 4g',
      category : 'Nicotina',
      img: 'https://http2.mlstatic.com/D_NQ_NP_725226-MCO42143648422_062020-V.webp',
      price: 699900,
    },
  ];

  const db = firebase.firestore();
  const productsRef = db.collection('products');
  
  const productsList = document.querySelector('.productslist');
// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('article');
    newProduct.classList.add('product');

    newProduct.innerHTML = `
    <img class="product__img" src="${elem.img}" alt="">
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
    //loader.classList.remove('loader--show');
  });
}

// render inicial con todos los productos
getProducts();
