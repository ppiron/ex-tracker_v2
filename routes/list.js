const router = require('express').Router();
const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
const database = require('../datatabase.js');
const db = database.getDb();

function handleURL(req, res) {

  let response = {};

  const userID = req.query.userID;
  const from = req.query.from ? new Date(req.query.from) : new Date(0);
  const to = req.query.to ?  new Date(req.query.to) : null;
  const lim = req.query.lim || null
  console.log(from, to, lim);


  db.collection('users').find({ id: userID }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.count()
      .then((count) => {
        console.log(count);
        if (count > 0) {
          // user found
          result.toArray()
          .then ( docs => {
            const exercises = docs[0].exercises.filter( exercise => {
              return (exercise.date >= from) && (to ? exercise.date <= to : true)
            }).map(exercise => {
              return Object.assign({}, exercise, {date: exercise.date.toDateString()})
            })
            console.log(exercises)
            response.username = docs[0].user
            response.userID = userID
            response.count = lim ? lim : exercises.length
            response.log = lim ? exercises.slice(0, lim + 1) : exercises
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


router.get('/api/exercise/log', handleURL);

module.exports = router;