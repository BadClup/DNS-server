const path = require('path'),
    express = require('express'),
    router = express.Router();


router.use(express.static(path.join(__dirname, '..', 'public', 'test-site')))

router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'test-site', 'index.html'))
    })


module.exports = router;