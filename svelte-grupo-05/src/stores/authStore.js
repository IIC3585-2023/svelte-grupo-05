
import { writable } from 'svelte/store';
import jwt_decode from "jwt-decode";

let boards = [];
let token = localStorage.getItem("token");
let id = null;
if (token) {
  const { id: _id } = jwt_decode(token);
  id = _id;
}
if (localStorage.getItem("boards")) {
  boards = JSON.parse(localStorage.getItem("boards"));
}

export const authStore = writable({
  token,
  id,
  boards,
});
