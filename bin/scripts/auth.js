const auth = document.querySelector('.auth');
const authWith = auth.querySelector('.auth__with');
const authWithout = auth.querySelector('.auth__without');
const authProfile = auth.querySelector('.auth__profile');
const authProfileSpan = auth.querySelector('.auth__profile span');
const authSignout = auth.querySelector('.auth__signout');
const authAddProduct = document.querySelector('.auth__addProduct');

var userInfo;

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
    authWith.classList.remove('hidden');
    authWithout.classList.add('hidden');

    const db = firebase.firestore();
    const usersRef = db.collection('users');
    usersRef.doc(user.uid).get().then(function (doc) {
      if(doc.exists) {
        const data = doc.data();
        userInfo = data;
        authProfileSpan.innerText = data.firstname;

        const url = `profile.html?${data.id}`;
        authProfile.setAttribute('href',url);

        if(data.admin) {
          const showAdmin = document.querySelectorAll('.showadmin');
          showAdmin.forEach(function(elem) {
            elem.classList.remove('hidden');
          });
        }
      }
    });
  } else {
    // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
    authWith.classList.add('hidden');
    authWithout.classList.remove('hidden');
  }
});

// cerrar sesión
authSignout.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signOut();
});