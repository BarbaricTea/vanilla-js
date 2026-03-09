const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
let authToken = null;

const getAuthToken = () => {
    if (authToken) {
        return;
    }
    fetch('https://accounts.spotify.com/api/token', {
        url: `https://accounts.spotify.com/api/token`,
        method: "POST",
        headers: {
            'Authorization': "Basic " + btoa(clientId + ":" + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "grant_type=client_credentials",
    }).then((response) => response.json()).then((data) => {
        authToken = data.access_token;
        console.log("Access token:", authToken);
    }).catch((error) => console.error(error));
};

getAuthToken();

const getAlbum = (id) => {
    if(!authToken) {
        console.error("Missing permissions");
    }
    fetch(`https://api.spotify.com/v1/albums/${id}`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    }).then((response) => response.json()).then((data) => {
        populateAlbum(data);
    }).catch((error) => console.error(error));
}

document.getElementById("search").addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.getElementById("album_id").value;
    getAlbum(id);
})

const populateAlbum = (album) => {
    const songList = document.getElementById("songlist");
    for(let i = 0; i < album.tracks.items.length; i++){
        const li = document.createElement("li");
        li.textContent = album.tracks.items[i].name;
        songList.appendChild(li);
    }
    document.getElementById('album_image').src = album.images[0].url;
    document.getElementById('album_name').textContent = "Album name: " + album.name;
    document.getElementById('artist_name').textContent = "Artist name: " + album.artists[0].name;
    document.getElementById('release_date').textContent = "Release date: " + album.release_date;
}


// if (!access_token) {
//     getToken();
// }

// const getToken = () => {
//   const access_token = localStorage.getItem("access_token");
//   if(access_token) {
//     console.log("Access token:", access_token);
//     return access_token;
//   }
//   const authOptions = {
//     url: `https://accounts.spotify.com/api/token`,
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   };

//   fetch(authOptions.url, authOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       localStorage.setItem("access_token", data.access_token);
//       console.log("Access token:", data);
//       return data.access_token;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// document.getElementById("btn_search").addEventListener("click", (e) => {
//     e.preventDefault();
//     const id = document.getElementById("album_id").value;
//     fetchAlbum(id);
// });

// const fetchAlbum = (id) => {
//      const access_token = localStorage.getItem("access_token");
//     fetch(`https://api.spotify.com/v1/albums/${id}`, {
//         method: "GET",
//         headers: {
//             Authorization: "Bearer " + access_token,
//         }
//     }).then((response) => response.json()).then((data) => {
//         console.log(data);
//         populateAlbum(data);
//         populateSongs(data.tracks.items);
//     }).catch((error) => { console.log(error)});
// }


// const populateSongs = (songs) => {
//     const container = document.querySelector(".songs");
//     const songCount = document.createElement("h4");
//     songCount.textContent = `Amount of songs: ${songs.length}`;
//     container.appendChild(songCount);
//     for(let i = 0; i<songs.length; i++) {
//         document.querySelector(".songs").innerHTML += `<div class="song">
//             <span>${i + 1}</span>
//             <p>${songs[i].name}</p>
//         </div>
//         `
//     }
// }

// const populateAlbum = (album) => {
//     // Album name 
//     // release date
//     // Artist name
//     // Image
//     document.getElementById("album_name").textContent += album.name;
//     document.getElementById("artist_name").textContent += album.artists[0].name;
//     document.getElementById("release_date").textContent += album.release_date;
//     document.getElementById("album_image").src += album.images[0].url;
// }
