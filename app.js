const URL = "https://api.github.com/users/";

const form   = document.getElementById("form");
const search = document.getElementById("search");
const profile = document.getElementById("profile");
const repos = document.getElementById("repos");



async function getGithub(user){
    const response = await fetch (URL + user);
    const data = await response.json();

    showUser(data);
}

async function getRepos(user){
    const response = await fetch(URL + user + "/repos");
    const data = await response.json();

    showRepos(data);
}

function showRepos(user){
    repos.innerHTML = "";

    user.map((rep)=>{
        
        const repo = document.createElement("div");
        repo.classList.add("repo");
        repo.innerHTML = `
            <h2>${rep.name}</h2>
        `;

        repos.appendChild(repo);

    })

}

function showUser(user){

    profile.innerHTML = "";
    const card = document.createElement("div");
    

    card.innerHTML = `
    <div class="profile-body" >
        
        <img src="${user.avatar_url}" alt="avatar">
        <h2>${user.name}</h2>
        <h3>${user.location}</h3>
    </div>
    <div class="profile-footer">
        <h4>${user.bio}</h4>
        <div class="tracker">
            <h3>followers <span> ${user.followers} </span></h3>
            <h3>following <span> ${user.following} </span></h3>
            <h3>repos <span> ${user.public_repos} </span></h3>
        </div>
    </div>
    `;
    profile.appendChild(card);

}


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const user = search.value;

    if(user){
        
        getGithub(user);
        getRepos(user);

        search.value = "";
    }
})