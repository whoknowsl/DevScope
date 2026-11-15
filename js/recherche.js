import { PostUsers, initialFetch, repos } from "../js/api.js";
import { favoritUsers } from "../js/shortlist.js";
export const repoesList = document.querySelector("#repoes-list");
const urlParams = new URLSearchParams(window.location.search);
const prevINput = urlParams.get("userName");
const recherchForm = document.querySelector("#recherch-form");
const searchBar = document.querySelector("#user-name");
const aside = document.querySelector(".aside-profile");
const reposNums = document.querySelector("#repos-nums");
const body = document.querySelector("body");
searchBar.value = prevINput;

initialFetch(searchBar.value);

export function displayUser(user) {
  aside.innerHTML = "";
  aside.innerHTML += `<div class="w-full rounded-md border border-[#30363d] bg-[#161b22] flex flex-col items-center px-4 py-5">
          <img
            class=" h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
            src="${user.avatar_url}"
            alt="photo-profile"
          />
          <h3 class="text-xl font-semibold mt-1">${user.login !== null ? user.login : "aucun user login"}</h3>
          <p class="font-medium text-[#7d8590]">@${user.name !== null ? user.name : "aucun user name"}</p>
          <p class="text-[#58a6ff] my-3 text-base text-center sm:text-xl">"${user.bio !== null ? user.bio : "aucun user bio"}"</p>
          <div
            class="rounded-md border border-[#30363d] px-3 py-2 font-medium text-[#e6edf3] flex w-full flex-col gap-2"
          >
            <h4><i class="fa-solid fa-globe"></i> ${user.location !== null ? user.location : "aucun user location"}</h4>
            <h4>
              <i class="fa-solid fa-calendar-days"></i> Membre depuis ${user.created_at !== null ? user.created_at : "the date is unkowen"}
            </h4>
          </div>
          <div class="grid w-full grid-cols-3 gap-2 my-5">
            <div
              class="rounded-md border border-[#30363d] px-3 py-2 font-medium flex flex-col items-center gap-3"
            >
              <p class="number-depots text-[#d29922] text-2xl">${user.public_repos}</p>
              <p class="font-medium text-[#7d8590]">DEPOTS</p>
            </div>
            <div
              class="rounded-md border border-[#30363d] px-3 py-2 font-medium flex flex-col items-center gap-3"
            >
              <p class="number-abonnes text-[#58a6ff] text-2xl">${user.followers}</p>
              <p class="font-medium text-[#7d8590]">ABONNES</p>
            </div>
            <div
              class="rounded-md border border-[#30363d] px-3 py-2 font-medium flex flex-col items-center gap-3"
            >
              <p class="number-abonnements text-[#3fb950] text-2xl">18</p>
              <p class="font-medium text-[#7d8590]">ABONNEMENTS</p>
            </div>
          </div>

          <button  id="addShortlist"
            class="rounded-2xl bg-[#58a6ff] text-white  w-full px-4 py-3 text-base font-bold my-2"
          >
            <i class="fa-solid fa-star"></i> Ajouter a la shortlist</button
          ><a href="${user.html_url}"><button
            class="rounded-2xl bg-[#7d8590]  text-white w-full px-4 py-3 text-base font-bold "
          >
            Voir le profil original <i class="fa-solid fa-arrow-right"></i>
          </button></a>
        </div>`;
  reposNums.textContent = `${user.public_repos}`;
  const addToShortList = document.querySelector("#addShortlist");

  addToShortList.addEventListener("click", () => {
    if (checkuser(user.login)) {
      alert("the user alrady existe");
      return;
    } else {
      PostUsers(user);
    }
  });
}

export function displayError(error) {
  body.innerHTML = "";
  body.innerHTML += ` <p class="bg-gradient-to-b from-[#e6edf3] to-[#30363d] bg-clip-text text-8xl font-extrabold text-transparent sm:text-9xl" aria-hidden="true">
        ${error}
      </p>
 
      <h1 class="mt-4 text-3xl font-semibold sm:text-4xl">Ce n'est pas la page que vous cherchez</h1>
      <p class="mt-3 max-w-md text-[#7d8590]">
        La page a peut-être été déplacée ou supprimée, ou le nom d'utilisateur n'existe pas.
      </p>`;
}
//
recherchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchBar.value;
  initialFetch(value);
});

//pagination
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const pageInfo = document.querySelector("#page-info");
export const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Lua: "#000080",
  R: "#198CE7",
  Scala: "#c22d40",
  "Jupyter Notebook": "#DA5B0B",
  Dockerfile: "#384d54",
};
const PER_PAGE = 6;
let page = 1;

export function displayReposUser(repos) {
  const totalPages = Math.max(1, Math.ceil(repos.length / PER_PAGE));
  page = Math.min(Math.max(page, 1), totalPages);

  const start = (page - 1) * PER_PAGE;
  const pageRepos = repos.slice(start, start + PER_PAGE);
  repoesList.innerHTML = "";
  pageRepos.forEach((repo) => {
    repoesList.innerHTML += ` <article
            class="flex flex-col gap-3 rounded-md border border-[#30363d] bg-[#0d1117] p-4 text-[#e6edf3] transition hover:border-[#8b949e]">
            <div class="flex items-start justify-between gap-3">
              <h3 class="truncate text-sm font-semibold">
                <a href="${repo.html_url}" class="text-[#58a6ff] hover:underline"
                  >${repo.name}</a
                >
              </h3>
              <span
                class="shrink-0 rounded-full border border-[#30363d] px-2 py-0.5 text-xs font-medium text-[#7d8590]"
              >
                ${repo.visibility}
              </span>
            </div>
            <p class="text-xs text-[#7d8590]">${repo.description !== null ? repo.description : "Aucune description"}</p>
            <div
              class="flex flex-wrap items-center gap-4 text-xs text-[#7d8590]">
              <span class="flex items-center gap-1.5">
                <span
                  class="h-3 w-3 rounded-full bg-[${languageColors[repo.language]}]"
                ></span>
                ${repo.language}
              </span>
              <span
                class="flex items-center gap-1 hover:text-[#58a6ff]"
                title="Étoiles"
              >
               <i class="fa-regular fa-star"></i>
                <span>0</span>
              </span>

              <span
                class="flex items-center gap-1 hover:text-[#58a6ff]"
                title="Forks"
              >
               <i class="fa-solid fa-code-fork"></i>
                <span>0</span>
              </span>
            </div>
            <p class="text-xs text-[#7d8590]">Mis à jour il y a 27 jours</p>
          </article>`;
  });
  pageInfo.textContent = `Page ${page} / ${totalPages}`;
}
prevBtn.addEventListener("click", () => {
  page--;
  displayReposUser(repos);
});
nextBtn.addEventListener("click", () => {
  page++;
  displayReposUser(repos);
});

//check plaayer if alrady existe
function checkuser(login) {
  const checkdUser = favoritUsers.some((user) => user.login == login);
  return checkdUser;
}
