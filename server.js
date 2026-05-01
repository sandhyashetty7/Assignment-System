const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(logger);

app.use('/assignments', require('./routes/assignmentRoutes'));
app.use('/submissions', require('./routes/submissionRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});