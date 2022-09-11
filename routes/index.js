let express = require('express');
let router = express.Router();
var bodyParser = require('body-parser');
let mongoDB = require('mongoDB').MongoClient;
let ObjectId = require('mongoDB').ObjectId;
let querystring = require('querystring');
let mongoURL = 'mongodb://localhost:27017';
let connection='';
let contactDB='';
const startup = async() => {
	connection = await mongoDB.connect(mongoURL);
	let db = connection.db('');
	try {
		contactDB=db.collection("Contacts");
	}
	catch {
			contactDB=db.createCollection("Contacts");
	}
}


var ensureLoggedIn = function(req, res, next) {
	if ( req.user ) {
		next();
	}
	else {
		res.redirect("/login");
	}
}



function isEmpty(testStr) {
	if (testStr.trim()==='')
		return "";
	else 
		return testStr;
}


function isChecked (checked) {
	//console.log(checked)
	if (checked === 'on')
		return "Yes";
	else 
		return "No";
}



let mailer = function(req, res, next) {
	
	res.render('mailer', { title: 'Mailer: sign up to be mailed information!' });
}

let thanks = function(req, res, next) {
	res.render('thanks', { title: 'Submitted' });
}

async function getDB() {
	value = await contactDB.find({}).toArray();
	return value;
}


let contacts = async function(req, res,next) {
	let parsedDB = await getDB();  
	//console.log(parsedDB+"test");
	res.render('contacts', { contactDB: parsedDB });
}

let updatemailer = async function(req, res,next) {
	let parsedID = req.query.contactID;  
	//console.log(parsedID);
	let foundContact = await contactDB.findOne({ _id: ObjectId(parsedID) });
	//console.log(foundContact);
	res.render('updatemailer', { contact: foundContact });
}

let deletemailer = async function(req, res, next) {
	let parsedID = req.query.contactID;  
	//console.log(parsedID);
	let foundContact = await contactDB.findOne({ _id: ObjectId(parsedID) });
	//console.log(foundContact); 
	contactDB.deleteOne({_id: foundContact._id});
	res.redirect('/contacts');
}



/* GET home page. */
router.get('/', mailer);
router.get('/mailer', mailer)
router.get('/thanks', thanks)
router.get('/contacts', ensureLoggedIn, contacts)
router.get('/updatemailer', ensureLoggedIn, updatemailer)
router.get('/deletemailer', ensureLoggedIn, deletemailer)

router.post('/mailer',  function(req, res, next) {
	//res.json({requestBody: req.body });
	post = req.body;
	
	
	Contact = {
		Name : post.Title +" "+post.First_Name+" " +post.Last_Name,
		UnfilteredName : {
			Title: post.Title,
			FirstName: post.First_Name,
			LastName: post.Last_Name
		},
		Address : post.Address,
		UnfilteredAddress : {
			Street: post.Street, 
			City: post.City,  
			State: post.State, 
			Zip: post.Zip
		},
		Lat : post.Lat,
		Long: post.Long
	};
	
	//checks if 'any' is checked and if so, then automatically set the variables.
	//otherwise, individually checks if they are checked. The philosophy of this is,
	//"if we're not going to be able to contact the person using [x] method, 
	//why keep the unique value in the database?" The only exception to this 
	//is the address, as seen within the /mailer part of the 
	
	Contact.Phone = post.Phone;
	Contact.Email= post.Email;
	
	
	if ((isChecked(post.Contact_by_Any, ""))!="No") {
		//console.log("ANY");
;		Contact.Contact_by_Phone= "Yes";
		Contact.Contact_by_Mail= "Yes";
		Contact.Contact_by_Email= "Yes";
		Contact.Contact_by_Any="Yes";
	}
	else {
		//console.log("Not any")
		
		Contact.Contact_by_Phone = isChecked(post.Contact_by_Phone);
		Contact.Contact_by_Mail = isChecked(post.Contact_by_Mail);
		Contact.Contact_by_Email = isChecked(post.Contact_by_Email);
		Contact.Contact_by_Any="No";
	}
	
	//console.log(Contact);
	const result = contactDB.insertOne(Contact);
		
	
	
	
	
	
	
	
	//console.log(req.body);
	//console.log(result);
	
	
	
	
	res.redirect('/thanks');
	
});








router.post('/updatemailer', function(req, res, next) {
	//res.json({requestBody: req.body });
		//res.json({requestBody: req.body });
	post = req.body;
	
	for (element in post)
			post[element]=isEmpty(post[element]);
		
	//console.log(req.body);
	
	Contact = {
		Name : post.Title +" "+post.First_Name+" " +post.Last_Name,
		UnfilteredName : {
			Title: post.Title,
			FirstName: post.First_Name,
			LastName: post.Last_Name
		},
		Address : post.Address,
		UnfilteredAddress : {
			Street: post.Street, 
			City: post.City,  
			State: post.State, 
			Zip: post.Zip
		},
		Lat : post.Lat,
		Long: post.Long
	};
	
	//checks if 'any' is checked and if so, then automatically set the variables.
	//otherwise, individually checks if they are checked. The philosophy of this is,
	//"if we're not going to be able to contact the person using [x] method, 
	//why keep the unique value in the database?" The only exception to this 
	//is the address, as seen within the /mailer part of the 
	
	Contact.Phone = post.Phone;
	Contact.Email= post.Email;
	
	
	if ((isChecked(post.Contact_by_Any, ""))!="No") {
		//console.log("ANY");
;		Contact.Contact_by_Phone= "Yes";
		Contact.Contact_by_Mail= "Yes";
		Contact.Contact_by_Email= "Yes";
		Contact.Contact_by_Any="Yes";
	}
	else {
		//console.log("Not any")
		
		Contact.Contact_by_Phone = isChecked(post.Contact_by_Phone);
		Contact.Contact_by_Mail = isChecked(post.Contact_by_Mail);
		Contact.Contact_by_Email = isChecked(post.Contact_by_Email);
		Contact.Contact_by_Any="No";
	}
		
	console.log("THIS IS A TEST!");
	console.log(Contact);
	
	const result = contactDB.updateOne({_id : ObjectId(post.updateId)}, {$set: {
			Name: Contact.Name,
			UnfilteredName: Contact.UnfilteredName,
			Address: Contact.Address,
			UnfilteredAddress: Contact.UnfilteredAddress,
			Lat: Contact.Lat,
			Long: Contact.Long,
			Phone: Contact.Phone,
			Email: Contact.Email,
			Contact_by_Phone: Contact.Contact_by_Phone,
			Contact_by_Mail: Contact.Contact_by_Mail,
			Contact_by_Email: Contact.Contact_by_Email,
			Contact_by_Any: Contact.Contact_by_Any
		}
	});
	
	
	
	
	
	//console.log(req.body);
	//console.log(result);
	
	
	
	
	res.redirect('/contacts');
	
});



module.exports = router;

startup();

