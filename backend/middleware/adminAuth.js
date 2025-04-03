const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Admin auth check - Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Admin auth failed: No valid authorization header');
      return res.status(401).json({ 
        message: 'No token provided',
        error: 'Authentication required. Please provide a valid token.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('Admin auth failed: Token not extracted from header');
      return res.status(401).json({ 
        message: 'No token provided',
        error: 'Authentication required. Please provide a valid token.'
      });
    }

    // Log partial token for debugging (don't log full token for security)
    const tokenPreview = token.substring(0, 20) + '...';
    console.log('Verifying admin token:', tokenPreview);
    console.log('JWT Secret exists:', !!process.env.JWT_SECRET);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Admin token verification successful');
      console.log('Decoded admin token:', decoded); // Debug log
      
      // Check for admin rights
      if (!decoded.isAdmin && decoded.role !== 'admin') {
        console.log('Admin auth failed: User is not an admin', decoded);
        return res.status(403).json({ 
          message: 'Access denied. Admin only.',
          error: 'You do not have admin privileges to access this resource.'
        });
      }

      // Admin authenticated successfully
      console.log('Admin authenticated successfully:', decoded.email || decoded.userId);
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
      } else if (jwtError.name === 'NotBeforeError') {
        return res.status(401).json({ 
          message: 'Token not active', 
          error: 'This token is not yet active. Please try again later.'
        });
      }
      
      return res.status(401).json({ 
        message: 'Invalid token',
        error: 'Authentication failed. Please login again.'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      message: 'Authentication failed',
      error: error.message
    });
  }
}; 