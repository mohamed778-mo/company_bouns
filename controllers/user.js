const User = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();


const Register = async (req, res) => {
  try {
    const user = req.body;
    const dublicatedEmail = await User.findOne({ email: user.email });
    const dublicatedPhone = await User.findOne({ phone: user.phone });

    if (dublicatedEmail) {
      return res.status(400).send("Email already exist!!");
    }
    if (dublicatedPhone) {
        return res.status(400).send("Phone already exist!!");
      }
    const newUser = new User(user);

    await newUser.save();


    res.status(200).send("Register is success !!");
  } catch (error) {
    res.status(500).send('Server Error');
  }
};



const Login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res.status(404).send("EMAIL/PHONE OR PASSWORD NOT CORRECT");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).send("EMAIL/PHONE OR PASSWORD NOT CORRECT");
    }

    const SECRETKEY = process.env.SECRETKEY;
    const token = await jwt.sign({ id: user._id }, SECRETKEY);

    res.cookie("access_token", `Bearer ${token}`, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1024 * 300),
      httpOnly: true,
    });

    user.tokens.push(token);
    await user.save();

    res.status(200).send({ access_token: token, success: "Login is successful!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getMe = async (req, res) => {
  try {
    const id = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send(" ID is not correct!");
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send(" please SignUp ");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Server Error");
  }
};
//FOR ADMIN:
const getUser = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send(" ID is not correct!");
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send(" please SignUp ");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Server Error");
  }
};

const getAllUser = async (req, res) => {
  try {
    const allData = await User.find();
    res.status(200).send(allData);
  } catch (e) {
    res.status(500).send("Server Error");
  }
};

const editData = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("ID is not correct!!");
    }
    await User.findByIdAndUpdate(id, req.body, { new: true }).then(
      (newData) => {
        newData.save();
      }
    );
  } catch (e) {
    res.status(500).send("Server Error");
  }
};


const deleteOneData = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("ID is not correct!!");
    }
    const user = await User.findByIdAndDelete(id);
    res.status(200).send(" Delete user is success !! ");
  } catch (e) {
    res.status(500).send("Server Error");
  }
};
const deleteAllData = async (req, res) => {
  try {
    await User.deleteMany();

    res.status(200).send(" Delete All users is success ! ");
  } catch (e) {
    res.status(500).send("Server Error");
  }
};
const adminUser = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("ID is not correct!!");
    }
    await User.findByIdAndUpdate(id, { isAdmin: true }, { new: true });

    res.status(200).send(" admin success! ");
  } catch (e) {
    res.status(500).send("Server Error");
  }
};

const unAdminUser = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("ID is not correct!!");
    }
    await User.findByIdAndUpdate(id, { isAdmin: false }, { new: true });
    res.status(200).send(" user become UN-ADMIN ! ");
  } catch (e) {
    res.status(500).send("Server Error");
  }
};


const loginOut = async (req, res) => {
  try {
    
    req.user.tokens = [];
    
   
    await req.user.save();


    res.clearCookie("access_token", { sameSite: "none", secure: true })
       .status(200)
       .send("Logout is successful.");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const add_bouns=async(req,res)=>{
  
        try {
         const user_id=req.params.id
         const bonusAmount=req.body.bonus
         const date =req.body.date

            const user = await User.findById(user_id);
            if (!user) {
             return res.status(404).send('not found');

            }
    
           
            const hours = bonusAmount * 5;
    
            
            user.rewards.push({
                NO_bouns: bonusAmount,
                NO_hours: `${hours} hours`,
                date: date 
            });
    
        
            await user.save();
    
            res.status(200).send(`Bonus added successfully to user ${user.FirstName}`);
        } catch (error) {
          res.status(500).send(error.message);
        }
    }
    

    const edit_bonus = async (req, res) => {
      try {
          const user_id = req.params.id;
          const award_id = req.params.award_id;
          const newBonusAmount = req.body.bonus;
          const date =req.body.date
  
          const user = await User.findById(user_id);
          if (!user) {
              return res.status(404).send('User not found');
          }
  
         
          const bonus = user.rewards.find(reward => reward._id.toString() === award_id);
          if (!bonus) {
              return res.status(404).send('Bonus not found');
          }
  
          const hours = newBonusAmount * 5;
  
     
          bonus.NO_bouns = newBonusAmount;
          bonus.NO_hours = `${hours} hours`;
          bonus.date = date
  
          await user.save();
          res.status(200).send(`Bonus updated successfully for user ${user.FirstName}`);
      } catch (error) {
          res.status(500).send(error.message);
      }
  };
  

  const delete_bonus = async (req, res) => {
    try {
        const user_id = req.params.id;
        const award_id = req.params.award_id;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        
        const bonusIndex = user.rewards.findIndex(reward => reward._id.toString() === award_id);
        if (bonusIndex === -1) {
            return res.status(404).send('Bonus not found');
        }

     
        user.rewards.splice(bonusIndex, 1);

        await user.save();
        res.status(200).send(`Bonus deleted successfully for user ${user.FirstName}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const changePassword=async(req,res)=>{
  const phone = req.body.phone
  const data = await User.findOne({phone:phone})
 
  if(!data){
      return res.status(404).send('user not found!!')
  }
  const NewPassword = req.body.new_password
  data.password = NewPassword
  data.save()
  res.status(200).send('PASSWORD is changed !!')
}



module.exports = {
  Register,
  Login,
  getUser,
  getAllUser,
  editData,
  deleteOneData,
  deleteAllData,
  adminUser,
  unAdminUser,
  loginOut,
  add_bouns,
  getMe,
  edit_bonus,
  delete_bonus,
  changePassword

};
