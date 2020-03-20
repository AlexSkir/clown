import $ from 'jquery';
import store from 'store/store';
import { makeRandomId } from 'components/functions/random';

export function pageNavigator(e, from, to, isAuthed, projectId) {
  if (from.indexOf('create') !== -1) {
    if (to.indexOf('user') !== -1) {
      // navigate from createPage to userPage if authed
      if (isAuthed) {
        if (window.confirm('Are you sure you want to leave?')) {
          store.dispatch({ type: 'page', value: to });
          $(document.body).css({ cursor: 'default' });
          return;
        }
        e.preventDefault();
        return;
      }
      // navigate from createPage to userPage, if not authed redirect to erorPage
      store.dispatch({ type: 'page', value: 'about' });
      store.dispatch({ type: 'userData', value: '' });
      store.dispatch({ type: 'error', value: true });
      return;
    }
    // navigate from createPage to createPage - create new project
    if (to === 'create') {
      if (window.confirm('Are you sure you want to leave?')) {
        const projectID = makeRandomId();
        const page = `create-animation/${projectID}`;
        store.dispatch({ type: 'page', value: page });
        store.dispatch({ type: 'projectID', value: projectID });
        $(document.body).css({ cursor: 'default' });
        return;
      }
      e.preventDefault();
      return;
    }
    // navigate from createPage to general pages
    if (window.confirm('Are you sure you want to leave?')) {
      store.dispatch({ type: 'page', value: to });
      $(document.body).css({ cursor: 'default' });
      return;
    }
    e.preventDefault();
    return;
  }
  // navigate from general pages to createPage
  if (to === 'create') {
    if (projectId) {
      store.dispatch({ type: 'page', value: `create-animation/${projectId}` });
      store.dispatch({ type: 'projectID', value: projectId });
      $(document.body).css({ cursor: 'default' });
      return;
    }
    const projectID = makeRandomId();
    const page = `create-animation/${projectID}`;
    store.dispatch({ type: 'page', value: page });
    store.dispatch({ type: 'projectID', value: projectID });
    $(document.body).css({ cursor: 'default' });
    return;
  }
  // navigate from other pages to general pages
  store.dispatch({ type: 'page', value: to });
  $(document.body).css({ cursor: 'default' });
}

export function toCreatePage() { }
