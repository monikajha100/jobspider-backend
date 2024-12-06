var express = require('express');
var router = express.Router();
var upload=require('./multer')
var pool=require('./pool')

/* GET home page. */
router.post('/submit_subcategory',upload.single('icon'), function(req, res, next) {
  try{
    pool.query("insert into subcategory ( subcategoryname,  subcategorypicture) values(?,?)",[req.body.subcategoryname,req.file.filename],function(error,result){
    if(error)
    {   console.log(error)
        res.status(200).json({status:false,message:'Database Error..Pls Contact DBA...'})
    }
    else
    {
        res.status(200).json({status:true,message:'subCategory Submitted Successfully'})
    }

    })

  }
  catch(e)
  { console.log("Error:",e)
    res.status(200).json({status:false,message:'There is technical issue..Pls Contact Server Admistrator...'})
  }
});
router.post('/edit_subcategory_data', function(req, res, next) {
    try{
      console.log("BODY:",req.body)
      pool.query("update subcategory set subcategoryname=? where subcategoryid=?",[req.body.subcategoryname,req.body.subcategoryid],function(error,result){
      if(error)
      {   console.log(error)
          res.status(200).json({status:false,message:'Database Error..Pls Contact DBA...'})
      }
      else
      {
          res.status(200).json({status:true,message:'subCategory Name Updated Successfully'})
      }
  
      })
  
    }
    catch(e)
    { console.log("Error:",e)
      res.status(200).json({status:false,message:'There is technical issue..Pls Contact Server Admistrator...'})
    }
  });
  
  
  router.post('/edit_subcategory_picture',upload.single('icon'), function(req, res, next) {
    try{
      console.log("BODY:",req.body)
      pool.query("update subcategory set subcategorypicture=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
      if(error)
      {   console.log(error)
          res.status(200).json({status:false,message:'Database Error..Pls Contact DBA...'})
      }
      else
      {
          res.status(200).json({status:true,message:'subCategory Picture Updated Successfully'})
      }
  
      })
  
    }
    catch(e)
    { console.log("Error:",e)
      res.status(200).json({status:false,message:'There is technical issue..Pls Contact Server Admistrator...'})
    }
  });
  
  router.post('/delete_subcategory', function(req, res, next) {
    try{
      console.log("BODY:",req.body)
      pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
      if(error)
      {   console.log(error)
          res.status(200).json({status:false,message:'Database Error..Pls Contact DBA...'})
      }
      else
      {
          res.status(200).json({status:true,message:'subCategory Deleted Successfully'})
      }
  
      })
  
    }
    catch(e)
    { console.log("Error:",e)
      res.status(200).json({status:false,message:'There is technical issue..Pls Contact Server Admistrator...'})
    }
  });
  
  
  
  
  
  router.get('/display_all', function(req, res, next) {
    try{
  
      pool.query("select * from category",function(error,result){
      if(error)
      {   console.log(error)
          res.status(200).json({status:false,message:'Database Error..Pls Contact DBA...'})
      }
      else
      {
          res.status(200).json({status:true,message:'Success',data:result})
      }
  
      })
  
    }
    catch(e)
    { console.log("Error:",e)
      res.status(200).json({status:false,message:'There is technical issue..Pls Contact Server Admistrator...'})
    }
  });
  
  module.exports = router;
  

