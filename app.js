// Express initialization
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Define a global array
const data = {
    SongsList: [],
    RegisteredUsers: [],
    Logged: []
};

// Middleware to parse JSON and share the array
app.use(express.json());
app.use((req, res, next) => {
  req.data = data;
  next();
});

// Routes to add and remove data
app.post('/addSong', (req, res) => {
    let notSame = true;

    for (let i = 0; i < data.SongsList.length; i++)
    {
        if (req.body.data[2] == data.SongsList[i][2])
        {
            notSame = false;
        }
    }

    if (notSame)
    {
        data.SongsList.push(req.body.data);
    }
});

app.post('/removeSong', (req, res) => {
    for (let i = 0; i < data.SongsList.length; i++)
    {
        if (req.body.data == data.SongsList[i][0])
        {
            data.SongsList.splice(i, 1);
            break;
        }
    }
});

app.post('/register', (req, res) => {
    let notSame = true;

    for (let i = 0; i < data.RegisteredUsers.length; i++)
    {
        if (req.body.data[0] == data.RegisteredUsers[i][0])
        {
            notSame = false;
        }
    }

    if (notSame)
    {
        data.RegisteredUsers.push(req.body.data);
    }
});

app.post('/logIn', (req, res) => {
    data.Logged[0] = (req.body.data);
});

// Route to retrieve the shared array
app.get('/data', (req, res) => {
  res.send(data);
});

// Paths
const IndexPath = path.join(__dirname, '\\src\\', '\\Index\\');
const HomePath = path.join(__dirname, '\\src\\', '\\Home\\');
const AboutPath = path.join(__dirname, '\\src\\', '\\About\\');
const MusicListPath = path.join(__dirname, '\\src\\', '\\MusicList\\');
const yourListPath = path.join(__dirname, '\\src\\', '\\YourList\\');
const dataBasesPath = path.join(__dirname, '\\src\\', '\\DataBases\\');

// Serve static files from the "public" directory
app.use(express.static(IndexPath));
app.use(express.static(HomePath));
app.use(express.static(AboutPath));
app.use(express.static(MusicListPath));
app.use(express.static(yourListPath));
app.use(express.static(dataBasesPath));

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

app.get('/yourList', (req, res) => {
    res.sendFile(path.join(yourListPath, 'yourlist.html'));
});

// Listener
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});