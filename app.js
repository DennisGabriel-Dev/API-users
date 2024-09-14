const database = require('./db');
const User = require('./user');

(async () => {
  await database.sync();
  const usuarios = await User.findAll();
  console.log(usuarios);
})();

const express = require("express");
const app = express();
const port = 8080;

async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

app.route('/users')
  .get(async (req, res) => {
    try {
      const users = await getUsers(); 
      res.send(users); 
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  })
  .post(async (req, res) => {
    console.log(req.params)
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
