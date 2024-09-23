const authAdmin = (req, res, next) => {
  console.log("Admin authorization processing");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};
const authUser = (req, res, next) => {
  console.log("User authorization processing");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized User access");
  } else {
    next();
  }
};
module.exports = {
  authAdmin,
  authUser,
};
