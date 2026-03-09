const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;
const BASE_URL = "https://api.github.com/users/";
const cachedUser = localStorage.getItem('githubUser')

const getUserData = (user) => {
  fetch(`${BASE_URL}${user}`, {
    method: "GET",
    headers: {
      Authorization: API_KEY,
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
  })
    .then((response) => response.json())
    .then((data) => {populateUserData(data), localStorage.setItem('githubUser', data)})
    .catch((error) => console.error(error));
};

document.getElementById("btn_search").addEventListener('click', (e) => {
    e.preventDefault();
    let id = document.getElementById('user_input').value;
    if(!id){
      return;
    }
    getUserData(id);
})

const populateUserData = (user) => {
  if(!user){
    return;
  }
  document.getElementById('name').innerText = user.name;
  document.getElementById('username').innerText = user.login + ' · she/her';
  document.getElementById('user_img').src = user.avatar_url;
  document.getElementById('bio').innerText = user.bio;
  document.getElementById('followers').innerText = user.followers;
  document.getElementById('following').innerText = user.following;
  document.getElementById('location').innerText = user.location;


  //Finally display

  document.getElementById('results').style.display = "block";
}

const onLoad = () => {
  if(cachedUser){
    console.log(cachedUser);
    populateUserData(cachedUser);
  }
}

onLoad();
