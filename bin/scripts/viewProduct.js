window.addEventListener('load', function () {

  // partimos el location con el separador -
  const parts = location.search.split('-');
  // usamos la primer parte y la limpiamos
  const uid = parts[0].replace('?', '');

  // referencia a la base de datos
  const db = firebase.firestore();
  // referencia a la coleción productos
  const productsRef = db.collection('products');

 //referencia al storage
  const storageRef = firebase.storage().ref();

  //referencia al producto con el uid específico
  productsRef.doc(uid)
  .get() // traer info de ese producto
  .then(function (snapshot) {

    const product = snapshot.data();

    document.querySelector('.itemProduct__category').innerHTML = `<strong>Categoria/</strong> ${product.categorie}`;
    document.querySelector('.itemProduct__title').innerHTML = product.title;
    document.querySelector('.itemProduct__description').innerHTML = product.description;
    storageRef.child(product.img).getDownloadURL().then(function(url) {
        // Or inserted into an <img> element:
        
        document.querySelector('.itemProduct__img').style.backgroundImage = `url(${url})`;
        
      }).catch(function(error) {
        // Handle any errors
      });
    
    document.querySelector('.itemProduct__price').innerText = `$ ${product.price}`;

    //document.querySelector('.details').classList.remove('hidden');
  })

});