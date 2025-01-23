const jwt = require('jsonwebtoken');
const con = require('../config/db');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decodedToken) => {
            if (error) {
                return res.status(401).json({
                    message: 'Unauthorized access',
                    error: error.message
                });
            } else {
                console.log(decodedToken);
                req.user = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({
            message: "You need to login"
        });
    }
}
const authorize = (roles = []) => {
    return async function (req, res, next) {
        try {
            const userId = req.user.id;
            con.query("select  role from user where id = ?", [userId], (error, result) => {
                if (error) {
                    return res.status(500).json({
                        message: 'Database query error',
                        error: error.message
                    });
                }
                if (!result.length || !roles.includes(result[0].role)) {
                    return res.status(403).json({
                        message: "Access denied"
                    })
                }
                next();
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error.message
            });
        }

    }
}
const checkUser = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (token) {
        jwt.verify(token.process.env.JWT_SECRET_TOKEN, (error, decodedToken) => {
            if (error) {
                res.locals.user = null;
                return res.status(401).json({
                    message: 'Unauthorized access',
                    error: error.message
                });
            }
            if (!result.length) {
                res.locals.user = null;
                return res.status(401).json({
                    message: 'User not Found'
                });
            }
            res.locals.user = result;
            req.user = decodedToken;
            next();
        })
    }else{
        res.locals.user = null;
        next();
    }
};


module.exports = {
    requireAuth,
    authorize,
    checkUser
}
