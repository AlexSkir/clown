import $ from 'jquery';
import store from 'store/store';
import noImage from 'assets/images/pages/grumpy.jpg';

export function authenticate() {
  return window.gapi.auth2
    .getAuthInstance()
    .signIn({
      scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file'
    })
    .then(
      () => {
        console.log('Sign-in successful');
      },
      err => {
        console.error('Error signing in', err);
      }
    );
}

export function loadClient() {
  window.gapi.client.setApiKey('AIzaSyD8p3NmO-jrbUeGpC9EYDHzH8FWOl3ivss');
  return window.gapi.client
    .load('https://content.googleapis.com/discovery/v1/apis/drive/v3/rest')
    .then(
      () => {
        console.log('GAPI client loaded for API');
      },
      err => {
        console.error('Error loading GAPI client for API', err);
      }
    );
}

// Make sure the client is loaded and sign-in is complete before calling this method.
export function execute() {
  return window.gapi.client.drive.permissions
    .create({
      resource: {
        role: '',
        type: ''
      }
    })
    .then(
      response => {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', response);
      },
      err => {
        console.error('Execute error', err);
      }
    );
}

export function onSuccessHandler(googleUser) {
  const profile = googleUser.getBasicProfile();
  const userData = {
    id: profile.getId(),
    name: profile.getName(),
    image: profile.getImageUrl() || noImage
  };
  $(document.body).css({ cursor: 'default' });
  return userData;
}

export function googleAuth(onSuccess) {
  window.gapi.load('client:auth2', () => {
    window.gapi.auth2
      .init({
        client_id: '842905832916-kcnptlm4pbd6ji1lpqbka2p6jpdr5i0q.apps.googleusercontent.com'
      })
      .then(() => {
        window.gapi.signin2.render('my-signIn', {
          scope: 'https://www.googleapis.com/auth/drive.file',
          width: 'auto',
          height: 37,
          longtitle: true,
          onsuccess: onSuccess,
          onfailure: Error('try again')
        });
      });
  });
}

export function signOut() {
  const auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    store.dispatch({ type: 'userData', value: '' });
    store.dispatch({ type: 'page', value: '' });
  });
}
