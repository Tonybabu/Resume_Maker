const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config();
const port = process.env.PORT || 4000;
const routes=require('./routes/userRoutes')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})