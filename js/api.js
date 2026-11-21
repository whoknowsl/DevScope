import { GITHUB_API, headers ,CACHE_DURATION } from "./config.js";
import { readCache, saveCache } from "./cash.js";
//GET data
export async function fetchGithubUser(name) {
  const [res, repose] = await Promise.all([
    fetch(`${GITHUB_API}/users/${name}`, { headers }),
    fetch(`${GITHUB_API}/users/${name}/repos`, { headers }),
  ]);
  if (!res.ok) {
    const err = new Error(`Erreur HTTP : ${res.status}`);
    err.status = res.status;
    throw err;
  }
  if (!repose.ok) {
    const err = new Error(`Erreur HTTP : ${repose.status}`);
    err.status = repose.status;
    throw err;
  }
  return { user: await res.json(), repos: await repose.json() };
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
//PUT data
export async function updateCandidate(id, candidate, MOCKAPI_URL) {
  const res = await fetch(`${MOCKAPI_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });
  if (!res.ok) throw new Error(res.status);
  return await res.json();
}
//delet data
export async function deleteCandidate(id, MOCKAPI_URL) {
  const res = await fetch(`${MOCKAPI_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(res.status);
  return await res.json();
}
//
