const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
var moment = require("moment");

// Create server
const app = express()
app.use(bodyParser.json())

// Create database instance and start server
const adapter = new FileAsync('db.json')
low(adapter)
  .then(db => {
    // Routes
    // GET /posts/:id
    app.get('/posts/:id', (req, res) => {
      const post = db.get('posts')
        .find({ id: req.params.id })
        .value()

      res.send(post)
    })


    // GET  /latest
    app.get("/latest", (req, res, next) => {
      console.log('get!!!');
     
      //var data = db.get('posts').map('temp').value();
      //var data = db.get('posts').map('temp')
      var data = db.get('posts').take(5)

      res.json({
        "message":"success",
        "data":data
        });

    });


    // POST /posts
    app.post('/posts', (req, res) => {
      
      db.get('posts')
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .assign({ ts: moment().format()  })
        .write()
        .then(post => res.send(post))
    })

    // Set db default values
    return db.defaults({ posts: [] }).write()
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
  })