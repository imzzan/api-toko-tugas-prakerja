const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} = require("../services/auth.js");
const {
  register,
  getUsersServices,
  deleteUserServives,
  updateUserServices,
  loginServices,
} = require("../services/user.js");

const registerMember = async (req, res) => {
  try {
    const body = req.body;
    const response = await register(body, false);
    res.json({ status: "OK", message: "Success", data: response });
  } catch (error) {
    res.json({ status: "Faild", message: error.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const body = req.body;
    const response = await register(body, true);
    res.json({ status: "OK", message: "Success", data: response });
  } catch (error) {
    res.json({ status: "Faild", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await loginServices(req.body);
    const userId = user.id;
    const userEmail = user.email;
    const userPassword = user.password;
    const userRole = user.role;

    const acessToken = createAccessToken({
      userId,
      userEmail,
      userPassword,
      userRole,
    });
    const refreshToken = createRefreshToken({
      userId,
      userEmail,
      userPassword,
      userRole,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      max: 24 * 60 * 60 * 1000,
    });
    res.json({ status: "OK", message: "Success", data: user, acessToken });
  } catch (error) {
    res.json({ status: "Faild", message: error.message });
  }
};

const updateToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const user = verifyToken(token, process.env.REFRESH_TOKEN);
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    const accessToken = createAccessToken({ userId, name, email, role });
    res.json({ status: "OK", message: "Success", accessToken });
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await getUsersServices();
    res.json({ status: "OK", message: "Success", data: response });
  } catch (error) {
    res.json({ status: "Faild", message: error.message });
  }
};

const detailUsers = async (req, res) => {
  try {
    const response = req.user;
    res.json({ status: "OK", message: "Success", data: response });
  } catch (error) {
    res.json({ status: "Faild", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    const id = req.user.id;
    const [_, response] = await updateUserServices(body, id);
    res.json({ status: "OK", message: "Success", data: response });
  } catch (error) {
    res.json({ status: "Faild", message: error.message });
  }
};

const logOut = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ status: "Ok", message: "Logout Success" });
};

const deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await deleteUserServives(id);
    res.json({ status: "OK", message: "Success", data: response });
  } catch (error) {
    res.json({ status: "Faild", message: error.message });
  }
};

module.exports = {
  registerMember,
  registerAdmin,
  getAllUsers,
  detailUsers,
  deleteUser,
  updateUser,
  login,
  logOut,
  updateToken
};
