const { getUser } = require("../services/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = getUser(tokenCookie);
  req.user = token;
  return next();
};

const restrictTo = (role = []) => {
    console.log("in res");
  console.log("🚀 ~ restrictTo ~ role:", role)
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    if (!role.includes(req.user.role)) return res.end("unauthorize");

    return next();
  };
};

const verifyUser = (req, res, next) => {
  const userId = req.cookies?.uid;

  if (!userId) {
    return res.redirect("/login");
    return res.status(401).json({ error: "Unauthorized access" });
  }
  const user = getUser(userId);
  if (!user) {
    req.user = undefined; // Set req.user to undefined
    return res.redirect("/login"); // Redirects to login page
  }
  req.user = user;
  next();
};

const checkAuth = (req, res, next) => {
  const userId = req.cookies?.uid;
  const user = getUser(userId);
  req.user = user;
  next();
};
module.exports = { checkForAuthentication, restrictTo };
