import { updateCandidate, deleteCandidate } from "./api.js";
import { MOCKAPI_URL } from "./config.js";
const shortList = document.querySelector(".short-list");
const formeList = document.querySelector("#forme-list");
const removeBtn = document.querySelector("#remove-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const editLogin = document.querySelector("#edit-login");
const editMessage = document.querySelector("#edit-message");
const saveBtn = document.querySelector("#save-btn");
const statutOfRecrutement = document.querySelector("#statut-of-recrutement");
const note = document.querySelector("#note");
const noteInterne = document.querySelector("#note-interne");
const counter = document.querySelector("#counter");
const listMessage = document.querySelector("#list-message");
const confirmBox = document.querySelector("#confirm-box");
const confirmText = document.querySelector("#confirm-text");
const confirmYes = document.querySelector("#confirm-yes");
const confirmNo = document.querySelector("#confirm-no");
let idToDelete = null;
export const favoritUsers = [];
let idEnCours = null;
async function fetchFavoUsers() {
  try {
    const response = await fetch(MOCKAPI_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    favoritUsers.length = 0;
    favoritUsers.push(...(await response.json()));
    displayFavorUsers(favoritUsers);
  } catch (err) {
    console.log(err.message);
  }
}
function displayEmptyShortList() {
  shortList.innerHTML = "";
  shortList.innerHTML += `<div class=col items-center gap-3 rounded-md border bg-[#0d1117] px-6 py-16 text-center"flex flex-">
    <h2 class="text-xl font-semibold text-[#7d8590]">Votre shortlist est vide</h2>  
    <p>Recherchez un développeur et cliquez sur « Ajouter à la shortlist » pour le retrouver ici.</p>
  </div>`;
}
function disablayCounter() {
  counter.textContent = `${favoritUsers.length} candidat (s) dans votre shortlist`;
}
function displayFavorUsers(users) {
  if (users.length === 0) {
    displayEmptyShortList();
    return;
  }
  shortList.innerHTML = "";
  users.forEach((user) => {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += `<i class ="fa-solid fa-star ${i <= Number(user.note) ? "text-[#d29922]" : "text-[#30363d]"}"></i>`;
    }
    shortList.innerHTML += `
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
          <p class="mt-1 text-sm italic text-[#58a6ff]">${user.commentaire !== undefined ? user.commentaire : "there's no comment"}</p>
          <p class="mt-1 text-xs text-[#7d8590]">Ajouté le 06/11/2026</p>
        </div>
      </div>

     
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex gap-0.5 text-sm">
        ${stars}
        </div>        
        <button
          type="button"
          class=" rounded-md border border-[#da3633] px-3 py-1.5 text-xs font-medium text-[#f85149]"
        >
          <i class="fa-solid fa-circle"></i> Refusé
        </button>

        <button
          type="button"
          data-action = "modifier"
          data-id = "${user.id}"
          class="rounded-md border border-[#30363d] px-3 py-1.5 text-xs font-medium text-[#e6edf3]"
        >
          <i class="fa-solid fa-pen"></i> Modifier
        </button>

        <button
          type="button"
          data-action = "supprimer"
          data-id = "${user.id}"
          class="rounded-md border border-[#da3633] px-3 py-1.5 text-xs font-medium text-[#f85149]"
        >
          <i class="fa-solid fa-xmark"></i> Supprimer
        </button>
      </div>
    </article>`;
  });
  disablayCounter();
}
//
shortList.addEventListener("click", (e) => {
  const supprimerBtn = e.target.closest("[data-action='supprimer']");
  if (!supprimerBtn) return;
  idToDelete = supprimerBtn.dataset.id;
  const user = favoritUsers.find((u) => u.id == idToDelete);
  confirmText.textContent = `Supprimer @${user.login} de la shortlist ?`;
  listMessage.textContent = "";
  confirmBox.classList.remove("hidden");
  confirmBox.classList.add("flex");
});

//2. click on Annuler: close the box
confirmNo.addEventListener("click", () => {
  confirmBox.classList.add("hidden");
  confirmBox.classList.remove("flex");
});
//
//3. click on Supprimer in the box: delete
confirmYes.addEventListener("click", async () => {
  confirmYes.disabled = true;
  try {
    await deleteCandidate(idToDelete, MOCKAPI_URL);
    const index = favoritUsers.findIndex((u) => u.id == idToDelete);
    if (index != -1) favoritUsers.splice(index, 1);
    displayFavorUsers(favoritUsers);
  } catch (err) {
    if (err.message == 404) {
      listMessage.textContent = "Ce candidat n'existe plus.";
    } else {
      listMessage.textContent =
        "Impossible de supprimer. Vérifiez votre connexion.";
    }
  } finally {
    confirmYes.disabled = false;
    confirmBox.classList.add("hidden");
    confirmBox.classList.remove("flex");
  }
});
//
formeList.addEventListener("submit", async (e) => {
  e.preventDefault();
  saveBtn.disabled = false;
  saveBtn.textContent = "Enregistrement...";
  editMessage.textContent = "";
  try {
    const oldUser = favoritUsers.find((u) => u.id == idEnCours);
    const newUser = {
      ...oldUser,
      statut: statutOfRecrutement.value,
      note: Number(note.value),
      commentaire: noteInterne.value,
    };
    const updated = await updateCandidate(idEnCours, newUser, MOCKAPI_URL);
    const index = favoritUsers.findIndex((u) => u.id == idEnCours);
    favoritUsers[index] = updated;
    displayFavorUsers(favoritUsers);
    formeList.classList.add("hidden");
  } catch (err) {
    if (err.message == 404) {
      editMessage.textContent = "Ce candidat n'existe plus.";
    } else {
      editMessage.textContent =
        "Impossible d'enregistrer. Verifiez votre connexion.";
    }
  } finally {
    saveBtn.disabled = true;
    saveBtn.textContent = "Enregistrer";
  }
});
//
removeBtn.addEventListener("click", () => {
  formeList.classList.add("hidden");
});
cancelBtn.addEventListener("click", () => {
  formeList.classList.add("hidden");
});
fetchFavoUsers();
