const inputKeywords = document.getElementById("input-keywords");
const submitButton = document.getElementById("submit");
const musicContainer = document.querySelector(".music_container");
const heart = document.querySelector(".heart");
var running = false;

// DataBase features
let addedSong = false;
let removedSong = false;
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
    artist = `${results.tracks.hits[0].track.subtitle}`;
    title = `${results.tracks.hits[0].track.title}`;
    url = `${results.tracks.hits[0].track.url}`;

    musicContainer.innerHTML = "";
    musicContainer.innerHTML = `
        <div class="music-card">
            <div>
                <div>
                    <img src=${results.tracks.hits[0].track.images.coverart} alt="" class="song-img" id="song-img">
                    <h4 id="title">${title}</h4>
                    <a href=${url}'>${url}</a>
                </div>
                <br>
                <hr>
                <br>
                <div>
                    <img src=${results.tracks.hits[0].track.images.background} alt="" class="artist-img" id="artist-img">
                    <p id="artist-text">${artist}</p>
                </div>
            </div>
        </div>
    `;

    if (musicContainer)
    {
        heart.style.display = "block";
        heart.style.color = "black";

        fetch('/data')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
            let musicList = data.SongsList;
            let onList = false;
    
            for (let i = 0; i < musicList.length; i++)
            {
                if (url == musicList[i][2])
                {
                    onList = true;
                }
            }

            if (onList)
            {
                heart.style.color = "red";   
            }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    if (!running) {
        heart.addEventListener('click', () => {
            if (heart.style.color == "red") {
                heart.style.color = "black";
                removedSong = true;
            }
            else {
                heart.style.color = "red";
                addedSong = true;
            }

            if (addedSong)
            {
                let song = [artist, title, url];

                fetch('http://localhost:3000/addSong', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ data: song })
                })
                  .catch(error => {
                    console.error(error);
                });

                addedSong = false;
            }
            else if (removedSong)
            {
                fetch('http://localhost:3000/removeSong', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ data: artist })
                })
                  .catch(error => {
                    console.error(error);
                });

                removedSong = false;
            }
        })
    }

    running = true;
}