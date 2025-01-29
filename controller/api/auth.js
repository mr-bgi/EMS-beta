const { createUser, getUser, login, updatepass, updateEmployee, getEmployee, deleteEmp } = require("../../resource/user");


exports.registerPost = async (req, res) => {
    try {
        await createUser(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.getUser = async (req, res) => {
    try {
        await getUser(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.loginPost = async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        await updatepass(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.logout = (req, res) => {
    res.cookie('jwtToken', '', { maxAge: 1, httpOnly: true });
    res.status(200).json({
        message: "Logout successfully!"
    });
}

exports.updateEmp = async (req, res) => {
    try {
        await updateEmployee(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getAllEmp = async(req,res)=>{
    try {
        await getEmployee(req,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.deleteEmloyee = async(req,res)=>{
    try {
        await deleteEmp(req,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
}
