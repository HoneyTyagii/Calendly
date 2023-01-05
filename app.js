const express = require('express');
const cors = require('cors');
// const app = express();
const connectDB = require('./config/db');
require("dotenv").config();

const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const eventRoutes = require('./routes/eventRoutes');

const PORT = process.env.PORT;
// connectDB();
// app.set(cors());

const app = express();
connectDB(); //Database Connection

//Middleware
app.use(express.json());
app.use(cors());

//Routes
//app.use("/api", require(".routes/api"))
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/schedule', scheduleRoutes);
app.use('/api/v1/event', eventRoutes);

app.listen(PORT,() => {
    console.log('server is running on port ${PORT}');
});