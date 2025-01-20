const con = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validator, register, login } = require('../../validation/auth');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '3d' });
}

const registerPost = async (req, res) => {
    try {
        const { first_name, last_name, email, role, password, confirmPassword } = req.body;

        //* validation 
        const { error, value } = validator(register)(req.body);
        if (error) {
            return res.status(400).json({
                message: 'All fields are required!',
                details: error.message
            });
        }
        con.query('select * from user where email = ?', [email], async (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Database query error'
                });
            }
            if (result.length > 0) {
                return res.status(400).json({
                    message: 'Email already exists!'
                });
            }
            try {
                const mysql = "INSERT INTO `user`(`first_name`, `last_name`, `email`, `role`, `password`) VALUES (?,?,?,?,?)";
                const hashedPassword = await bcrypt.hash(password, 10);
                console.log(hashedPassword);
                con.query(mysql, [first_name, last_name, email, role, hashedPassword], (error, result) => {
                    if (error) {
                        return res.status(500).json({
                            message: 'Database query error'
                        });
                    }
                    res.status(200).json({
                        result: true,
                        message: 'User registered successfully!',
                        data: [],
                    })
                })
            } catch (hashError) {
                res.status(500).json({
                    message: 'Error hashing password'
                });
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error registering user'
        });
    }
}
const getUser = (req, res) => {
    try{
        con.query('select * from user',(error,result)=>{
            if (error) {
                return res.status(500).json({
                    message: 'Database query error'
                });
            }
            res.status(200).json({
                result:true,
                message:"Get all user successfully",
                data:result
            })
        })
    }catch(error){
        res.status(500).json({
            message: 'Error get data',
            error: error.message
        }); 
    }
}
const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error, value } = validator(login)(req.body);

        if (error) {
            return res.status(400).json({
                message: 'All fields are required!',
                details: error.message
            });
        }

        con.query("select * from user where email = ?", [email], async (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Database query error'
                });
            }
            if (result.length === 0) {
                return res.status(400).json({
                    message: 'Invalid email!'
                });
            }
            try {
                let decryptPassword = await bcrypt.compare(password, result[0].password);
                if (decryptPassword) {
                    const token = generateToken(result[0].id);
                    console.log(token);
                    res.cookie('jwtToken', token, {
                        maxAge: 3 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                    })
                    res.status(200).json({
                        result: true,
                        message: 'Login Successfully!'
                    })
                } else {
                    res.status(401).json({
                        message: 'Invalid password'
                    })
                }
            } catch (compareError) {
                return res.status(500).json({
                    message: 'Error comparing passwords',
                    error: compareError.message
                });
            }

        })
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            error: error.message
        });
    }
}

const logout = (req, res) => {
    res.cookie('jwtToken', '', { maxAge: 1, httpOnly: true });
    res.status(200).json({
        message: "Logout successfully!"
    });
}


module.exports = {
    registerPost,
    loginPost,
    logout,
    getUser
}