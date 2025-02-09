const express = require('express');
const morgan = require('morgan');  
const cors = require('cors');  
const helmet = require('helmet');  
const cookieParser = require('cookie-parser');
const discritAdminRoutes = require('./routes/districtAdminRoutes');
const cityAdminRoutes = require('./routes/cityAdminRoutes');

const app = express();

// Middleware
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(cors());  
app.use(helmet());  
app.use(cookieParser());  
app.use(morgan('dev'));  

// Routes
app.use('/api/dadmin', discritAdminRoutes);  
app.use('/api/cadmin', cityAdminRoutes);   


 app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
  });
});

module.exports = app;
