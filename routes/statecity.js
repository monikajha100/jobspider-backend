var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.get('/fetch_all_states', function (req, res, next) {
  pool.query('SELECT * FROM state', function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ status: false, message: 'Database error' });
    } else {
      res.status(200).json({ status: true, message: 'Success', data: result });
    }
  });
});

/* GET to fetch all cities by state ID */
router.post('/fetch_all_city', function (req, res, next) {
  const stateId = req.body.stateid; // Assuming state ID is passed as a query parameter

  pool.query('SELECT * FROM city WHERE stateid = ?', [stateId], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ status: false, message: 'Database error' });
    } else {
      res.status(200).json({ status: true, message: 'Success', data: result });
    }
  });
});


module.exports = router;
