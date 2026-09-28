const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "ავტორიზაცია აუცილებელია.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "ავტორიზაცია აუცილებელია.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      userId: decoded.userId,
      accountType: decoded.accountType,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "ავტორიზაციის სესია არასწორია ან ვადა გაუვიდა.",
    });
  }
};

module.exports = authMiddleware;