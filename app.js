const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Paths
const IndexPath = path.join(__dirname, '\\src\\', '\\Index\\');
const HomePath = path.join(__dirname, '\\src\\', '\\Home\\');
const AboutPath = path.join(__dirname, '\\src\\', '\\About\\');
const RegistrationPath = path.join(__dirname, '\\src\\', '\\Registration\\');
const LoginPath = path.join(__dirname, '\\src\\', '\\LogIn\\');

// Serve static files from the "public" directory
app.use(express.static(IndexPath));
app.use(express.static(HomePath));
app.use(express.static(AboutPath));
app.use(express.static(RegistrationPath));
app.use(express.static(LoginPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(IndexPath, 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(HomePath, 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(AboutPath, 'about.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(RegistrationPath, 'registration.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(LoginPath, 'login.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});