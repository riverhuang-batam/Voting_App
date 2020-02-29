const express = require('express');
const router = express.Router();
const Pusher = require('pusher')
var pusher = new Pusher({
    appId: '954779',
    key: 'd3db72848e63ceb1b00d',
    secret: '6d1942248823e7a820fe',
    cluster: 'ap1',
    encrypted: true
  });
router.get('/', (req,res)=>{
    res.send('POLL');
});
router.post('/', (req, res)=>{
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
      });
      return res.json({success: true, message: 'Thank You For Voting'})
})

module.exports = router