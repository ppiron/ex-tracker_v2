const router = require('express').Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const database = require('../datatabase.js');
const db = database.getDb();

function handleURL(req, res) {

  let response = {};

  const userID = req.body.userID;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date ? new Date(req.body.date) : new Date(Date.now())
  
  db.collection('users').find({ id: userID }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.count()
      .then((count) => {
        console.log(count);
        if (count > 0) {
          // user found
          let username;
          result.toArray()
          .then ( docs => username = docs[0].user)
          db.collection('users').updateOne(
            { id: userID }, 
            { $push: 
              { exercises: 
                {
                  description: description,
                  duration: duration,
                  date: date,
                }
              }
            }, (error, result) => {
            if (error) {
              console.log(error);
              return
            }
            console.log(result.modifiedCount);
            response.user = username;
            response.userID = userID;
            response.description = description;
            response.duration = duration;
            response.date = date.toDateString();
            res.send(response)
          })
        } else {
          // user not found
          res.json( {error: 'userID not in the database'} )
        }
      });
    }
  })
}


router.post('/api/exercise/add', urlencodedParser, handleURL);

module.exports = router;