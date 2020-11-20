const db = firebase.firestore();
const productsRef = db.collection('products');

//referencia al storage
const storageRef = firebase.storage().ref();
let imgPath;
let imgPath2;
let imgPath3;


//Aqui es donde agregamos un producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();


  const newProduct = {
    title: form.title.value,
    img: imgPath,
    img2: imgPath2,
    img3: imgPath3,
    price: form.price.value,
    description: form.description.value,
    categorie: form.categories.value,
    size: form.size.value,
    numberItems: form.numberItems.value,
    status: form.status.value,
    focus: form.focus.value,
    id: productsRef.doc().id,
  };

  //loader.classList.add('loader--show');

  function handleThen(docRef) {
    // console.log("Document written with ID: ", docRef.id);
    //getProducts();
    form.title.value = '';
    form.image.value = '';
    form.price.value = '';
    form.description.value = '';

    selectedItem = null;
    window.location.href = 'store.html';
  }

  function handleCatch(error) {
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

const cancelProduct = document.querySelector('.auth__cancelProduct');
cancelProduct.addEventListener('click', function () {
  window.location.href = 'store.html';
})



form.image.addEventListener('change', function () {
  // Create a reference to 'mountains.jpg'
  var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 123152194192)}.jpg`);

  var file = form.image.files[0]; // use the Blob or File API
  newImageRef.put(file).then(function (snapshot) {
    console.log(snapshot)
    console.log('Uploaded a blob or file!');
    imgPath = snapshot.metadata.fullPath;
    console.log(imgPath);

    storageRef.child(imgPath).getDownloadURL().then(function (url) {
      document.querySelector(".imgBase").setAttribute('src', url); //style.backgroundImage = `url(${url})`;
      console.log("funciono")
    }).catch(function () {

    });

  });


});

form.image2.addEventListener('change', function () {
  // Create a reference to 'mountains.jpg'
  var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 123152194192)}.jpg`);

  var file = form.image2.files[0]; // use the Blob or File API
  newImageRef.put(file).then(function (snapshot) {
    console.log(snapshot)
    console.log('Uploaded a blob or file!');
    imgPath2 = snapshot.metadata.fullPath;
    console.log(imgPath2);

    storageRef.child(imgPath2).getDownloadURL().then(function (url) {
      document.querySelector(".imgBase2").setAttribute('src', url); //style.backgroundImage = `url(${url})`;
      console.log("funciono");
    }).catch(function () {

    });

  });


});

form.image3.addEventListener('change', function () {
  // Create a reference to 'mountains.jpg'
  var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 123152194192)}.jpg`);

  var file = form.image3.files[0]; // use the Blob or File API
  newImageRef.put(file).then(function (snapshot) {
    console.log(snapshot)
    console.log('Uploaded a blob or file!');
    imgPath3 = snapshot.metadata.fullPath;
    console.log(imgPath3)

    storageRef.child(imgPath3).getDownloadURL().then(function (url) {
      document.querySelector(".imgBase3").setAttribute('src', url); //style.backgroundImage = `url(${url})`;
      console.log("funciono");
    }).catch(function () {

    });

  });


});

