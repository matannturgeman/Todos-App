require('dotenv').config();
const { PORT = 8080, ENV = 'prod' } = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const todoRoutes = require('./routes/todo.routes');
const userAuthMiddleware = require('./middlewares/userAuth.middleware');
const { connectMongoUrl } = require(`./database/${ENV}`)
const mongooseService = require(`./database/mongoose`)

mongooseService.connect(connectMongoUrl)

//----------------------------------Middlewares Router-------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// authentication routes
app.use('/api/auth', authRoutes);

// user routes
app.use('/api/user', userRoutes);

// Auth middleware
app.use(userAuthMiddleware);

// todo routes
app.use('/api/todo', todoRoutes);


//----------------------------------Run Server---------------------------------------------

app.listen(PORT, () => {
    console.log("server is running! =>", { PORT });
});

