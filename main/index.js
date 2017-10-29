'use strict';

let socket = null;
let game = null;
const URL = `ws://127.0.0.1:3000/`;

const initGame = (data) => {
  game = new LifeGame(data.user, data.settings);
  game.init();
  game.setState(data.state);
  game.send = (gameData) => {
    socket.send(JSON.stringify({
      type: `ADD_POINT`,
      data: gameData
    }));
  };
};

const updateState = (data) => {
  game.setState(data);
};

const typeToAction = {
  INITIALIZE: initGame,
  UPDATE_STATE: updateState
};

const parseData = (response) => {
  try {
    return JSON.parse(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

const onConnectionOpen = () => {
  console.log(`Connection is open`);
};

const onMessage = (evt) => {
  const data = parseData(evt);
  typeToAction[data.type](data.data);
};

const onConnectionError = () => {
  console.log(`Connection error`);
};

const onConnectionClose = () => {
  console.log(`Connection is close`);
};

App.onToken = (token) => {
  socket = new WebSocket(`${URL}?token=${token}`);
  socket.addEventListener(`open`, onConnectionOpen);
  socket.addEventListener(`message`, onMessage);
  socket.addEventListener(`error`, onConnectionError);
  socket.addEventListener(`close`, onConnectionClose);
};

//
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░░░
// ░░░░░░░░▄▀░░░░░░░░░░░░▄░░░░░░░▀▄░░░░░░░░
// ░░░░░░░░█░░▄░░░░▄░░░░░░░░░░░░░░█░░░░░░░░
// ░░░░░░░░█░░░░░░░░░░░░▄█▄▄░░▄░░░█░▄▄▄░░░░
// ░▄▄▄▄▄░░█░░░░░░▀░░░░▀█░░▀▄░░░░░█▀▀░██░░░
// ░██▄▀██▄█░░░▄░░░░░░░██░░░░▀▀▀▀▀░░░░██░░░
// ░░▀██▄▀██░░░░░░░░▀░██▀░░░░░░░░░░░░░▀██░░
// ░░░░▀████░▀░░░░▄░░░██░░░▄█░░░░▄░▄█░░██░░
// ░░░░░░░▀█░░░░▄░░░░░██░░░░▄░░░▄░░▄░░░██░░
// ░░░░░░░▄█▄░░░░░░░░░░░▀▄░░▀▀▀▀▀▀▀▀░░▄▀░░░
// ░░░░░░█▀▀█████████▀▀▀▀████████████▀░░░░░░
// ░░░░░░████▀░░███▀░░░░░░▀███░░▀██▀░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//
// Nyan cat lies here...
//
