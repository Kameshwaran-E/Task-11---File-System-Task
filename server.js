const express = require("express");
const app =express();
require("dotenv").config();
const cors = require("cors")
const fs = require('fs');
const moment = require('moment');


//cors origin issue
app.use(cors({ origin: "*" }));

//body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/",(req,res)=>{
    res.status(200).end("welcome!")

})

app.get("/createfile/:name",(req,res)=>{

const foldername = req.params.name
const dateTimeFormat = 'YYYY-MM-DD_HH-mm-ss';


    try
  {  fs.mkdir(`${__dirname}/${foldername}`,(err)=>{

         const content = new Date().toTimeString();
         const fileName = `${moment().format(dateTimeFormat)}.txt`;
         
        if(err) {throw err};
    
        fs.writeFile(`${__dirname}/${foldername}/${fileName}`,content,(err)=>
        {
           
            if(err) {throw err};
            res.status(200).send(`${fileName}   ---new file created`)
        })
    })}
    catch (err){res.status(500).send(err)}

})

app.get("/readfile/:name",(req,res)=>{

    const foldername = req.params.name;
    const fileName = req.query.filename;
   
    
    
        try
      {  
        fs.readFile(`${__dirname}/${foldername}/${fileName}`,'utf8',(err,data)=>{
            if(err) {throw err}
            res.status(200).send(data)
        
        })
    }
        catch (err){res.status(500).send(err)}
    
    })




const PORT = process.env.PORT || 4500 ;
app.listen(PORT,()=>{
    console.log(`server listening on PORT ${PORT}`);
})