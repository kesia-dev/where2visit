require("dotenv").config();
const db = require('../connection');
const usersDbQueries = require('../queries/user_query');

// query to create room
const setRoomsDbQueries = (params) => {
  const getRoomName = params.roomName;
  const getCreatedBy = params.createdBy;
  const getCreatedAt = new Date();
  const getRoomId = generateRoomId();

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

      console.log("now in setRoomsDbQueries...");

      // insert into user-room relationship table
      const addToRelTable = addUserToRelTable(idGen, createdByGen)
      .then(() => {
        return {
          roomId: roomIdGen,
          roomName: roomNameGen,
          createdBy: createdByGen
        }
      })
      .catch ( error => {
        throw error;
      });

      return addToRelTable;
    })
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

  // get room from db
  const checkRoomAvail = await selectRoomByIdQuery(getRoomId);

  // get user from db
  const getUser = await usersDbQueries.getUserByIdQueries(getUserId)
  .then((data) => {
    return data.rows;
  })
  .catch(error => {
    return 'An error occured while getting user';
  });

  if ((checkRoomAvail.length > 0 && checkRoomAvail[0].roomid === getRoomId) && (getUser.length > 0 && getUser[0].id === getUserId)) {

    // check if user is in room
    const checkRelationship = checkRelationTable(getUserId, checkRoomAvail[0].id)
      .then(isInRoom => {
        if (isInRoom) {
          return `User ${getUser[0].username} already in room`;
        } else {
          const addUserToRoom = addUserToRelTable(getUserId, getRoomId)
            .then(() => {
              return `User ${getUser[0].username} has joined room ${checkRoomAvail[0].roomname}`;
            })
            .catch(error => {
              return 'An error occured while checking relationship';
            });

            return addUserToRoom;
        }
      })
      .catch(error => {
        return 'An error occured while creating relationship';
      });

    return checkRelationship;
  } else {
    return 'User or room does not exist';
  }
};

// query to select relationship table
const checkRelationTable = async (getUserId, getRoomId) => {
  try {
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
const addUserToRelTable = async (getRoomId, getUserId) => {
  try {
    const postRelationQuery = {
      text: 'INSERT INTO userroomrelationship (roomId, userId) VALUES ($1, $2)',
      values: [getRoomId, getUserId],
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