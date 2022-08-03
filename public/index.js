import { loadMemos } from "./memo.js";

let user;

window.onload = async () => {
  await getUserInfo();
  const isLoggedIn = !!user;
  loadMemos(isLoggedIn);
  initPostMemoForm();
  initLoginForm();

  const socket = io.connect();
  socket.on("hello", (data) => {
    // data has the content {msg:"Hello Client"}
    console.log(data);
  });
  socket.on("create-memo", () => {
    console.log("create-memo");
    loadMemos(isLoggedIn);
  });
};

async function getUserInfo() {
  const resp = await fetch("/users/info");
  if (resp.status === 200) {
    const result = await resp.json();
    user = result.user;
    console.log(user);
  }
}

function initPostMemoForm() {
  document
    .querySelector("#form-post-memo")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData();
      formData.append("content", form.content.value);
      formData.append("image", form.image.files[0]);
      const resp = await fetch("/memos", {
        method: "POST",
        body: formData,
      });
      const result = await resp.json();
      if (result.success) {
        alert("Success !!!");
        form.reset();
      } else {
        alert(result.message);
      }
    });
}

function initLoginForm() {
  document
    .querySelector("#form-login")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const username = form.username.value;
      const password = form.password.value;
      const resp = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await resp.json();
      if (resp.status === 200) {
        window.location.href = "/admin.html";
      } else {
        console.log("Error !!!", result.message);
      }
    });
}
