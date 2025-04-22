const  User  = require('../module/User');
const Jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = await Jwt.verify(token, process.env.JWT_SECRET || "secret1234");
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err });
    }
};


const authAndAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET || "secret1234");
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isAdmin) {
            req.user = user;
            return next();
        }

        res.status(403).json({ message: 'Access denied: Admins only' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err });
    }
};


const authAndTrader = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET || "secret1234");
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isTrader) {
            req.user = user;
            return next();
        }

        res.status(403).json({ message: 'Access denied: Traders only' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err });
    }
};
const adminAndTrader = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET || "secret1234");
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isTrader ||user.isAdmin) {
            req.user = user;
            return next();
        }

        res.status(403).json({ message: 'Access denied: Traders only' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err });
    }
};
const adminAndUser = async (req, res, next) => {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const decoded = Jwt.verify(token, process.env.JWT_SECRET || "secret1234");
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      if (user.isAdmin) {
        req.user = user;
        return next();
      }
  
      
      if (req.params.id && decoded.id === req.params.id) {
        req.user = user;
        return next();
      }
  
      res.status(403).json({ message: 'Access denied' });
    } catch (err) {
      res.status(401).json({ message: 'Invalid token', error: err });
    }
  };
  
module.exports = {
    auth,
    authAndAdmin,
    authAndTrader,
    adminAndUser,
    adminAndTrader
};
