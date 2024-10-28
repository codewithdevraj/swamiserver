const express = require( "express" );
const {
    handleRegistration,
    handlelogin
} = require( "../controllers/auth" );

//verify the sessionId

const validator = require( "../middlewares/authvalidators" );
const { authregistervalidator } = require( "../validators/auth" );

//verify token

const authRouter = express.Router();

authRouter
    .route( "/user/register" )
    .get( ( req, res ) => {
        res.send( "Register page" );
    } )
    .post(
        validator( authregistervalidator ),
        handleRegistration
    );

authRouter
    .route( "/user/login" )
    .get( ( req, res ) => {
        res.send( "Login page" );
    } )
    .post( handlelogin );

//user verification on reload


module.exports = authRouter;