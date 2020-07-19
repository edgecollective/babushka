const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
var moment = require("moment");

var HTTP_PORT = 9000;


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
    // e.g. http://localhost:3000/latest?param=key2

    app.get("/latest", (req, res, next) => {
      console.log('get!!!');

      var N = 1000;
    if (req.query.limit) {
            N = parseInt(req.query.limit);
    }

      //var data = db.get('posts').map('temp').value();
      //var data = db.get('posts').map('temp')
      //var data = db.get('posts').take(5)
      //var data = db.get('posts').map(req.query.param)
      var data = db.get('posts').sortBy('id').take(N);

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
    app.listen(HTTP_PORT, () => console.log('listening on port ',HTTP_PORT))
  })
