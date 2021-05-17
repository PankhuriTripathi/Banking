const { concatSeries } = require('async');
const express =require('express');
const bodyParser = require("body-parser");
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const methodOverride =require('method-override');

const User = require('./models/user');
const Transaction = require('./models/transaction');

mongoose.connect('mongodb+srv://admin-pankhu:Panisno1%23@cluster0.ymowh.mongodb.net/bank_stand2',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message)); 

//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
	res.render('home')
});


app.get('/view', async (req, res) => {
	const users = await User.find({});
	console.log(users);
	res.render('customerlist', {users} );
});

app.post("/view", function(req, res){
    res.redirect("/view");
})

app.get('/view/:id', async (req,res)=>{
	const { id } = req.params;
 	const user = await User.findById(id);
	const users = await User.find({});

	res.render('transfer', {user, users });
});

app.post("/view/:id", function(req, res){
    const { id } = req.params;
    console.log(id)
    res.redirect("/view/" + id)
   
})

app.get("/view/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);
    res.render("form", {fromUser, toUser});
});

app.put("/view/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const credit = parseInt(req.body.credit);
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);

    if(credit <= fromUser.credits && credit > 0){
        
    let fromCreditsNew = fromUser.credits - credit;
    let toCreditsNew = parseInt(toUser.credits + credit);
    await User.findByIdAndUpdate(id1, {credits : fromCreditsNew}, 
			{ runValidators: true, new: true });
    await User.findByIdAndUpdate(id2, {credits : toCreditsNew}, 
				{ runValidators: true, new: true });

        let newTransaction = new Transaction();
        newTransaction.fromName = fromUser.name;
        newTransaction.toName = toUser.name;
        newTransaction.transfer = credit;
        await newTransaction.save();

        res.redirect("/view");
    }
    else{
        res.render('error');
    }
});
app.post("/failure", function(req, res){
    res.redirect("/");
})

app.get("/history", async(req, res)=>{
    const transactions = await Transaction.find({});
    res.render("history", {transactions});
});

app.listen(process.env.PORT || 3000, process.env.IP,function(){
	console.log('serve running');
   });