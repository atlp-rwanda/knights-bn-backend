import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from 'dotenv';
import models from '../db/models';

environment.config();

export default class usersController {

  static async registerUser(req, res) {
    try{
    const {
      firstName, lastName, gender, passportNumber, email, password,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await models.User.create({
      firstName, 
      lastName, 
      gender, 
      email, 
      password: hashedPassword, 
      passport: passportNumber,
    });
   const token = jwt.sign({
     userId: newUser.id, 
     email: newUser.email, 
     firstName, lastName,
    }, process.env.SECRETKEY);
    res.status(201).json({ message: 'user successfully created', token });
    }catch (error) {
    return res.status(409).json({
      status: 409,
      error: 'user already exits. Please try again with a different email or passportNumber address',
    });
    }
  }
  
    
  static async login(request, response) {
    const { email, password } = request;
    const existUser = await models.User.findOne({ where: { email } });
    if (existUser === null) return response.status(404).json({ status: 404, 
    message: 'Seems you do not have an account! Create it now' });

    const passwordMatch = await bcrypt.compare(password, existUser.password);
    if (!passwordMatch) return response.status(400).json({ status: 400, 
    message: 'Invalid credentials' });

    const token = jwt.sign({
      userId: existUser.id,
      email: existUser.email,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
    }, process.env.SECRETKEY);

    return response.status(200).json({ status: 200, 
      message: 'Successfully login', token });
  }
}
















