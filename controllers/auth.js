import User from '../models/User.js';
import { generateToken } from '../utils/genToken.js';


//register a new user
export const register = async (req, res, next) => {

  let { name, email, password, role } = req.body;

  try {

    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id);

    res.status(201).json({token});

  } catch (error) {

    console.error(error);
    next(error);
  }
}

// LOGIN
export const login = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase()
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('login info', user)

    const token = generateToken(user._id);

    res.json({ token });

  } catch (err) {
    
    next(err);
  }
};