const inputKeywords = document.getElementById("input-keywords");
const submitButton = document.getElementById("submit");
const musicContainer = document.querySelector(".music_container");

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
    musicContainer.innerHTML = `
        <div class="music-card">
        <div class="col">
            <div>
                <img src=${results.tracks.hits[0].track.images.coverart} alt="" class="song-img" id="song-img">
                <h4 id="title">${results.tracks.hits[0].track.title}</h4>
                <a herf=${results.tracks.hits[0].track.url} id="url">${results.tracks.hits[0].track.url}</a>
            </div>
            <hr>
            <div>
                <img src=${results.tracks.hits[0].track.images.background} alt="" class="artist-img" id="artist-img">
                <p id="artist-text">${results.tracks.hits[0].track.subtitle}</p>
            </div>
        </div>
        </div>
    `;
}

/*
fetch('http://localhost:3000/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));*/