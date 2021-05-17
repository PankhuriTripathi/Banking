const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb+srv://admin-pankhu:Panisno1%23@cluster0.ymowh.mongodb.net/bank_stand2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message)); 

const seedUsers = [
    {
        name: 'Emilia',
        email: 'rezero@gmail.com',
        credits: 10000
    },
    {
        name: 'Mikasa',
        email: 'aot1@gmail.com',
        credits: 7000
    },
    {
        name: 'Christa',
        email: 'aot2@gmail.com',
        credits: 4500
    },
    {
        name: 'Robin',
        email: 'onepiece1@yahoo.com',
        credits: 8600
    },
    {
        name: 'Asuna',
        email: 'swordsart@gmail.com',
        credits: 7500
    },
    {
        name: 'Rukia',
        email: 'bleac1@yahoo.com',
        credits: 6900
    },
    {
        name: 'Orihime',
        email: 'bleach@gmail.com',
        credits: 3000
    },
    {
        name: 'Nami',
        email: 'onepiece@yahoo.com',
        credits: 2100
    },
    {
        name: 'Itachi',
        email: 'naruto@gmail.com',
        credits: 5300
	},
    {
        name: 'Levi',
        email: 'aot3@gmail.com',
        credits: 5300
	}
]

User.insertMany(seedUsers)
    .then(res => console.log(res))
    .catch(err => console.log(err))