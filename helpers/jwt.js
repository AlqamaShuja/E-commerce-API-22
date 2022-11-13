const { expressjwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        getToken: function getTokenFromHeader(req) {
            if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
                return req.headers.authorization.split(" ")[1];
            }
            return null;
        }
        // isRevoked: isRevoked
    })
        .unless({
            path: [
                { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
                { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
                `${api}/users/login`,
                `${api}/users/register`,
            ]
        })
}

// async function isRevoked(req, payload, done) {
//     if (!payload.isAdmin) {
//         done(null, true)
//     }

//     done();
// }



module.exports = authJwt