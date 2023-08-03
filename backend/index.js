const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const cors=require("cors");
const app = express();
app.use(cors())
app.use(express.json());
const port = process.env.port || 3000; // Choose a port number for your server
// Set up the OpenAI API client
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Middleware to parse JSON requests
app.get('/',(req, res) => {
    res.send("Welcome to Quote ChatBot")
})
// API endpoint for generating Shayari
app.get('/generate-quote', async (req, res) => {
    const user_input = `Write a quote about ${req.query.keyword}.`;
    console.log(user_input);
        const messages = [];
  
    
        messages.push({ role: "user", content: user_input });

    try {

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text);



        res.json({ quote :completion_text});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while generating quote.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});