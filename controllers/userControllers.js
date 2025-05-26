import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from "dotenv"

dotenv.config()//find env file and connect

// Get users
export function getUsers(req, res) {
    User.find().then(usersList => {
        res.json({
            list: usersList
        });
    });
}

// Register user
export function postUsers(req, res) {
    const user = req.body;
    const plainPassword = req.body.password;

    // Correct way to hash the password
    const passwordHash = bcrypt.hashSync(plainPassword, 10); // 10 salt rounds

    user.password = passwordHash;

    const newUser = new User(user);

    newUser.save().then(() => {
        res.json({
            message: "User created successfully"
        });
    }).catch(() => {
        res.json({
            message: "User creation failed"
        });
    });
}

// Login user
export function loginUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email: email }).then(user => {
        if (user == null) {
            res.status(404).json({
                message: "User not found"
            });
        } else {
            // Compare password using bcrypt
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                res.status(401).json({
                    message: "Invalid password"
                });
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                };

                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });

                res.json({
                    message: "User found",
                    user: user,
                    token: token
                });
            }
        }
    });
}

  export function isAdminValid(req){
        if(req.user==null){
            return false
        }
        if(req.user.type !="admin"){
            return false
        }
        return true;
    }