const loginButton = document.getElementById('loginButton');
const userNameElement = document.getElementById('userName');
const userPhotoElement = document.getElementById('userPhoto');

let isLogin = false;

const firebaseConfig = {
  apiKey: "AIzaSyDFmqrZ6P3XN9ZEKiymDZRmDyDhhLcg3es",
  authDomain: "simple-piskel-clone-b200f.firebaseapp.com",
  databaseURL: "https://simple-piskel-clone-b200f.firebaseio.com",
  projectId: "simple-piskel-clone-b200f",
  storageBucket: "simple-piskel-clone-b200f.appspot.com",
  messagingSenderId: "947810778360",
  appId: "1:947810778360:web:c8afe5b328f9d397810f0d",
  measurementId: "G-6Y9VGVRFPC"
};

firebase.initializeApp(firebaseConfig);


function loginSuccess(result) {
  const userName = result.user.displayName;
  const userPhoto = result.user.photoURL;
  isLogin = true;

  userPhotoElement.className = 'login-container__user-photo';
  userNameElement.className = 'login-container__user-name';

  userPhotoElement.style.backgroundImage = `url(${userPhoto})`;
  userNameElement.innerHTML = userName;

  loginButton.innerHTML = 'Sign out';
}


function loginError(error) {
  console.log(error)
}


function logOut() {
  firebase.auth().signOut();
  isLogin = false;
  loginButton.innerHTML = 'Sign in';

  userPhotoElement.className = 'login-container__user-photo hide';
  userNameElement.className = 'login-container__user-name hide';
}


loginButton.addEventListener('click', () => {
  if (!isLogin) {
    let provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function(result) {
      loginSuccess(result);
    }).catch(function(err) {
      loginError(err);
    })
  } logOut();
});
