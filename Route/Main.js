var express = require('express')
var router = express.Router()

/* GET Index. */
router.get('/', (request, resource, next) => {
    resource.render('Index', {
        title: 'Test'
    })
})

module.exports = router
