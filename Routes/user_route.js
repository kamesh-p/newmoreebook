let mongoose = require("mongoose"),
  express = require("express"),
  userRouter = express.Router();

const User = require("../Models/user_schema");

let userSchema = require("../Models/user_schema");

//Creating a new user

userRouter.route("/create-user").post((req, res, next) => {
  const { name, email, password } = req.body;

  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
});

//check validation if user already exists

// userRouter.route('/login-check').post((req, res, next) => {

//   const { name,email, password } = req.body

//   console.log("email:", email, " password :", password);

//   // userSchema.findOne((user) => {

//   // const { name, password } = req.body;

//   try {

//     // Check if the user exists in the database

//     userSchema.findOne({ "email": email })

//     .then((data)=>{

//       console.log("data :", data);

//       if (data.password===password) {

//         // User login is successful, send a success response

//         res.status(200).json({ message: 'Login successful', data });

//       } else {

//         // User not found or password incorrect

//         res.status(404).json({ message: 'Wrong Password' });

//       }

//     })

//     .catch((err)=> {

//       console.log("error:", err);

//       res.status(404).json({ message: 'Wrong Email ID' });

//     });

//     console.log("user:", user);

//   } catch (err) {

//     // Error occurred while querying the database

//     res.status(500).json({ message: 'Server error' });

//     console.log(err.reason);

//   }

// });

userRouter.route("/login-check").post((req, res, next) => {
  const { email, password } = req.body;

  console.log("email:", email, " password :", password);

  // userSchema.findOne((user) => {

  // const { name, password } = req.body;

  // Check if the user exists in the database

  userSchema
    .findOne({ email: email })
    .then((Users) => {
      console.log(Users);

      if (Users) {
        if (Users.password === password) {
          console.log("email:", Users.email, " password :", Users.password);

          res.status(200).json({ message: "Login successful", Users });

          console.log("Validation Sucess");
        } else {
          res.json("Wrong password");
        }
      } else {
        res.json({ message: "Wrong email" });
      }
    })
    .catch((err) => {
      console.log("error:", err);

      res.json({ message: "No record found" });
    });
});

userRouter.route("/").get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

userRouter.route("/get-user/:id").get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    // const {username,password} = res.body;
    // if (!username || !password) {
    //     return res.status(422).json({error:"plzzz fill"})
    //   }else{
    // const userlog = User.findOne({name:name});
    //     console.log(userlog);
    //   }
  });
});

userRouter.route("/update-user/:id").put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,

    {
      $set: req.body,
    },

    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);

        console.log("user updated successfully !");
      }
    }
  );
});

userRouter.route("/delete-user/:id").delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = userRouter;
