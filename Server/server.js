import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import 'dotenv/config';

// const db = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'snowboards'
// });

const db = mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

const server = express();

server.use(express.json())

server.use(cors());

server.listen(4400, function(){
    console.log('server is successfully running on port 4400')
});


db.connect(error =>{
    if(error)
        console.log("sorry, cannot connect to db", error);
    else
        console.log("connected to mysql db");
})

server.get('/womens', (req, res) => {
    let query = "CALL `viewProducts`";
    db.query(query, (error, data) => {
        if (error){
            res.json ({ErrorMessage:error});
        }
        else {
            res.json(data[0]);
            // console.log(data);
        }
    })
})

server.get('/womens/:productid', (req, res) =>{
    let id_from_client = req.params.productid;
    let query = "SELECT * FROM snowboards";
    
    db.query(query, (error, data) => {
        if (error){
            res.json ({ErrorMessage:error});
        }
        else {
            res.json(data.find(x => x.id == id_from_client));
            // console.log(data);
        }
    })
    
})

server.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let loginQuery = 'CALL `login`(?, ?)';
    db.query(loginQuery, [email, password], (error, data, fields) => {
      if(error){
        res.json({ ErrorMessage: error});
      }
      else{
        if(data[0].length === 0){
          res.json({ data: data[0], login: false, message: "invalid credentials"})
        }
        else{
          res.json({ 
              adminID: data[0].UserID, 
              email: data[0].email,
              data: data[0],
              login: true, 
              message: "Login successful"});
              //create auth key 
        }   
      }
    })
  })

  server.get('/admin-view', (req, res) =>{
      let sbData = "SELECT * FROM snowboards";
      db.query(sbData, (error, data) =>{
          if(error){
              res.json({ErrorMessage: error})
          }
          else{
              res.json(data);
          }
      })
  })

  server.post('/admin-add', (req, res) =>{
      let image = req.body.image;
      let image2 = req.body.image2;
      let image3 = req.body.image3;
      let image4 = req.body.image4;
      let image5 = req.body.image5;
      let title = req.body.title;
      let description = req.body.description;
      let price = req.body.price;
      let stock = req.body.stock;
      let addQuery = "CALL `addProduct`(?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(addQuery, [image, image2, image3, image4, image5, title, description, price, stock], (error, data)=>{
          if(error){
              res.json({addProduct: false, message: error});
          }
          else{
              res.json({addProduct: true, message: "Product successfully added"});
          }
      })
  })

  server.get('/admin-edit/:id', (req, res) =>{
      let productID = req.params.id;
      let getQuery = "CALL `getProduct`(?)";
      db.query(getQuery, [productID], (error, data) =>{
          if(error){
              res.json(error)
          }
          else{
              res.json(data[0][0]);
          }
      })
  })

///doesn't work
  server.put('/admin-update/:id', (req, res) =>{
      let productID = req.params.id;
      let image = req.body.image;
      let image2 = req.body.image2;
      let image3 = req.body.image3;
      let image4 = req.body.image4;
      let image5 = req.body.image5;
      let title = req.body.title;
      let description = req.body.description;
      let price = req.body.price;
      let stock = req.body.stock;
      let editQuery = "CALL `editProduct`(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(editQuery, [productID, image, image2, image3, image4, image5, title, description, price, stock], (error)=>{
        if(error){
            res.json({edited:false, message: error});
        }
        else{
            res.json({edited: true, message: "Successfully Updated"});
        }
    })
  })

  server.delete('/admin-delete/:id', (req, res) =>{
      let productID = req.params.id;
      let deleteQuery = "CALL `deleteProduct`(?)";
      db.query(deleteQuery, [productID], (error) => {
        if(error){
            res.json({deleted: false, message: error});
        }
        else{
            res.json({deleted: true, message: "Successfully Deleted"});
        }
      })
  })

  server.put('/admin-toggle/:id', (req, res) =>{
      let productID = req.params.id;
      let toggleQuery = "CALL `toggleLive`(?)";
      db.query(toggleQuery, productID, (error)=>{
          if(error){
              res.json({toggled: false, message: error});
          }
          else{
              res.json({toggled: true, message: "Successfully Toggled"});
          }
      })
  })
  
