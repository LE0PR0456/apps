import User from "../models/user.model.js";
export const signup = async (req, res) => {
  // Registration logic here
  try {
    const { name, email, password } = req.body;
    const userfound = await User.findOne({ email: email });

    if (userfound) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  // Login logic here
  res.send("User logged in");
};
