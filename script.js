const input = document.querySelector(".search-box");
const album = document.querySelector(".album");
const artist = document.querySelector(".artist");
const playlist = document.querySelector(".playlist");
const track = document.querySelector(".track");
const cards = document.querySelector(".card-container");

const clientId = 'CLIENT_ID';
const clientSecret = 'CLIENT_SECRET';
const getToken = async() => {
    const data = await fetch('https://accounts.spotify.com/api/token', {
        "method": 'POST',
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Basic ' + btoa(clientId + ":" + clientSecret)
        },
        "body": 'grant_type=client_credentials'
    })
    const result = await data.json();
    console.log(result);
    return result.access_token;
}

const fetchMusicJSON = async({ p, type }) => {
    const token = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${p}&type=${type}`, {
        "method": "GET",
        "headers": {
            "Authorization": `Bearer ${token}`
        }
    })
    const music = await response.json();
    return music;
}

const renderArtistData = ({ artist, popularity, img, followers }) => {
    cards.innerHTML += `
    <div class="card">
    <img src="${img}" alt="Avatar">
    <div class="contain">
        <h4><b>${artist}</b></h4>
        <p>popularity: ${popularity}</p>
        <p>followers: ${followers}</p>
    </div>
</div>`

}

const renderAlbumData = ({ album, release_date, img, total_tracks }) => {
    cards.innerHTML += `
    <div class="card">
    <img src="${img}" alt="Avatar">
    <div class="contain">
        <h4><b>${album}</b></h4>
        <p>release_date: ${release_date}</p>
        <p>total_tracks: ${total_tracks}</p>
    </div>
</div>`

}

const renderPlaylistData = ({ playlist, description, img }) => {
    cards.innerHTML += `
    <div class="card">
    <img src="${img}" alt="Avatar">
    <div class="contain">
        <h4><b>${playlist}</b></h4>
        <p>description: ${description}</p>

    </div>
</div>`

}



album.addEventListener("click", async(event) => {
    event.preventDefault();
    const p = input.value;
    const type = album.value;

    const res = await fetchMusicJSON({ p, type });
    input.value = "";
    const data = res.albums.items;
    cards.innerHTML = "";
    data.forEach(element => {
        const album = element.name
        const release_date = element.release_date
        const img = element.images[0].url
        const total_tracks = element.total_tracks
        renderAlbumData({ album, release_date, img, total_tracks })

    });
});

artist.addEventListener("click", async(event) => {
    event.preventDefault();
    const p = input.value;
    const type = artist.value;
    const res = await fetchMusicJSON({ p, type });
    input.value = "";
    const data = res.artists.items;
    cards.innerHTML = "";
    data.forEach(element => {
        const artist = element.name
        const popularity = element.popularity
        const img = element.images[0].url
        const followers = element.followers.total
        renderArtistData({ artist, popularity, img, followers })

    });
});
playlist.addEventListener("click", async(event) => {
    event.preventDefault();
    const p = input.value;
    const type = playlist.value;
    const res = await fetchMusicJSON({ p, type });
    input.value = "";
    console.log(res);
    const data = res.playlists.items;
    cards.innerHTML = "";
    data.forEach(element => {
        const playlist = element.name
        const description = element.description
        const img = element.images[0].url
        renderPlaylistData({ playlist, description, img })

    });
});
// track.addEventListener("click", async(event) => {
//     event.preventDefault();
//     const p = input.value;
//     const type = track.value;
//     const res = await fetchMusicJSON({ p, type });
//     input.value = "";
//     console.log(res);
//     const data = res.tracks.items;
//     cards.innerHTML = "";
//     data.forEach(element => {
//         const track = element.name
//         const duration_ms = element.duration_ms
//         const url = element.external_urls.spotify
//         renderTrackData({ track, duration_ms, url })

//     });
// });