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

  //referencia a la zona de pedidos del usuario
  const wishsRef = db.collection('wish');

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

    //se añade un producto a la colección pedido, si el usuario está registrado
    document.querySelector('.itemProduct__addBtn').addEventListener('click',function(event){
      event.preventDefault();
      firebase.auth().onAuthStateChanged(function(user) {
        if(user){
          productsRef.doc(uid).get().then(function(snapshot){

            const newWishRef =  wishsRef.doc();

            const newItemWish = {
              title: snapshot.data().title,
              img: snapshot.data().img,
              price:  snapshot.data().price,
              description :  snapshot.data().description,
              categorie :  snapshot.data().categorie,
              size :  snapshot.data().size,
              numberItems :  snapshot.data().numberItems,
              status:  snapshot.data().status,
              focus :  snapshot.data().focus,
              idUser : user.uid,
            }

            newWishRef.set(newItemWish).then(function(){
              window.location.href = 'checkout.html';
            });
          });


        } else{
          document.querySelector('.form__hidden').classList.remove('hidden');
        }
      });
    });



    //document.querySelector('.details').classList.remove('hidden');
  });

});