import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/auth.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import contactRoutes from './routes/contact.routes.js';
import trainerRoutes from './routes/trainer.routes.js';
import membershipRoutes from './routes/membership.routes.js';
import healthRoutes from './routes/health.routes.js';
import aiRoutes from './routes/ai.routes.js';

import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

const app = express();

// 1. Request ID Tracing Middleware (UUID)
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// 2. Logging Setup (Morgan with Request IDs)
morgan.token('id', (req) => req.id);
const logFormat = ':id :remote-addr :method :url :status :response-time ms - :res[content-length]';
app.use(morgan(logFormat));

// 3. Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://matrix-fitness-source.vercel.app'
      ];
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback to allow connection during user review
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    credentials: true
  })
);

// 4. Request Limiters and Parsers
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    errors: []
  }
});
app.use('/api', limiter);

// Size limits configuration
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 5. Compression
app.use(compression());

// 6. Base Routes
// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MATRIX Backend Running'
  });
});

// Standard root level health check
app.get('/health', (req, res, next) => {
  // Delegate to health controller logic directly
  import('./controllers/health.controller.js').then((module) => {
    module.default.checkHealth(req, res, next);
  });
});

// 7. Swagger Documentation Specs
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'MATRIX Fitness API',
    description: 'API Documentation for the premium MATRIX Gym website backend',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:5050/api/v1',
      description: 'Local Development Server'
    }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Get backend system health status',
        responses: {
          200: {
            description: 'Health information returned successfully'
          }
        }
      }
    },
    '/auth/google': {
      post: {
        summary: 'Verify Google Sign-In with Firebase and issue JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  idToken: {
                    type: 'string',
                    description: 'Firebase OAuth ID Token'
                  }
                },
                required: ['idToken']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Authentication success'
          }
        }
      }
    },
    '/auth/profile': {
      get: {
        summary: 'Get logged in user profile (Protected)',
        security: [
          {
            BearerAuth: []
          }
        ],
        responses: {
          200: {
            description: 'Profile information'
          }
        }
      }
    },
    '/register': {
      post: {
        summary: 'Register for classes/membership (Logged to Sheets)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  membership: { type: 'string', enum: ['Starter', 'Pro', 'Elite'] },
                  preferredTime: { type: 'string', enum: ['Morning', 'Afternoon', 'Evening'] }
                },
                required: ['name', 'email', 'phone', 'membership', 'preferredTime']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Enrollment success'
          }
        }
      }
    },
    '/contact': {
      post: {
        summary: 'Submit customer contact form inquiry (Logged to Sheets)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  subject: { type: 'string' },
                  message: { type: 'string' }
                },
                required: ['name', 'email', 'subject', 'message']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Contact submission success'
          }
        }
      }
    },
    '/memberships': {
      get: {
        summary: 'Get details on Starter, Pro, and Elite packages',
        responses: {
          200: {
            description: 'Plans returned'
          }
        }
      }
    },
    '/trainers': {
      get: {
        summary: 'Retrieve team list of elite gym coaches',
        responses: {
          200: {
            description: 'Trainers list'
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 8. Versioned API Router Mounts
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/register', registrationRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/trainers', trainerRoutes);
app.use('/api/v1/memberships', membershipRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/ai', aiRoutes);

// 9. Error and Route Fallbacks
app.use(notFound);
app.use(errorHandler);

export default app;
