const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth middleware - Authorization header exists:', !!authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth failed: No valid authorization header');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('Auth failed: Token not extracted from header');
      return res.status(401).json({ message: 'No token provided' });
    }

    // Log partial token for debugging (don't log full token for security)
    const tokenPreview = token.substring(0, 20) + '...';
    console.log('Verifying token:', tokenPreview);
    console.log('JWT Secret exists:', !!process.env.JWT_SECRET);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verification successful');
      console.log('Decoded token:', decoded); // Debug log
      
      // Don't check for admin rights here - just verify the token
      // and set user data in the request object
      req.user = decoded;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError.name, jwtError.message);
      
      // Provide more specific error messages based on the error type
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Token expired', 
          error: 'Your session has expired. Please login again.'
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          message: 'Invalid token', 
          error: 'Authentication failed. Please login again.'
        });
      }
      
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
}; 