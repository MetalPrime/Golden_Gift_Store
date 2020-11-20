window.addEventListener('load', function () {
    
    //obtenemos la localización y la limpiamos
    const uid = location.search.replace('?','');

      // referencia a la base de datos
    const db = firebase.firestore();

    // referencia a la coleción productos
    const productsRef = db.collection('products');

    //referencia al storage
    const storageRef = firebase.storage().ref();

    //referencia al form
    const form = document.querySelector('.form');


    productsRef.doc(uid)
    .get()
    .then(function (snapshot){

        const product = snapshot.data();


        form.title.value = product.title;
        form.image.value = "";
        form.price.value = product.price;
        form.description.value = product.description;
        form.categories.value = product.categorie;
        form.size.value = product.size;
        form.numberItems.value = product.numberItems;
        form.status.value = product.status;
        form.focus.value = product.focus;
    });

    const updateProduct = document.querySelector('.auth__addProduct');
    updateProduct.addEventListener('click',function (event) {
        event.preventDefault();
        productsRef.doc(uid).update({
            title: form.title.value,
            price: form.price.value,
            description : form.description.value,
            categorie : form.categories.value,
            size : form.size.value,
            numberItems : form.numberItems.value,
            status: form.status.value,
            focus : form.focus.value,
            id : productsRef.doc().id,
        })
        .then(function() {
            console.log("Document successfully updated!");
            window.location.href = 'store.html';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    })
    


    const cancelProduct = document.querySelector('.auth__cancelProduct');
    cancelProduct.addEventListener('click',function (event) {
    event.preventDefault();   
    console.log("dfs"); 
    window.location.href = 'store.html';
    });

    
});

