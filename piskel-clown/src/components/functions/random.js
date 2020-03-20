/* eslint-disable no-bitwise */
export function makeRandomNumber(from, to) {
  const number = Math.ceil(to - (to - from) * Math.random());
  return number;
}

export function makeRandomId() {
  const j = [];
  let x;
  for (let i = 0; i < 20; i += 1) {
    x = [[48, 57], [65, 90], [97, 122]][(Math.random() * 3) >> 0];
    j[i] = String.fromCharCode(((Math.random() * (x[1] - x[0] + 1)) >> 0) + x[0]);
  }
  return j.join('');
}

export function getDate() {
  const data = new Date();
  let day = data.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = data.getMonth() + 1;
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
  const time = new Date(`${hour}:${minutes} ${month}/${day}/${data.getFullYear()}`).getTime();
  return `${hour}:${minutes} ${day}/${month}/${data.getFullYear()}  ${time}`;
}
