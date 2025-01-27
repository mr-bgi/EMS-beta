const { query } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validator, register, login, changePass, updateEmp } = require('../validation/auth');
const fs = require('fs');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '3d' });
}

exports.createUser = async (req, res) => {
    try {



        const { first_name, last_name, email, role, password, gender, dob, phone, address, department_id, position_id, hire_date, base_salary } = req.body;

        // Validate input
        const { error } = validator(register)(req.body);
        if (error) return res.status(400).json({ message: 'Validation failed', details: error.message });
        let sampleFileName = 'default.png';
        if (req.files && req.files.avatar) {
            let sampleFile = req.files.avatar;
            sampleFileName = Date.now() + sampleFile.name;
            let uploadPath = './public/upload/' + sampleFileName;

            await new Promise((resolve, reject) => {
                sampleFile.mv(uploadPath, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        }
        // Check if email already exists
        const userExists = await query('SELECT * FROM user WHERE email = ?', [email]);
        if (userExists.length > 0) return res.status(400).json({ message: 'Email already exists' })

        const phoneExist = await query('SELECT * FROM employees WHERE phone = ?', [phone]);
        if (phoneExist.length > 0) return res.status(400).json({ message: 'Phone already exists' });



        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserSQL = "INSERT INTO `user` (`first_name`, `last_name`, `email`, `role`, `avatar`, `password`) VALUES (?, ?, ?, ?, ?, ?)";
        //* user query
        const userQuery = await query(insertUserSQL, [first_name, last_name, email, role, sampleFileName, hashedPassword]);


        const insertId = userQuery.insertId;

        // Handle CV file
        let sampleFileNameCv = 'default.pdf';
        if (req.files && req.files.cv_pdf) {
            let sampleFileCV = req.files.cv_pdf;
            sampleFileNameCv = Date.now() + sampleFileCV.name;
            let cvUploadPath = './storage/documents/cv/' + sampleFileNameCv;

            await new Promise((resolve, reject) => {
                sampleFileCV.mv(cvUploadPath, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        }

        //  * Insert employee data
        const insertEmployeeSQL = "INSERT INTO `employees` (`user_id`, `gender`, `dob`, `phone`, `address`, `department_id`, `position_id`, `hire_date`, `cv_filename`, `base_salary`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const arrEmploye = [insertId, gender, dob, phone, address, department_id, position_id, hire_date, sampleFileNameCv, base_salary];
        await query(insertEmployeeSQL, arrEmploye);
        res.status(201).json({
            result: true,
            message: 'User and employee registered successfully',
            data: []
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}





// *  getUser 
exports.getUser = async (req, res) => {
    try {
        const getAll = await query('select * from user');
        res.status(200).json({
            result: true,
            message: "Get all user successfully",
            data: getAll
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error get data',
            error: error.message
        });
    }
}
// * loginPost
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error, value } = validator(login)(req.body);
        if (error) {
            return res.status(400).json({
                message: 'All fields are required!',
                details: error.message
            });
        }

        const checkEmail = await query("select * from user where email = ?", [email]);
        if (checkEmail.length === 0) {
            return res.status(400).json({
                message: 'Invalid email!'
            });
        }
        let decryptPassword = await bcrypt.compare(password, checkEmail[0].password);
        if (decryptPassword) {
            const token = generateToken(checkEmail[0].id);
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
        };

    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            error: error.message
        });
    }
}

exports.updatepass = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const { error, value } = validator(changePass)(req.body);
        if (error) {
            return res.status(400).json({
                message: 'All fields are required!',
                details: error.message
            });
        }
        const user = await query('select * from user where id = ?', [userId]);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const isValidPassword = await bcrypt.compare(oldPassword, user[0].password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Invalid old password'
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const sql = "update user set password = ? where id = ?";
        const myArr = [hashedPassword, userId];

        await query(sql, myArr);

        res.status(200).json({
            result: true,
            message: "Password updated successfully"
        })
    } catch {
        res.status(500).json({ message: "Error updating password", error: error.message });
    }

}
// * get all employee
exports.getEmployee = async (req, res) => {
    try {
        const getAll = await query('select * from employees');
        res.status(200).json({
            result: true,
            message: "Get all employee successfully",
            data: getAll
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error get data',
            error: error.message
        });
    }
}
exports.updateAvarta = async (req,res)=>{
    try{
        let file = req.body.old_img;
        console.log(file);
        if (req.files && req.files.avarta && req.files.avarta.name !== 'default.png') {
            const sampleFile = req.files.avarta;
            const sampleFileName = Date.now() + sampleFile.name;

            const uploadPath = './public/upload/' + sampleFileName;
            console.log(`Uploading to: ${uploadPath}`);

            // Move file with proper error handling
            await new Promise((resolve, reject) => {
                sampleFile.mv(uploadPath, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });

            // Delete old file if it exists and is not the default image
            if (req.body.old_img && req.body.old_img !== 'default.png') {
                const oldFilePath = './public/upload/' + req.body.old_img;
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            file = sampleFileName; // Set the new file name
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
exports.updateEmployee = async (req, res) => {
    try {
        // Check for files
        let file = req.body.old_img;
        console.log(file);
        if (req.files && req.files.avarta && req.files.avarta.name !== 'default.png') {
            const sampleFile = req.files.avarta;
            const sampleFileName = Date.now() + sampleFile.name;

            const uploadPath = './public/upload/' + sampleFileName;
            console.log(`Uploading to: ${uploadPath}`);

            // Move file with proper error handling
            await new Promise((resolve, reject) => {
                sampleFile.mv(uploadPath, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });

            // Delete old file if it exists and is not the default image
            if (req.body.old_img && req.body.old_img !== 'default.png') {
                const oldFilePath = './public/upload/' + req.body.old_img;
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            file = sampleFileName; // Set the new file name
        }

        let fileCv = req.body.old_cv;
        if (req.files && req.files.newCv && req.files.newCv.name !== 'default.pdf') {
            const sampleFile = req.files.newCv;
            const sampleFileName = Date.now() + sampleFile.name;

            const uploadPath = './storage/documents/cv/' + sampleFileName;
            console.log(`Uploading to: ${uploadPath}`);

            // Move file with proper error handling
            await new Promise((resolve, reject) => {
                sampleFile.mv(uploadPath, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });

            // Delete old file if it exists and is not the default image
            if (req.body.old_cv && req.body.old_cv !== 'default.pdf') {
                const oldFilePath = './storage/documents/cv/' + req.body.old_cv;
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            fileCv = sampleFileName; // Set the new file name
        }

        const { employee_id, first_name, last_name, gender, dob, phone, address, department_id, position_id, hire_date, base_salary } = req.body;

        // Validate input (uncomment this if validation is required)
        const { error } = validator(updateEmp)(req.body);
        if (error) return res.status(400).json({ message: 'Validation failed', details: error.message });

        // Check if employee exists
        const userId = await query('SELECT * FROM employees WHERE id = ?', [employee_id]);
        if (!userId || userId.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // * Update employee
        const updateEmployeeSQL = `
            UPDATE employees
            SET gender = ?, dob = ?, phone = ?, address = ?, department_id = ?, position_id = ? ,hire_date =? ,cv_filename=? ,base_salary = ?
            WHERE id = ?`;
        const employeeParams = [gender, dob, phone, address, department_id, position_id, hire_date, fileCv, base_salary, employee_id];
        await query(updateEmployeeSQL, employeeParams);

        // * Update user
        const getId = userId[0].user_id;
        const updateUserSQL = `
            UPDATE user
            SET first_name = ?, last_name = ?, avatar = ?
            WHERE id = ?`;
        const userParams = [first_name, last_name, file, getId];
        await query(updateUserSQL, userParams);

        res.status(200).json({
            result: true,
            message: 'Employee updated successfully',
            data: [],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// * delete employee & user
exports.deleteEmp = async (req,res)=>{
    try {
        let deleteImg = req.params.avarta;
        console.log(deleteImg);
    } catch (error) {
        res.status(500).json({
            message: 'Error get data',
            error: error.message
        });
    }
}











