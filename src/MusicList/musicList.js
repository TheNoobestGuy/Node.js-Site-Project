const inputKeywords = document.getElementById("input-keywords");
const submitButton = document.getElementById("submit");
const musicContainer = document.querySelector(".music_container");
const heart = document.querySelector(".heart");
var running = false;

// DataBase features
let musicDataBase = [];
let addedSong = false;
let artist = "";
let title = "";
let url = "";

submitButton.addEventListener("click", () => {
    getSongData();
})

async function getSongData() {
    const url = `https://shazam.p.rapidapi.com/search?term=${inputKeywords.value}&locale=en-US&offset=0&limit=5`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "334122d940msh1680970b24ad64cp17dfffjsn49028b1abffd",
            "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
    };
    
    const response = await fetch(url, options);
    const results = await response.json();

    setSongDataDisplay(results);
}

function setSongDataDisplay(results) {
    musicContainer.innerHTML = "";
    musicContainer.innerHTML = `
        <div class="music-card">
            <div>
                <div>
                    <img src=${results.tracks.hits[0].track.images.coverart} alt="" class="song-img" id="song-img">
                    <h4 id="title">${results.tracks.hits[0].track.title}</h4>
                    <a href=${results.tracks.hits[0].track.url}'>${results.tracks.hits[0].track.url}</a>
                </div>
                <br>
                <hr>
                <br>
                <div>
                    <img src=${results.tracks.hits[0].track.images.background} alt="" class="artist-img" id="artist-img">
                    <p id="artist-text">${results.tracks.hits[0].track.subtitle}</p>
                </div>
            </div>
        </div>
    `;

    if (musicContainer)
    {
        heart.style.display = "block";
        heart.style.color = "black";
    }

    artist = `${results.tracks.hits[0].track.subtitle}`;
    title = `${results.tracks.hits[0].track.title}`;
    url = `${results.tracks.hits[0].track.url}`;

    if (!running) {
        heart.addEventListener('click', () => {
            if (heart.style.color == "red") {
                heart.style.color = "black";
            }
            else {
                heart.style.color = "red";
                addedSong = true;
            }

            if (addedSong)
            {
                let song = [artist, title, url];
                musicDataBase.push(song);
                addedSong = false;
                console.log(musicDataBase);
            }
        })
    }

    running = true;
}