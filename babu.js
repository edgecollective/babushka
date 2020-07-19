var express = require("express")
var app = express()
var md5 = require("md5")
const stringify = require('csv-stringify');
var moment = require("moment");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], user: {}, count: 0 })
  .write()

'use strict';

function downloadCsv(posts, req, res) {
  // adding appropriate headers, so browsers can start downloading
  // file as soon as this request starts to get served
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Pragma', 'no-cache');

  // ta-da! this is cool, right?
  // stringify return a readable stream, that can be directly piped
  // to a writeable stream which is "res" (the response object from express.js)
  // since res is an abstraction over node http's response object which supports "streams"
  stringify(posts, { header: true })
    .pipe(res);
};

var args = { filePath : "db.sqlite", outputPath : "./mycsv" };

const fs = require('fs');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// https://www.npmjs.com/package/csv-export

var HTTP_PORT = 8700


// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/users", (req, res, next) => {
    
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            //"message":"success",
            "data":rows
            //rows
        })
      });
});

app.use(express.static('plotting'))

app.get("/api/user/id", (req, res, next) => {
    console.log('id');
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});



app.get("/api/latest", (req, res, next) => {
    //console.log('all')
    //var sql = "select * from user order by timestamp desc LIMIT 10"
    //var sql = "select * from user order by id asc LIMIT 100"

   console.log('get!')




   res.json({
    "message":"success",
    "data":"yeah!"
    })
});

function downloadCsv(req, res) {
  stringify(posts, { header: true })
    .pipe(res);
};


app.get("/api/csv", (req, res, next) => {
        console.log('csv');

         var N = 1000;
    if (req.query.limit) {
            N = parseInt(req.query.limit);
    }

    //var sql = "headers on mode csv output data.csv select * from user order by timestamp desc LIMIT 10"
    //sqliteToCsv.toCSV(args,
     //    (err) => {console.log(err); });

//var sql = "select * from user order by timestamp desc LIMIT 10"
    //var sql = "select * from user order by id desc LIMIT 1000"
    var sql = "select * from user order by id desc LIMIT "
    var sql = sql.concat(N.toString());
    var params = [];
    //var fields = ['dateTime','rssi'];
    //var fieldNames = ['Time','RSSI'];
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        //console.log(JSON.stringify(rows));
            posts=rows;
        downloadCsv(JSON.stringify(rows),res,req);
        });
});


app.post("/api/", (req, res, next) => {
    var errors=[]

    console.log(req.body);

    var date = new Date();
    var ts = Math.round(( date ).getTime() / 1000);
    var timestamper = moment().format();
    
    console.log(date);

    db.get('posts')
    .push(req.body)
    .write()

	//var params =[ts,timestamper,data.distance,data.BatV,data.deviceName,data.devEUI,data.rssi]
});



app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : undefined
    }
    db.run(
        `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

