const { db } = require('../database');

searchProduct = async (req, res) => {
    const search = req.url.slice(14);
    if (!search) {
        return res.status(400).json({success: false, message: 'Search parameter is required'});
    }
    const query = `SELECT * FROM ingredients WHERE \`name.singular\` LIKE ?`;
    db.promise().query(query, [`%${search}%`]).then(([result]) => {
        res.status(200).json({success: true, message: 'Products found', data: result});
    }).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    });
}

module.exports = { searchProduct }
