const validator = ( schema ) => async ( req, res, next ) => {
    try {
        const parsebody = await schema.parseAsync( req.body );
        req.body = parsebody;
        next();
    } catch ( err ) {
        const message = err.errors[0].message;
        res.status( 400 ).json( { message } );
    }
};

module.exports = validator;