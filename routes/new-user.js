const router = require('express').Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const database = require('../datatabase.js');
const db = database.getDb();

function handleURL(req, res) {

  let response = {};

  const username = req.body.username;
  
  db.collection('users').find({ user: username }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.count()
      .then((count) => {
        console.log(count);
        if (count === 0) {
          // user is not in the db => create new entry in the db
          const userID = Math.random().toString(36).substring(3, 12);
          db.collection('users').insertOne({ id: userID, user: username }, (error, result) => {
            if (error) {
              console.log(error);
              return
            }
            console.log(result.ops[0]);
            response.user = username;
            response.userID = userID;
            res.send(response)                
          })
        } else {
          // url is already in the db
          res.json( 
            {
              user: username,
              error: 'username already taken'
            })
        }
      });
    }
  })
}

router.post('/api/exercise/new-user', urlencodedParser, handleURL);

module.exports = router;