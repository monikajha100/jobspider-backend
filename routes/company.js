var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

/* POST to submit a new company */
router.post('/submit_company', upload.single("icon"), function(req, res, next) {
  try {
    pool.query(
      "INSERT INTO companies (companyname, companyowner, icon) VALUES (?, ?, ?)",
      [req.body.companyname, req.body.companyowner, req.file.filename],
      function(error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ status: false, message: 'Database Error. Please contact DBA.' });
        } else {
          res.status(200).json({ status: true, message: 'Company submitted successfully.' });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'Server error occurred.' });
  }
});

/* GET to display all companies */
router.get('/display_all', function(req, res, next) {
  try {
    pool.query("SELECT * FROM companies", function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Database error' });
      } else {

          console.log(result)

        res.status(200).json({ status: true, message: 'Success', data: result });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'Technical issue' });
  }
});

/* POST to edit company data */
router.post('/edit_company_data', upload.single('icon'), function(req, res, next) {
  try {
    pool.query(
      "UPDATE companies SET companyname = ?, companyowner = ?, icon = ? WHERE id = ?",
      [req.body.companyname, req.body.companyowner, req.file.filename, req.body.id],
      function(error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ status: false, message: 'Database error' });
        } else {
          res.status(200).json({ status: true, message: 'Company data updated successfully.' });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'Server error occurred.' });
  }
});

/* POST to edit company picture */
router.post('/edit_company_picture', upload.single('icon'), function(req, res, next) {
  try {
    pool.query(
      "UPDATE companies SET logo = ? WHERE companyid = ?",
      [req.file.filename, req.body.companyid],
      function(error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ status: false, message: 'Database error' });
        } else {
          res.status(200).json({ status: true, message: 'Company picture updated successfully.' });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'Server error occurred.' });
  }
});

/* POST to delete a company */
router.post('/delete_company', function(req, res, next) {
  try {
    pool.query("DELETE FROM companies WHERE companyid = ?", [req.body.companyid], function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Database error' });
      } else {
        res.status(200).json({ status: true, message: 'Company deleted successfully' });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'There was a technical issue' });
  }
});



module.exports = router;
