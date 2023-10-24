const express= require('express')

const bcrypt=require('bcrypt')

const path =require('path')

require('dotenv').config();

const User=require('./models/user')

const sequelize=require('./util/database')

const userRoutes=require('./routes/userRoutes')

const cors=require('cors')




const app=express();

app.use(express.static(path.join(__dirname,'public')))

app.use(express.json())

app.use(cors())
app.use(cors({
  origin:'http://127.0.0.1:5500',
  methods:['put','get','delete','post']
}))


app.use('/user', userRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000,() => {
      console.log(`Server is running on port ${3000}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });