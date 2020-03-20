import { saveAsGif } from 'components/functions/menuFunctions/fromCanvasToFile';
import { Uploader } from 'services/google-uploader/googleUploader';
import store from 'store/store';

const apikey = 'AIzaSyD8p3NmO-jrbUeGpC9EYDHzH8FWOl3ivss';

export function loadClient() {
  window.gapi.client.setApiKey(apikey);
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

export function uploadToGoogle(filename, fps, frames) {
  loadClient();
  const content = new Blob([saveAsGif('upload', fps, filename, frames)], { type: 'image/gif' });
  const uploader = new Uploader({
    file: content,
    metadata: {
      name: filename
    },
    onComplete(data) {
      const info = JSON.parse(data);
      const fileId = info.id;
      const googleUrl = `https://drive.google.com/open?id=${fileId}`;
      const urlToGif = `https://drive.google.com/thumbnail?id=${fileId}`;
      store.dispatch({ type: 'googleLinks', value: [googleUrl, urlToGif] });
      window.gapi.client.drive.permissions
        .create({
          fileId: `${fileId}`,
          resource: {
            role: 'reader',
            type: 'anyone'
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
    },
    onError(data) {
      console.log(data);
    }
  });
  uploader.upload();
}
