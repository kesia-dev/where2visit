require("dotenv").config();
const db = require('../connection');
const usersDbQueries = require('../queries/user_query');

// query to create room
const setRoomsDbQueries = async (params) => {
  const getRoomName = params.roomName;
  const getCreatedBy = params.createdBy;
  const getCreatedAt = new Date();
  const getRoomId = generateRoomId();

  // check if user id is null or empty
  if (getCreatedBy === null || getCreatedBy === undefined || getCreatedBy === '') {
    return 'Login or create an account'
  }

  // check if user on table
  const getUser = await usersDbQueries.getUserByIdQueries(getCreatedBy)
    .then((data) => {
      return data.rows;
    })
    .catch(error => {
      return 'An error occured while getting user';
    });

  if (getUser.length > 0 && getUser[0].id === getCreatedBy) {
    // insert to rooms table
    const postQuery = {
      text: 'INSERT INTO rooms (roomId, roomName, createdBy, dateCreated) VALUES ($1, $2, $3, $4) RETURNING id, roomId, roomName, createdBy',
      values: [getRoomId, getRoomName, getCreatedBy, getCreatedAt],
    };

    return db.query(postQuery)
      .then((data) => {
        const idGen = data.rows[0].id;
        const roomIdGen = data.rows[0].roomid;
        const roomNameGen = data.rows[0].roomname;
        const createdByGen = data.rows[0].createdby;
        const isCreator = 1;

        // insert into user-room relationship table
        const addToRelTable = addUserToRelTable(idGen, createdByGen, getUser[0].username, isCreator)
          .then(() => {
            return {
              roomId: roomIdGen,
              roomName: roomNameGen,
              createdBy: createdByGen
            }
          })
          .catch(error => {
            throw error;
          });

        return addToRelTable;
      });
  } else {
    return 'User does not exist';
  }
};

// query to select room by id
const selectRoomByIdQuery = (id) => {
  const getRoomId = id;

  const getQuery = {
    text: 'SELECT * FROM rooms WHERE roomId = $1',
    values: [getRoomId],
  };

  return db.query(getQuery)
    .then(data => {
      return data.rows;
    });
};

// query to join room
const joinRoomsDbQueries = async (params) => {
  const getRoomId = params.roomId;
  const getUserId = params.userId;
  const getUserName = params.userName;
  let getUser = null;
  const isCreator = 0;

  // get room from db
  const checkRoomAvail = await selectRoomByIdQuery(getRoomId);

  if (checkRoomAvail.length > 0 && checkRoomAvail[0].roomid === getRoomId) {

    // check if user id is passed
    if (getUserId === null || getUserId === undefined || getUserId === '') {
      const addUserToRoom = addUserToRelTable(getUserId, getRoomId, getUserName)
        .then(() => {
          return `User ${getUser[0].username} has joined room ${checkRoomAvail[0].roomname}`;
        })
        .catch(error => {
          return 'An error occured while checking relationship';
        });

      return addUserToRoom;
    } else {

      // get user from db
      getUser = await usersDbQueries.getUserByIdQueries(getUserId)
        .then((data) => {
          return data.rows;
        })
        .catch(error => {
          return 'An error occured while getting user';
        });

      // check if user is in room
      const checkRelationship = checkRelationTable(getUserId, checkRoomAvail[0].id)
        .then(isInRoom => {
          console.log('whats result',isInRoom);
          if (isInRoom) {
            return `User ${getUser[0].username} already in room`;
          } else {
            console.log('whats result in...');
            const addUserToRoom = addUserToRelTable(checkRoomAvail[0].id, null, getUserName, isCreator)
              .then(() => {
                return `User ${getUserName} has joined room ${checkRoomAvail[0].roomname}`;
              })
              .catch(error => {
                console.log('error',error);
                return 'An error occured while checking relationship';
              });

            return addUserToRoom;
          }
        })
        .catch(error => {
          return 'An error occured while creating relationship';
        });

      return checkRelationship;
    }

  } else {
    return 'Room does not exist';
  }
};

// query to select relationship table
const checkRelationTable = async (getUserId, getRoomId) => {
  try {
    console.log('I got to check...');
    const selectQuery = {
      text: 'SELECT COUNT(*) AS relcount FROM  userroomrelationship WHERE userId = $1 AND roomId = $2',
      values: [getUserId, getRoomId],
    };

    const getResult = await db.query(selectQuery);
    const getCount = parseInt(getResult.rows[0].relcount);

    if (getCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

// query userId and roomId to relationship table 
const addUserToRelTable = async (getRoomId, getUserId, getUserName, isCreator) => {
  try {
    console.log('I got to user rel...');
    const postRelationQuery = {
      text: 'INSERT INTO userroomrelationship (roomId, userId, userName, isCreator) VALUES ($1, $2, $3, $4)',
      values: [getRoomId, getUserId, getUserName, isCreator],
    };

    return await db.query(postRelationQuery);

  } catch (error) {
    throw error;
  }
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