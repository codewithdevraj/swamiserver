const { v4: uuidv4 } = require( "uuid" );
const sessions = require( "../databases/session.json" );

const generateSessionId = () => {
    const sessionId = uuidv4();
    return sessionId;
}

const verifySessionId = ( sessionId, userId ) => {
    try {
        if ( sessionId.length !== 36 ) {
            return {
                sessionId: false,
                message: "Invalid session Id length"
            };
        }

        const sessionIndex = sessions.users.findIndex(
            ( user ) => user.sessionId === sessionId
        )

        if ( sessionIndex === -1 ) {
            return {
                sessionId: false,
                message: "Session Expired or Not Found"
            }
        }

        const validUserId = sessions.users[sessionIndex].userId === userId;

        if ( validUserId ) {
            return {
                sessionId: true,
                message: "Session Valid"
            }
        } else {
            return {
                sessionId: false,
                message: "Invalid User Id"
            }
        }
    } catch ( error ) {
        console.error( "Error verifying the  session Id", error );
        return {
            sessionId: false,
            message: "Error verifying the session Id"
        };
    }
};

module.exports = {
    generateSessionId,
    verifySessionId
}