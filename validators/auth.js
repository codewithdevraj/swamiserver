const { z } = require( "zod" );

const authregistervalidator = z.object( {
    username: z
        .string( {
            message: "Username must be a string",
        } )
        .trim()
        .min( 3, {
            message: "Username must be at least 3 characters long",
        } )
        .max( 20, {
            message: "Username must be at most 20 characters long",
        } ),
    email: z
        .string( {
            message: "Email must be a string",
        } )
        .trim()
        .email( {
            message: "Email must be a valid email",
        } ),
    password: z
        .string( {
            message: "Password must be a string",
        } )
        .min( 8, {
            message: "Password must be at least 8 characters long",
        } )
        .max( {
            message: "Password must be at most 20 characters long",
        } ),
    
} );

module.exports = {
    authregistervalidator
}