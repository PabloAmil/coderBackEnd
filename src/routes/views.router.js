const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  let user = {
    name: 'Haru',
    isPt: true,
  }

  res.render("index", {
    user
  });
})

router.get("/socket", (req, res)=> {
  res.render('socket');
})


module.exports = router;