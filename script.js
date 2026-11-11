export const recherchForm = document.querySelector("#recherch-form");
export const userName = document.querySelector("#user-name");


recherchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = userName.value.trim();
  window.location.href = `pages/recherche.html?userName=${encodeURIComponent(user)}`;
});