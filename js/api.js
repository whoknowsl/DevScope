import { GITHUB_API, MOCKAPI_URL } from "./config.js";


//POST data
export async function PostUsers(user) {
  const res = await fetch(`${MOCKAPI_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json();
}