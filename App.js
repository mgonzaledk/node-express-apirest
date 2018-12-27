var express = require('express')
var http = require('http')
var https = require('https')

var path = require('path')

var app = express()

// Configurar vistas.
app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'ejs')

// Error 404.
app.use((request, response, next) => {
    var error = new Error('Ruta no encontrada.')
    error.status = 404

    next(error)
})

// Controlador de errores.
app.use((error, request, resource, next) => {
    // Adjuntar mensaje del error.
    resource.locals.message = error.status === 401 ?
        'Permiso denegado.' :
        error.message

    // Eliminar errores si el entorno no es el de desarrollo.
    resource.locals.error =
        request.app.get('env') === 'development' ? error : {}

    // Renderizar página de error.
    resource.status(error.status || 500)
    resource.render('Error')
})

module.exports = app

var server = http.createServer(app)
server.listen(8001)

if (process.env.NODE_ENV === 'production') {
    var sslConfig = require('./Config/Ssl')

    var secureServer = https.createServer(app, sslConfig)
    secureServer.listen(8002)
}
