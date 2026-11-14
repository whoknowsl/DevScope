import { PostUsers, initialFetch, repos } from "../js/api.js";
import { favoritUsers } from "../js/shortlist.js";
export const repoesList = document.querySelector("#repoes-list");
console.log(favoritUsers);
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
  aside.innerHTML += `<div class="bg-[#161b22] col-end-1 flex flex-col items-center px-4 py-5">
          <img
            class="w-40 rounded-full"
            src="${user.avatar_url}"
            alt="photo-profile"
          />
          <h3 class="text-xl font-semibold mt-1">${user.login}</h3>
          <p class="font-medium text-[#7d8590]">@${user.name}</p>
          <p class="text-[#58a6ff] my-3 text-xl text-center">"${user.bio}"</p>
          <div
            class="rounded-md border border-[#30363d] px-3 py-2 font-medium text-[#e6edf3] flex flex-col gap-2 min-w-128"
          >
            <h4><i class="fa-solid fa-globe"></i> ${user.location}</h4>
            <h4>
              <i class="fa-solid fa-calendar-days"></i> Membre depuis ${user.created_at}
            </h4>
          </div>
          <div class="flex gap-4 my-5">
            <div
              class="rounded-md border border-[#30363d] px-3 py-2 font-medium min-w-40 flex flex-col items-center gap-3"
            >
              <p class="number-depots text-[#d29922] text-2xl">${user.public_repos}</p>
              <p class="font-medium text-[#7d8590]">DEPOTS</p>
            </div>
            <div
              class="rounded-md border border-[#30363d] px-3 py-2 font-medium min-w-40 flex flex-col items-center gap-3"
            >
              <p class="number-abonnes text-[#58a6ff] text-2xl">${user.followers}</p>
              <p class="font-medium text-[#7d8590]">ABONNES</p>
            </div>
            <div
              class="rounded-md border border-[#30363d] px-3 py-2 font-medium min-w-40 flex flex-col items-center gap-3"
            >
              <p class="number-abonnements text-[#3fb950] text-2xl">18</p>
              <p class="font-medium text-[#7d8590]">ABONNEMENTS</p>
            </div>
          </div>

          <button id = ${user.login}
            class="rounded-2xl bg-[#58a6ff] px-6 py-4 text-lg font-bold text-white my-4"
          >
            <i class="fa-solid fa-star"></i> Ajouter a la shortlist</button
          ><a href="${user.html_url}"><button
            class="rounded-2xl bg-[#7d8590] px-6 py-4 text-lg font-bold text-white my-4"
          >
            Voir le profil original <i class="fa-solid fa-arrow-right"></i>
          </button></a>
        </div>`;
  reposNums.textContent = `${user.public_repos}`;
  const addToShortList = document.querySelector(`#${user.login}`);

  addToShortList.addEventListener("click", () => {
    if (checkuser(user.login)) {
      console.log("the user alrady existe");
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
            <p class="text-xs text-[#7d8590]">${repo.description}</p>
            <div
              class="flex flex-wrap items-center gap-4 text-xs text-[#7d8590]">
              <span class="flex items-center gap-1.5">
                <span
                  class="h-3 w-3 rounded-full bg-[#e34c26]"
                  aria-hidden="true"
                ></span>
                HTML
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
