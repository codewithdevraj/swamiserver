const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectAuthDb = require("./connections/authdb");
const connectprofileDb = require("./connections/userprofile");

const PORT = process.env.PORT || 3001;

const authRouter = require("./routes/auth")
dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  // credentials: true,
  method: "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH, CONNECT, TRACE, PURGE",
  allowedHeadaers:
    "Content-Type, Accept, Origin, X-Requested-with, Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( "/auth", authRouter );

app.get( "/",
  ( req, res ) => {
    res.json({ message: "Hello from server!" });
  }
)

connectAuthDb()
  .then( () => {
    app.listen( PORT, () => {
      console.log( `Server is running on port ${PORT}` );
    } )
  } )
  .catch( ( err ) => {
    console.error( err );
  } );
