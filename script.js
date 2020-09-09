function getInputText(){
    return document.getElementById("suggest").value;
}
const apiURL = 'https://api.lyrics.ovh';
const searchBtn = document.getElementById("search");
const result = document.getElementById("result");

searchBtn.addEventListener("click", function(){
    let suggestText = getInputText();
    searchSong(suggestText);
    

})


async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();
    showData(data)
}


function showData(data){
  
    result.innerHTML = `
    <ul style="list-style-type:none;">
      ${data.data
        .map(song=> `<li>
                    <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" data-artist="${song.artist.name}" data-songTitle="${song.title}" >Get Lyrics</button>
                    </div>
                    </div>
                    </li>`
        )
        .join('')}
    </ul>
  `;
}

result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'BUTTON'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');
        
        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<div class="single-lyrics text-center">
    <h2 class="text-success mb-4">${songTitle}</h2>
    <pre class="lyric text-white">
    ${lyrics}
    </pre>
</div>`;
  
  }