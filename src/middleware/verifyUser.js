const { verifyToken } = require("../services/auth");
const { detailUserServives } = require("../services/user");

const verifyUser = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const authHeader = req.headers.authorization;
    const beareeToken = authHeader.split(" ");
    const token = beareeToken[1];
    const user = verifyToken(token, process.env.ACCESS_TOKEN);
    req.userId = user.userId;
    req.user = user;
    next();
  } catch (error) {
    res.json({status : 'Error', message : error.message});
  }
};


const onlyAdmin = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await detailUserServives(id);
        if(user.role !== 'admin') {
            return res.json({status : 'Faild', message : 'Access not allowed'});
        }
        next()
    } catch (error) {
        res.json({status : 'Error', message : error.message});
    }
};

const findUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await detailUserServives(id);

    if(!user) {
      return res.json({status : "Faild", message : "User not found"})
    }
    req.user = user;
    next()
  } catch (error) {
    res.json({status : "Error", message : error.message})
  }
}


module.exports = {verifyUser, onlyAdmin, findUserById}
