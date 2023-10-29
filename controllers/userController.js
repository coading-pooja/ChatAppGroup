const express = require('express')
const User = require ("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
  try {
    const signupDetails = req.body;
    console.log(req.body)
    // const user = await User.create({ name:signupDetails.signupName, email:signupDetails.signupEmail, password:signupDetails.signupPassword });
    
    //res.status(201).json(user);

        //ecrypting algo
  const saltRounds = 10; // this decide the level of complexity of the hashcode to be generated. 
        bcrypt.hash(signupDetails.signupPassword, saltRounds, async (err, hash) => {
         await User.create({ name:signupDetails.signupName, email:signupDetails.signupEmail,phoneNO:signupDetails. signupPhoneNo,password:hash});
             console.log(err)
            res.status(201).json("successfully created new user");
        })
      } catch (error) {
  
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }  
    }

    function generateAccessToken(id, name) {
        const secretKey = process.env.secretKey;
              
            if (!secretKey) {
                  throw new Error('Secret key is not defined');
                }
              
                const token = jwt.sign({ userId:id, name:name}, secretKey);
            
                return token;
              }
        


    const login = async (req, res) => {
        try {
          const loginDetails = req.body;
             console.log(req.body)
          const user = await User.findOne({
            where: {
              email: loginDetails.loginEmail
            },
        
          });
          console.log('Login Password:', loginDetails.loginPassword);
          console.log('Database Password:', user.password);
              
            
      
          if (user) {
        
            
          bcrypt.compare(loginDetails.loginPassword, user.password, (err, result) => {
      
            console.log('Inside bcrypt.compare');
      
      
            if (result==true) {
                console.log('Credentials are valid');
                const token =  generateAccessToken(user.id, user.name)
                const userId = jwt.decode(token).userId;
                const name = jwt.decode(token).name;
                res.status(200).json({ message: 'Logged in Sucessfully',token: generateAccessToken(user.id, user.name),userId:userId,name:name})
            }
            else {
                console.log('Credentials are not valid');
                res.status(401).json({ message: 'Password Does Not Match' });
            }
        })
      }
      else {
        console.log('User Not Found');
        res.status(404).json({ message: 'User Not Found' });
      }
      }
      catch (err) {
        console.log(err)
      //const error = err.parent.sqlMessage;
      res.status(404).json({
        error: err
      })
      }
      };
      
      module.exports = {
        signup,
        login,
        generateAccessToken
      
      
      }
      


