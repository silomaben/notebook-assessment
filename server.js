const express = require('express');
const { notebookrouter} = require('./Routes/routes.js');

const app = express();

app.use(express.json())
app.use('/notebook', notebookrouter)

app.use((err,req,res,next)=>{
    res.json({Error: err})
})

app.listen(4500,()=>{
    console.log('server running on port 4500')
})