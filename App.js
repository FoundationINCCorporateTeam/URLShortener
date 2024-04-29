const express = require('express');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// In-memory storage for short URLs
const urlMap = new Map();

// Shorten URL endpoint
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortCode = nanoid(7); // Generate short code using nanoid
    urlMap.set(shortCode, longUrl);
    res.json({ shortUrl: `http://localhost:${PORT}/${shortCode}` }); // Adjust URL for production
});

// Retrieve URL endpoint
app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    const longUrl = urlMap.get(shortCode);
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
