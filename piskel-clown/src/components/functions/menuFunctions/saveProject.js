/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { writeUserData } from 'components/functions/requestToDB';
import { uploadToUrl } from 'components/functions/menuFunctions/fromCanvasToFile';
import { getDate } from 'components/functions/random';
import store from 'store/store';

export function makeObjectToSave(newTitle, newDescription, fps, frames) {
  const dataUrl = uploadToUrl(fps, frames);
  const date = getDate().split('  ');
  const project = {
    gif: dataUrl,
    frames,
    title: newTitle || 'New Piskel-clone',
    description: newDescription,
    date: date[0],
    time: date[1],
    fps: fps
  };
  store.dispatch({ type: 'project', value: project });
  return project;
}

export function saveLocally(storage, projectID, newTitle, newDescription, fps, frames) {
  const currentProject = makeObjectToSave(newTitle, newDescription, fps, frames);
  // restrict saving piskels locally more than 20
  let totalSaves;
  if (storage) {
    if (Object.keys(storage).length < 20) {
      totalSaves = true;
    } else if (
      Object.entries(storage).some(item => item[0] === projectID)
    ) {
      totalSaves = true;
    } else {
      totalSaves = false;
    }
  } else {
    totalSaves = true;
  }
  // update local projects
  let newStorage = storage;
  if (newStorage) {
    if (Object.keys(newStorage).length === 0) {
      newStorage[projectID] = currentProject;
    } else {
      for (const project in newStorage) {
        if (project === projectID) {
          newStorage[project] = currentProject;
        } else {
          newStorage[projectID] = currentProject;
        }
      }
    }
  } else {
    newStorage = {};
    newStorage[projectID] = currentProject;
  }
  return [totalSaves, newStorage];
}

export function saveToGalery(storage, projectID, newTitle, newDescription, fps, frames, userID, allProjects) {
  const saves = saveLocally(storage, projectID, newTitle, newDescription, fps, frames)
  let updatedAllProjects = allProjects;
  if (updatedAllProjects) {
    if (Object.keys(updatedAllProjects).length === 0) {
      updatedAllProjects[userID] = saves[1];
    } else {
      for (const user in updatedAllProjects) {
        if (user === userID) {
          updatedAllProjects[user] = saves[1];
        } else {
          updatedAllProjects[userID] = saves[1];
        }
      }
    }
  } else {
    updatedAllProjects = {};
    updatedAllProjects[userID] = saves[1];
  }
  // send user projects to firebase Realtime Database
  const objForDB = Object.entries(updatedAllProjects[userID]);
  for (let i = 0; i < objForDB.length; i += 1) {
    const projectName = objForDB[i][0];
    const projectItems = objForDB[i][1];
    if (projectName === projectID) {
      writeUserData(
        userID,
        projectName,
        projectItems.frames,
        projectItems.gif,
        projectItems.date,
        projectItems.time,
        projectItems.title,
        projectItems.description,
        projectItems.fps
      );
    }
  }
  return [saves[0], updatedAllProjects];
}
