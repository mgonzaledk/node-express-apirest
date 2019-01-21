var jwt = require('express-jwt')
var key = require('../Config/Key')

function GetToken(request) {
    if(request.headers.authorization) {
        const split = request.headers.authorization.split(' ')

        if(split[0] === 'Token' || split[0] === 'Bearer') {
            return split[1]
        }
    }

    return null
}

module.exports = {
    required: jwt({
        secret: key.private_keyphrase,
        userProperty: 'payload',
        getToken: GetToken
    }),

    optional: jwt({
        secret: key.private_keyphrase,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: GetToken
    })
}
