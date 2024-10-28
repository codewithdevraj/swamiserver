const fs = require( "fs" );
const path = require( "path" );

const sessions = require( "../databases/session.json" );

const mapSessionIdWithUser = async ( userId, sessionId ) => {
    console.log(userId, sessionId);
    // Find the index of the user with the matching userId
    const userIndex = sessions.users.findIndex(
      (user) => user.userId === userId
    );

    if (userIndex === -1) {
      // If the user does not exist, push a new user with userId and sessionId
      console.log("User not found, adding new user.");
      sessions.users.push({ userId, sessionId });
    } else {
      // If the user exists, update the sessionId
      console.log("User found, updating session ID.");
      sessions.users[userIndex].sessionId = sessionId;
    }

    // Write the updated sessions data back to the JSON file
    fs.writeFileSync(
      path.join(__dirname, "../databases/session.json"),
      JSON.stringify(sessions, null, 2)
    );
}

module.exports = mapSessionIdWithUser;