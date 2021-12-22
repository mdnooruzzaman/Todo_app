
var mysql = require("mysql");
var bodyParser = require('body-parser')
var express = require("express");

var app = express();

app.use(express.json());
//var JsonParser = bodyParser.json();
app.use(express.urlencoded())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database:"todo"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "Select * from user";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Selected");       
  });

});

//register the new user
app.post('/register' , (req ,res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var sql = "INSERT INTO user (username , email , password) VALUES (? ,?, ?)";
    con.query(sql ,[username , email ,password] , (err , result) => {
        if(!err){
        res.send(result);
        console.log("Done!");
        }
    });
});

app.get('/api/signin/:id' , (req , res) => {
    var nam = req.params.id;
   
    //var password = req.body.password;
  
    var sql = `SELECT username , password FROM user where email = ? `;
    con.query(sql ,[nam] , (err , result) => {
      if(err){
        console.log(err)
      }else{
        res.json(result)
        console.log("Done! ho raha hai")
      }
    })
  });
//handling add operation
app.post('/home/add' , (req,res) =>{
    
    var content = req.body.content;
    console.log(req.body.content); 
    var sql = `INSERT INTO list ( topic) VALUES (?)`;
    con.query(sql , [content] , (err , result) =>{
        if(!err){
            res.send(result)
            console.log("Done")
        }
    })
   
});

app.get('/home/fetch' , (req,res) => {
    var sql = `SELECT * FROM list`
    con.query(sql , (err,result) => {
        if(!err){
            res.send(result)
            console.log("fetched")
        }
    })
})

//handling edit operation

app.put('/home/edit/:id' , (req,res) => {
    var id = req.params.id;
    var content = req.body.content;
    console.log(content);
    console.log(id)

    var sql = `UPDATE list SET topic = ? WHERE id = ?`;
    con.query(sql , [content ,id] ,(err , result) => {
        if(!err){
            res.send(result);
            console.log("updated");
        }
    })
});

//handling delete operation

app.delete('/home/delete/:id' , (req,res) => {
    var id = req.params.id;
    
    var sql = `DELETE FROM list WHERE id = ?`;
    con.query(sql , [id] , (err , result) => {
        if(!err){
            res.send(result);
            console.log("Deleted");
        }
    })
});

app.get('/dash' , (req , res) => {
    res.send("Dashboard")
})
app.listen("3001")
console.log("server running on port 3001")