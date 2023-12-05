// Users model
const users = [
  {
    userId: 'user1',
    username: 'Test1',
    email: 'test@testkhdhgscexample.com',
    roomsJoined: ['1'],
  },
  {
    userId: 'user2',
    username: 'Test2',
    email: 'test2@testkhdhgscexample.com',
    roomsJoined: ['2'],
  },
  {
    userId: 'user3',
    username: 'Test3',
    email: 'test3@testkhdhgscexample.com',
    roomsJoined: ['2'],
  },
  {
    userId: 'user4',
    username: 'Test4',
    email: 'test4@testkhdhgscexample.com',
    roomsJoined: ['1'],
  },
];

// query to create user
const setUserDbQueries = (params) => {
  return new Promise((resolve, reject) => {

    // mock data
    const createNewUser = params;

    users.push(createNewUser);

    if (users.includes(createNewUser)) {
      resolve(users);
    } else {
      reject(new Error('User failed to create'));
    }
  });
};

// query to get user by id
const getUserByIdQueries = (params) => {
  console.log('got to user', params);

  // find user by id
  const getUser = users.find(user => user.userId = params);

  console.log('user is', getUser);

  return getUser;
};

module.exports = { setUserDbQueries, getUserByIdQueries };