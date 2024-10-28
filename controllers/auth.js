const bcrypt = require( 'bcrypt' );
const auths = require( '../models/auth' );

//generate session id and token and verification


const handleRegistration = async ( req, res ) => {
    try {
        const { username, email, password } = req.body;
        const userexist = await auths.findOne( { email } );
        if ( userexist ) {
            return res.status( 400 ).json( { message: 'User already exists' } );
        }
        const salt = await bcrypt.genSalt( 10 );
        const hashedPassword = await bcrypt.hash( password, salt );
        const newAuth = await auths.create(
            {
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashedPassword
            }
        );
        //token and session id generation
        //map the session in database

        res.status( 201 ).json( { message: "user created successfully", user: newAuth.userId } );

    } catch ( err ) {
        console.error( err );
        res.status( 500 ).json( { message: 'Internal Server Error', msg:err.message } );
    }
}

const handlelogin = async ( req, res ) => {
    try {
        const { username, password } = req.body;
        const authExist = await auths.findOne( {
            $or: [{ email: username }, { username: username }],
        } );
        if ( !authExist ) {
            return res.status( 400 ).json( { message: 'user do not exist' } );
        }
        const isValidPassword = await bcrypt.compare( password, authExist.password );
        if ( !isValidPassword ) {
            return res.status( 400 ).json( { message: 'Invalid password' } );
        }
        


        //token generation
        //sessionid generation
        //mappingof session id
        //cookies store fo token and session id

        res.status( 200 )
            .json( { message: 'user logged in successfully', user: authExist.userId } );
    } catch ( err ) {
        console.error( err );
        res.status( 500 ).json( { message: 'Internal Server Error', msg: err.message } );
    }
};

module.exports = {
    handleRegistration,
    handlelogin
}