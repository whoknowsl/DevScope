import { displayUser, displayError, displayReposUser } from "./recherche.js";

export const repos = [];

//GET data
export async function initialFetch(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
      Accept: "application/vnd.github+json",
    });
    const repose = await fetch(`https://api.github.com/users/${user}/repos`, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
      Accept: "application/vnd.github+json",
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

    displayReposUser(repos);
  } catch (err) {
    console.log("Erreur lors de la récupération des données :", err);
  }
}
//POST data
export async function PostUsers(user) {
  const res = await fetch(
    "https://6af5823bf6270fa08d6827a5.mockapi.io/devscope/shortlist/user",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    },
  );
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json();
}
