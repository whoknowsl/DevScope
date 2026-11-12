const urlParams = new URLSearchParams(window.location.search);
const prevINput = urlParams.get("userName");
const recherchForm = document.querySelector("#recherch-form");
const searchBar = document.querySelector("#user-name");
const aside = document.querySelector(".aside-profile");
const repoesList = document.querySelector("#repoes-list");
const reposNums = document.querySelector("#repos-nums");
const userPage = document.querySelector("#user-page");
const body = document.querySelector("body");
searchBar.value = prevINput;

let repos = [];


export async function initialFetch(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
      // Accept: "application/vnd.github+json",
    });
    const repose = await fetch(`https://api.github.com/users/${user}/repos`, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
      // Accept: "application/vnd.github+json",
    });
    if (!res.ok) {
      displayError(res.status);
      throw new error(`Utilisateur introuvable ou erreur HTTP : ${res.status}`);
    }
    if (!repose.ok) {
      displayError(res.status);
      throw new error(
        `Utilisateur introuvable ou erreur HTTP : ${repose.status}`,
      );
    }
    user = await res.json();
    repos = await repose.json();
    displayUser(user);
    console.log(repos);
    displayReposUser(repos.slice(0, 8));
  } catch (erreur) {
    console.error("Erreur lors de la récupération des données :", erreur);
  }
}
initialFetch(searchBar.value);

function displayUser(user) {
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
          ><button
            class="rounded-2xl bg-[#7d8590] px-6 py-4 text-lg font-bold text-white my-4"
          >
            Voir le profil original <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>`;
  reposNums.textContent = `${user.public_repos}`;
  const addToShortList = document.querySelector(`#${user.login}`);
  addToShortList.addEventListener("click", () => {
    PostUsers(user);
  });
}
function displayReposUser(repos) {
  repoesList.innerHTML = "";
  repos.forEach((repo) => {
    repoesList.innerHTML += ` <article
            class="flex flex-col gap-3 rounded-md border border-[#30363d] bg-[#0d1117] p-4 text-[#e6edf3] transition hover:border-[#8b949e]">
            <div class="flex items-start justify-between gap-3">
              <h3 class="truncate text-sm font-semibold">
                <a href="#" class="text-[#58a6ff] hover:underline"
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
}
export async function PostUsers(user) {
  const res = await fetch(
    "https://6af5823bf6270fa08d6827a5.mockapi.io/devscope/shortlist/user",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    },
  );
  console.log("Statut :", res.status); // 201 = créé
  console.log(await res.json());
}
function displayError(error) {
  body.innerHTML = "";
  body.innerHTML += ` <p class="bg-gradient-to-b from-[#e6edf3] to-[#30363d] bg-clip-text text-8xl font-extrabold text-transparent sm:text-9xl" aria-hidden="true">
        ${error}
      </p>
 
      <h1 class="mt-4 text-3xl font-semibold sm:text-4xl">Ce n'est pas la page que vous cherchez</h1>
      <p class="mt-3 max-w-md text-[#7d8590]">
        La page a peut-être été déplacée ou supprimée, ou le nom d'utilisateur n'existe pas.
      </p>`;
}

recherchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchBar.value;
  initialFetch(value);
});
