const bcrypt = require('bcrypt');

function randomString() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return new Array(6).fill().reduce(agg => agg + alphabet[Math.floor(Math.random() * alphabet.length)], '');
}
const users = {
  jjj: {
    name: 'Joel Shinness',
    email: 'joel@joel.joel',
    password: bcrypt.hashSync('joel', 10),
    id: 'jjj',
  },
  ddd: {
    name: 'Don Burks',
    email: 'don@don.don',
    password: bcrypt.hashSync('don', 10),
    id: 'ddd',
  },
};

function authenticate(email, password) {
  for (const userId in users) {
    if (users[userId].email === email && bcrypt.compareSync(password, users[userId].password)) {
      return users[userId];
    }
  }
  return undefined;
}

function find(id) {
  return users[id];
}

function create(name, email, pwd) {
  const id = randomString();
  const newUser = {
    id, name, email, password: bcrypt.hashSync(pwd, 10),
  };
  users[id] = newUser;
  console.log('Users', users);
  return newUser;
}
module.exports = {
  authenticate,
  find,
  create,
};
