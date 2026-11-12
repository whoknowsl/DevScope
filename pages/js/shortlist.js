const shortList = document.querySelector(".short-list");
console.log(shortList);
let favoritUsers = [];
async function fetchFavoUsers() {
  try {
    const response = await fetch(
      "https://6af5823bf6270fa08d6827a5.mockapi.io/devscope/shortlist/user",
    );
    console.log(response);
    if (!response.ok) {
      console.log(response.status);
    }
    const res = await response.json();
    favoritUsers.push(...res);
    displayFavorUsers(favoritUsers);
  } catch (erreur) {
    console.log(erreur);
  }
}

function displayFavorUsers(users) {
  shortList.innerHTML = "";
  users.forEach((user) => {
    shortList.innerHTML += `<div class ="flex bg-[#161b22] justify-between px-3 py-4 border-1 rounded-l">
  <div class="flex gap-4">
  <div class=""flex justify-between>
  <img class="w-30 rounded-full" src = "${user.avatar_url}"/>
  <div>
  <h1>${user.login}</h1>
  <p>@${user.name}</p>
  <span>Java</span>
  <p>${user.bio}</p>
  <p>Ajoute le ${user.created_at}<p>
  </div></div>
  <div class="flex gap-4">
  <span>stars</span>
  <button>Refuse</button>
  <button>Modifier</button>
  <button>Supprimer</button>
  </div>
  </div>
  </div>`;
  });
}
fetchFavoUsers();
console.log(favoritUsers);
