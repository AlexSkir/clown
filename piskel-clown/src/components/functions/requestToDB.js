import firebase from '../../firebase/firebase';
import store from 'store/store';

export function writeUserData(userId, project, frames, gif, date, time, title, description, fps) {
  firebase
    .database()
    .ref(`users/${userId}/${project}`)
    .set({
      frames,
      gif,
      date,
      time,
      title,
      description,
      fps
    });
}

export function deleteFromDB(DBitem) {
  firebase
    .database()
    .ref(DBitem)
    .set(null);
}

export function getDBdata(DBitem) {
  let projects = {};
  projects[DBitem] = {}
  firebase
    .database()
    .ref(`/users/${DBitem}`)
    .once('value')
    .then(snapshot => {
      projects[DBitem] = snapshot.val();
      store.dispatch({ type: 'allProjects', value: projects });
    });
}
