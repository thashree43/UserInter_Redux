import express from 'express'
const app = express()
const port = 3001;

app.get('/',(req,res)=>res.send("The server is ready "))
app.listen(port,()=>console.log(`the server is running on this ${port}`))
