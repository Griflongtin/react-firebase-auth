import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDbBdQhcOSNzZ84WscKHBIvhIfSnQuWmcw",
  authDomain: "test-f28ba.firebaseapp.com",
  databaseURL: "https://test-f28ba.firebaseio.com",
  projectId: "test-f28ba",
  storageBucket: "test-f28ba.appspot.com",
  messagingSenderId: "822934854584"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
