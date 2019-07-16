/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

function getDate() {
  const data = new Date();
  let day = data.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = data.getMonth();
  if (month < 10) {
    month = `0${month}`;
  }
  let hour = data.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}  ${day}/${month}/${data.getFullYear()}`;
}

function saveLocally(global, storage, projectID, dataUrl, array, newValue, date) {
  const piskel = projectID !== undefined ? projectID : localStorage.getItem('project');
  const globalObj = global;
  const idArr = [];
  if (storage) {
    if (Object.keys(storage).length > 0) {
      for (const project in storage) {
        globalObj[project] = {
          gif: storage[project].gif,
          frames: storage[project].frames,
          title: storage[project].title,
          time: storage[project].time
        };
      }
    }
  }
  if (Object.keys(globalObj).length === 0) {
    globalObj[piskel] = {
      gif: dataUrl,
      frames: array,
      title: newValue,
      time: date
    };
  } else {
    for (const project in globalObj) {
      if (project === piskel) {
        globalObj[project].gif = dataUrl;
        globalObj[project].frames = array;
        globalObj[project].title = newValue;
        globalObj[project].time = date;
      }
      idArr.push(project);
    }
    if (idArr.every(e => e !== piskel)) {
      globalObj[piskel] = {
        gif: dataUrl,
        frames: array,
        title: newValue,
        time: date
      };
    }
  }
  return globalObj;
}

function saveToGalery(global, storage, projectID, dataUrl, arrayFramesSrc, newValue, date, userID) {
  let globalObj = global;
  const user = localStorage.getItem('userID');
  // if storage with users and projects then put it in global object
  if (storage) {
    const storageEntries = Object.entries(storage);
    globalObj = {};
    for (let i = 0; i < storageEntries.length; i += 1) {
      globalObj[storageEntries[i][0]] = {};
      globalObj[storageEntries[i][0]] = storageEntries[i][1];
    }
    if (storageEntries.every(storedUser => storedUser[0] !== userID)) {
      globalObj[userID] = {};
    }
  } else {
    globalObj[userID] = {};
  }
  // if object with user's projects updates then rewrite this user in global object
  if (localStorage.getItem(`${user}`)) {
    globalObj[userID] = {};
    globalObj[userID] = JSON.parse(localStorage.getItem(`${user}`));
  }

  let storedObj; // object for user ID projects
  // const newstorage = JSON.parse(localStorage.getItem('authLocalProjects'));
  if (globalObj) {
    const entries = Object.entries(globalObj);
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i][0] === userID) {
        storedObj = entries[i][1];
      }
    }
  }
  // check and rewrite user's projects
  const authProjects = saveLocally(
    globalObj[`${userID}`],
    storedObj,
    projectID,
    dataUrl,
    arrayFramesSrc,
    newValue,
    date
  );
  const objToSave = JSON.stringify(authProjects);
  localStorage.setItem(`${userID}`, objToSave); // save local object with user's projects
  globalObj[`${userID}`] = authProjects; // rewrite user's projects in global object with users
  return globalObj;
}

export { getDate, saveLocally, saveToGalery };
