const router = require(".");
const { searchProduct } = require('../functions/productdb');



router.get('/search', (req, res) => {
    searchProduct(req, res).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    });
});

module.exports = router;