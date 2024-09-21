require('dotenv').config(); // should be at the very top!!!
// import OpenAI from 'openai';
const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });


const generateImageController = async (req, res) => {
    const { prompt, width, height, num_outputs} = req.body;

    const imageSize = `${width}x${height}`

    console.log('imageSize', imageSize)

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: num_outputs || 1,
            size: imageSize,
        });
        
        const imageUrl = response.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
    } catch (error) {
        if(error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error);
        }

        res.status(500).json({
            success: false,
            error: 'The image could not be generated.',
        });
    }
}

module.exports = { generateImageController }