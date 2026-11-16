import { MOCKAPI_URL } from "./config.js";
const shortList = document.querySelector(".short-list");

export const favoritUsers = [];

async function fetchFavoUsers() {
  try {
    const response = await fetch(MOCKAPI_URL);
    if (!response.ok) {
      console.log(response.status);
    }
    const res = await response.json();
    favoritUsers.push(...res);
    displayFavorUsers(favoritUsers);
  } catch (err) {
    console.log(err);
  }
}
function displayEmptyShortList() {
  shortList.innerHTML = "";
  shortList.innerHTML += `<div class=col items-center gap-3 rounded-md border bg-[#0d1117] px-6 py-16 text-center"flex flex-">
    <h2 class="text-xl font-semibold text-[#7d8590]">Votre shortlist est vide</h2>  
    <p>Recherchez un développeur et cliquez sur « Ajouter à la shortlist » pour le retrouver ici.</p>
  <div>`;
}
function displayFavorUsers(users) {
  if (users.length === 0) {
    displayEmptyShortList();
  }
  shortList.innerHTML += "";
  users.forEach((user) => {
    shortList.innerHTML += `<ul class="flex flex-col gap-3">
  <li>
    <article
      class="flex flex-col gap-4 rounded-md border border-[#30363d] bg-[#0d1117] p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <!-- Left: avatar + identity -->
      <div class="flex min-w-0 items-center gap-4">
        <img
          src="${user.avatar_url}"
          class="h-16 w-16 shrink-0 rounded-full border border-[#30363d] object-cover"
        />
        <div class="min-w-0">
          <h3 class="truncate text-base font-semibold text-[#e6edf3]">${user.name !== null ? user.name : "aucune user name "}</h3>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm text-[#7d8590]">@${user.login !== null ? user.login : "aucune user login"}</span>
            <span class="rounded-full border border-[#30363d] px-2 py-0.5 text-xs font-medium text-[#7d8590]">Java</span>
          </div>
          <p class="mt-1 text-sm italic text-[#58a6ff]">${user.email !== null ? user.email : "aucune user email"}</p>
          <p class="mt-1 text-xs text-[#7d8590]">Ajouté le 06/11/2026</p>
        </div>
      </div>

     
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex gap-0.5 text-sm" role="img">
          <i class="fa-solid fa-star text-[#d29922]"></i>
          <i class="fa-solid fa-star text-[#d29922]"></i>
          <i class="fa-solid fa-star text-[#d29922]"></i>
          <i class="fa-solid fa-star text-[#d29922]"></i>
          <i class="fa-solid fa-star text-[#d29922]"></i>
        </div>

        
        <button
          type="button"
          class="rounded-md border border-[#da3633] px-3 py-1.5 text-xs font-medium text-[#f85149]"
        >
          <i class="fa-solid fa-circle" aria-hidden="true"></i> Refusé
        </button>

        <button
          type="button"
          class="rounded-md border border-[#30363d] px-3 py-1.5 text-xs font-medium text-[#e6edf3]"
        >
          <i class="fa-solid fa-pen" aria-hidden="true"></i> Modifier
        </button>

        <button
          type="button"
          class="rounded-md border border-[#da3633] px-3 py-1.5 text-xs font-medium text-[#f85149]"
        >
          <i class="fa-solid fa-xmark"></i> Supprimer
        </button>
      </div>
    </article>
  </li>
</ul>`;
  });
}
fetchFavoUsers();
