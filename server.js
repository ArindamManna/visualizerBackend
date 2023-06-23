//method that attaches env file to server
require('dotenv').config()
const cors = require('cors')

//requires express package
const express = require('express')
const mongoose = require('mongoose')
// const venueRoutes = require('./routes/venues')
const userRoutes = require('./routes/user')
const graphRoutes = require('./routes/graph')

//added in for mongoose depreciation warning ahead of Mongoose 7 update
mongoose.set('strictQuery', false);

//starts express app 
const app = express()

// cors
const whitelist =
    "http://localhost:3000,http://localhost:3001,https://visualizermanna.netlify.app";
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors());

//checks for data in the request and parses it for the request handler
app.use(express.json())

//middleware that fires function for each request that reaches the server
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//grabs all different routes from the routes folder
app.use('/api/user', userRoutes)
app.use('/api/graph', graphRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    //after connecting to database
    .then(() => {
        //listening port for requests after connection to database
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error, "fdsaf")
    })


