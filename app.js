// Alternative of .then
// const searchText =async () => {
//     const input = document.getElementById('input').value;
//     const url = `https://api.lyrics.ovh/suggest/:${input}`;
//     const res =await fetch(url);
//         const data = await  res.json();
//         showSongs(data.data)
// }

const searchText = () => {
    const input = document.getElementById('input').value;
    const url = `https://api.lyrics.ovh/suggest/:${input}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSongs(data.data))

        .catch(error => displayError('Something went wrong , please try again later'));

}

const showSongs = songs => {
    const songContainer = document.getElementById('songContainer');
    songContainer.innerText = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';

        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
        <source src="${song.preview}" type="audio/ogg">
        
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`;
        songContainer.appendChild(songDiv);
        // console.log(song.preview);

    });

}
/* async and await */
const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);

    } catch (error) {
        displayError('Something is wrong');
    }
}
/* alternative of  async and wait 
const getLyrics= (artist,title) =>{
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;

   fetch(url)
   .then(res => res.json())
   .then(data => displayLyrics(data.lyrics))
}
*/
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('singleLyrics');
    lyricsDiv.innerText = lyrics;
}
// function for error message
const displayError = error => {
    const errorTag = document.getElementById('errorMessage');
    errorTag.innerText = error;
}