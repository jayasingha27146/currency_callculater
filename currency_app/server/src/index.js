const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currencies

app.get("/getallcurrencies" , async (req , res)=>{

    const nameurl = " https://openexchangerates.org/api/currencies.json?app_id=a09ac186646f43d39fecc251353bdbf4";
    

    const nameresponce= await axios.get(nameurl);
    const namedata = nameresponce.data;

    return res.json(namedata);

    try{}catch(err){
        console.error(err);    
    }
});

//get the target amount

app.get("/convert" ,async (req , res)=>{

    const {
        date, 
            Sourcecurrency,
            Targetcurrency,
            AmountinSourcecurrency, 
    } = req.query;

    try {
        const dataurl = `https://openexchangerates.org/api/historical/${date}.json?app_id=a09ac186646f43d39fecc251353bdbf4`;
       const dataresponse =  await axios.get(dataurl);
       const rates = dataresponse.data.rates;
   
       //rates      

       const Sourcerate = rates[Sourcecurrency];
       const targetrate = rates[Targetcurrency];

       //final target value 

       const targetamount = (targetrate / Sourcerate) * AmountinSourcecurrency;


       return res.json(targetamount.toFixed(2));
    } catch (err){
        console.error(err);
    }

});

//listen a port
app.listen( 5000 ,()=>{
    console.log("SERVER STARTED");
} );