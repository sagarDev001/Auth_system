// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './routes/auth';
// import passport from 'passport';
// import path from 'path';

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(require('cookie-parser')());
// app.use(passport.initialize());

// // Routes
// // app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);

// // Serve React frontend build
// const frontendPath = path.join(__dirname, '../frontend/dist');
// app.use(express.static(frontendPath));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendPath, 'index.html'));
// });

// // MongoDB Connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-system';

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server started on port ${process.env.PORT || 5000}`);
//     });
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }); 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Allow CORS from localhost and Render frontend domain
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend-app.onrender.com', // ✅ Replace with your actual frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Auth API routes
app.use('/api/auth', authRoutes);

// === Serve frontend build ===
// When running in production (Render), `dist/index.js` will run from `backend/dist`
// So we need to go up 2 levels to access frontend/dist
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// === MongoDB connection ===
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-system';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
