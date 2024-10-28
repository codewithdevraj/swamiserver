const jwt = require( 'jsonwebtoken' );
const secretkey = process.env.JWT_SECRET;
const expiry = process.env.JWT_EXPIRE;

const generateToken = ( user ) => {
    const payload = {
        user: {
            id: user.userId,
            username: user.username,
            email: user.email,
            
        },
    };

    return jwt.sign(
        payload, secretkey, {
        expiresIn: expiry,
    } );
};


const verifyToken = async ( token ) => {
    if ( !token ) {
        return null;
    }
    try {
        const decoded = await jwt.verify( token, secretkey );
        return decoded;
    } catch {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
}