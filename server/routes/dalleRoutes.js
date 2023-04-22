import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from Dall-E');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const options = {
      method: 'POST',
      url: process.env.OPENAI_RAPID_API_URL,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.OPENAI_RAPID_API_KEY,
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
      },
      data: `{"prompt":"${prompt}","n":1,"size":"1024x1024","response_format":"b64_json"}`,
    };

    const aiResponse = await axios.request(options);

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

export default router;
