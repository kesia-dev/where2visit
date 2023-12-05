const usersDbQueries = require('../queries/user_query');

// Rooms Model
const rooms = [
  {
    id: 1,
    roomId: 'XBSHMD78',
    roomName: 'Room 1',
    createdBy: 'user1',
    createdAt: new Date(),
    participants: ['user1'],
  },
  {
    id: 2,
    roomId: 'XBSHBD78',
    roomName: 'Room 2',
    createdBy: 'user2',
    createdAt: new Date(),
    participants: ['user2', 'user3'],
  },
  {
    id: 3,
    roomId: 'XBSHBD79',
    roomName: 'Room 3',
    createdBy: 'user3',
    createdAt: new Date(),
    participants: ['user3'],
  },
  {
    id: 4,
    roomId: 'XBSHBD78',
    roomName: 'Decision Room 2',
    createdBy: 'user2',
    createdAt: new Date(),
    participants: ['user2', 'user3'],
  },
];

// query to create room
const setRoomsDbQueries = (params) => {
  return new Promise((resolve, reject) => {

    // generate room id
    const getRoomId = generateRoomId();
    params.roomId = getRoomId;

    // mock data
    const createNewRoom = params;

    rooms.push(createNewRoom);

    if (rooms.includes(createNewRoom)) {
      // return room id
      resolve(getRoomId);
    } else {
      reject(new Error('Room failed to create'));
    }
  });
};

// query to join room
const joinRoomsDbQueries = (params) => {
  return new Promise((resolve, reject) => {
    const getRoomId = params.roomId;
    const getUserId = params.userId;

    // find room
    const getRoom = rooms.find(room => room.roomId === getRoomId);

    console.log('found room', getRoom);

    // find user
    const getUser = usersDbQueries.getUserByIdQueries(getUserId);

    console.log('found user', getUser);

    if (getRoom && getUser) {
      // check if user is in room
      if (!getRoom.participants.includes(getUser.userId)) {
        getRoom.participants.push(getUser.userId);
        resolve(`User ${getUser.username} has joined room ${getRoom.roomName}`);
      } else {
        resolve(`User ${getUser.username} already in room`);
      }
    } else {
      reject(new Error('Adding user to room failed'));
    };
  });
};

// generate room id
const generateRoomId = () => {
  let genRandomInti = '';
  let randomArray = [];
  let genRandomChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const maxLength = 5;

  for (let i = 0; i < maxLength; i++) {
    let genChar = Math.floor(Math.random() * genRandomChar.length);

    genRandomInti = genRandomInti + genRandomChar.charAt(genChar);

    randomArray.push(genRandomInti);
  }

  return genRandomInti;
};



module.exports = { setRoomsDbQueries, joinRoomsDbQueries };