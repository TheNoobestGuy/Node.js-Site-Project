const list = document.querySelector(".list");

fetch('/data')
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
})
.then(data => {
    let musicList = data.SongsList;

    for (let i = 0; i < musicList.length; i++)
    {
        list.innerHTML += `
            <li class="text">
                <div id="textdiv">Artist: ${musicList[i][0]},</div>
                <div id="textdiv">Track: ${musicList[i][1]}:</div>
                <br>
                <br>
                <div id="textdiv">Link: <a href="${musicList[i][2]}"> ${musicList[i][2]} </a></div>
                <br>
                <br>
                <br>
            </li>
        `;
    }
})
.catch(error => {
  console.error('Error:', error);
});