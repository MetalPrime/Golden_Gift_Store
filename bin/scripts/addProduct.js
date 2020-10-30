const db = firebase.firestore();
const productsRef = db.collection('products');



//Aqui es donde agregamos un producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
 
  //var storageRef = firebase.storage().ref();

  // Create a reference to 'mountains.jpg'
  /*var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*123152194192)}.jpg`);

  var file = form.imageFile.files[0]; // use the Blob or File API
  newImageRef.put(file).then(function(snapshot) {
    console.log(snapshot)
    console.log('Uploaded a blob or file!');
  });*/

  const newProduct = {
    title: form.title.value,
    img: form.image.value,
    price: form.price.value,
    description : form.description.value,
    categorie : form.categories.value,
    size : form.size.value,
    numberItems : form.numberItems.value,
    status: form.status.value,
    focus : form.focus.value,

  };

  //loader.classList.add('loader--show');

  function handleThen (docRef) {
    // console.log("Document written with ID: ", docRef.id);
    //getProducts();
    form.title.value = '';
    form.image.value = '';
    form.price.value = '';
    selectedItem = null;
  }

  function handleCatch (error) {
    console.error("Error adding document: ", error);
  }

  productsRef // referencia de la colección
  .add(newProduct) // cree un nuevo elemento en la colección
  .then(handleThen)
  .catch(handleCatch);

  /*if(selectedItem) {
    // si existe selectedItem quiere decir que va a editar
    productsRef
    .doc(selectedItem.id) // seleccione el documento con ese id
    .set(newProduct) // sobreescriba la información existente
    .then(handleThen)
    .catch(handleCatch);

  } else {
    // si no existe es porque es un nuevo producto
    productsRef // referencia de la colección
    .add(newProduct) // cree un nuevo elemento en la colección
    .then(handleThen)
    .catch(handleCatch);
  }*/
});


