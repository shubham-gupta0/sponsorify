const express = require("express");
const app = express();

const {db} = require("./firebase");
const { error } = require("console");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root
app.get('/', async (req, res) => {
    res.send("Hello world");
});

app.post("/add-events",async(req,res)=>{
    try {
        const {email,event_name,description} = req.body;
        if(!email|| !event_name|| !description){
            res.status(400).json({msg:"Enter all the fields."})
        }

        const userJson = {
            email: email,
            event_name: event_name,
            description:description,
        };
	
	const response = await db.collection("clubs").add(userJson);
	res.json(response)
    } catch (error) {
        res.send(400).json(error);
    }
});

app.get("/all-clubs",async (req, res) => {
    try{
        const userRef=db.collection("clubs");
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.status(200).send(responseArr);
    }
    catch(error){
        res.status(400).json(error);
    }
});

app.post("/bid-for-event",async(req,res)=>{
    try {
        const {email,event_name,amount_of_bidding} = req.body;
        if(!email|| !event_name|| !amount_of_bidding){
            res.status(400).json({msg:"Enter all the fields."})
        }

        const userJson = {
            email: email,
            event_name: event_name,
            amount_of_bidding:amount_of_bidding,
        };
	const response = await db.collection("sponsers").add(userJson);
	res.json(response)
    } catch (error) {
        res.send(400).json(error);
    }
});

app.get("/all-bids",async (req, res) => {
    try{
        const userRef=db.collection("sponsers");
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.status(200).send(responseArr);
    }
    catch(error){
        res.status(400).json(error);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});