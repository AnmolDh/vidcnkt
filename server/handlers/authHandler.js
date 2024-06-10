const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.json({ success: false, error: "invalid session" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.json({ success: false, error: "invalid session" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
