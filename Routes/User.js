
import  express  from "express";
import bcryptjs from "bcryptjs";
import User from '../Module/Module.js'
import jwt from 'jsonwebtoken';


const userRouter = express.Router();

userRouter.post("/Signup",async (req, res) => {
    const { username ,email, password } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username ,email, password: hashpassword });
  
    try {
      await newUser.save();
      res.status(201).json("User Created Successfully");
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  }
  );


userRouter.post("/login", async (req, res) => {
const Token=process.env.JWT_SECRET;
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "User does not exist" });
      }

      console.log("User exists");

      const validPassword = await bcryptjs.compareSync(password, user.password);
      if (validPassword) {
        const accessToken = jwt.sign(user.toJSON(),Token);
        const isAdmin = user.isAdmin ? jwt.sign({ isAdmin: true }, Token) : null;
        return res.status(200).json({
              accessToken: accessToken,
              // refreshToken: refreshToken,
              // name: user.name,
              isAdmin: isAdmin ? isAdmin : '',
              username: user.username
          });
      } else {
          return res.status(400).json({ error: "Password does not match" });
      }
  } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Something went wrong", errorMessage: error.message });
  }
});

export default userRouter;