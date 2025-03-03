import User from "../models/User.js"; // Fix import
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const register = async (req, res) => {
  try {
  
    let { name, email, password, role } = req.body;
    console.log();
    console.log("Received Data:", { name, email, password, role });
    
    const existingUser = await User.findOne({ email }); // Fix method call
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    role = role || "user";
    const hashedPassword = await hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Fix method call

    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { register, login };