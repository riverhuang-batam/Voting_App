const mongoose = require('mongoose');

//Map global promise
mongoose.Promise= global.Promise;
//Mongoose connect
mongoose.connect('mongodb+srv://admin:Firewall@421@mern-exercise-tracker-oxfny.gcp.mongodb.net/voteapp?retryWrites=true&w=majority',  {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err))