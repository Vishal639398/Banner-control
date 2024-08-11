const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());




mongoose.connect(process.env.MONGO_URL, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bannerSchema = new mongoose.Schema({
  description: String,
  timer: Number,
  link: String,
  is_visible: Boolean,
});

const Banner = mongoose.model('Banner', bannerSchema);


const initializeBanner = async () => {
  const banner = await Banner.findOne();
  if (!banner) {
    const newBanner = new Banner({
      description: 'Welcome to our website!',
      timer: 60,
      link: 'https://example.com',
      is_visible: true,
    });
    await newBanner.save();
  }
};

initializeBanner();

app.get('/api/banner', async (req, res) => {
  const banner = await Banner.findOne();
  res.json(banner);
});

app.post('/api/banner', async (req, res) => {
  const { description, timer, link, is_visible } = req.body;
  await Banner.updateOne({}, { description, timer, link, is_visible });
  res.send('Banner updated');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

