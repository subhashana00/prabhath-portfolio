import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export function createServer() {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: process.env.NODE_ENV === 'production' 
          ? ["'self'"] 
          : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ["'self'", "https://api.emailjs.com", "ws:", "wss:"], // Add WebSocket support for HMR and EmailJS
        frameSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: "Too many requests from this IP, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });



  // Apply rate limiting to API routes
  app.use('/api/', limiter);

  // CORS configuration
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL || 'https://yourdomain.com'] 
      : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  

  
  app.use(express.json({ limit: '10mb' })); // Limit request size
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Security headers for API responses
  app.use((req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });



  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    res.status(err.status || 500).json({
      error: isDevelopment ? err.message : 'Internal server error',
      ...(isDevelopment && { stack: err.stack })
    });
  });

  return app;
}
