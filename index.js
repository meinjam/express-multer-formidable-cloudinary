const express = require('express');
const cors = require('cors');

const imageRoutes = require('./routes/imageRoute');
const { initializeCloudinary } = require('./config/cloudinary');

const app = express();

app.use(express.json());
app.use(cors());

initializeCloudinary();

app.get('/', (req, res) => {
  res.json({ start: 'Here' });
});

app.use('/api/image', imageRoutes);

app.listen(7500, () => {
  console.log(`Server listening on http://localhost:${7500}`);
});
