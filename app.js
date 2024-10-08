const database = require('./db');
const User = require('./user');
const cors = require('cors');

(async () => {
  await database.sync();
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

async function getUserById(id) {
  try {
    console.log("--------------- Get user: ", id, "--------------------")
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(userByAPI) {
  try {
    const name = userByAPI["name"];
    const type = userByAPI["type"];
    console.log("CREATE USER:", userByAPI);
    const user = await User.create({
      name: name,
      type: type
    })
    return user;
  } catch (error) {
    console.error('Error create user:', error);
    throw error;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
}

app.route('/users', cors(corsOptions))
  .get(async (req, res) => {
    try {
      const users = await getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  })
  .post(async (req, res) => {
    try {
      const user = await createUser(req.body);
      res.send(user)
    } catch (error) {
      res.status(500).send('Error create user');
    }
  });

app.get("/users/:id", cors(corsOptions), async (req, res) => {
  try {
    const user = await getUserById(req.params["id"]);
    res.send(user);
  } catch (error) {
    res.status(500).send('Error find user.')
  }
})

app.put("/users/:id", cors(corsOptions), async (req, res) => {
  try {
    const user = await getUserById(req.params["id"]);
    const userUpdate = await user.update(req.body);
    console.log('PUT user id: ', req.params["id"])
    res.send(userUpdate);
  } catch (error) {
    res.status(500).send('Error find user.')
  }
})

app.delete("/users/:id", cors(corsOptions) ,async (req, res) => {
  try {
    const user = await getUserById(req.params["id"]);
    const userDeleted = await user.destroy();
    console.log('Destroy user', user);
    user.message = "Usuário deletado";
    res.send(user);
  } catch (error) {
    res.status(500).send('Error destroy user.')
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
