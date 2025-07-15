const authMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.session.userId && req.session.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

export { authMiddleware, adminMiddleware };