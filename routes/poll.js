const express = require('express');
const router = express.Router();
const Pusher = require('pusher')
const mongoose = require('mongoose')
const Vote = require('../models/Vote')

var pusher = new Pusher({
    appId: '954779',
    key: 'd3db72848e63ceb1b00d',
    secret: '6d1942248823e7a820fe',
    cluster: 'ap1',
    encrypted: true
  });
router.get('/', (req,res)=>{
    Vote.find()
    .then(votes => res.json({success: true,
    votes:votes}))
});
router.post('/', (req, res)=>{
    const newVote = {
      os: req.body.os,
      points: 1
    }

    new Vote(newVote).save().then(vote => {
      pusher.trigger('os-poll', 'os-vote', {
        points: parseInt(vote.points),
        os: vote.os
      });
      return res.json({success: true, message: 'Thank You For Voting'})
    });
});

module.exports = router