const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || null;
  /* check if a token was provided */
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No token provided'
    });
  }
  /* verify the refresh token - try & catch */
  try {
    const { id: userId } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    /* send userId in the request */
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token'
    });
  }
}

module.exports = {
  verifyToken,
}