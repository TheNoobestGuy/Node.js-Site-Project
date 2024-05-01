// Express initialization
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Paths
const IndexPath = path.join(__dirname, '\\src\\', '\\Index\\');
const HomePath = path.join(__dirname, '\\src\\', '\\Home\\');
const AboutPath = path.join(__dirname, '\\src\\', '\\About\\');
const MusicListPath = path.join(__dirname, '\\src\\', '\\MusicList\\');

// Serve static files from the "public" directory
app.use(express.static(IndexPath));
app.use(express.static(HomePath));
app.use(express.static(AboutPath));
app.use(express.static(MusicListPath));
app.use(express.static(__dirname));

// Sites
app.get('/', (req, res) => {
    res.sendFile(path.join(IndexPath, 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(HomePath, 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(AboutPath, 'about.html'));
});

app.get('/musicList', (req, res) => {
    res.sendFile(path.join(MusicListPath, 'musicList.html'));
});

// Listener
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});