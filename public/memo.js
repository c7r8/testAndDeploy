export async function loadMemos(isLoggedIn) {
  const resp = await fetch("/memos");
  const memos = await resp.json();
  let htmlStr = "";
  for (const memo of memos) {
    const image = memo.image
      ? `<img src="/image/${memo.image}" alt="memo-image" width="100">`
      : "";
    const buttons = isLoggedIn
      ? /*html */ `
      <div class="button-div" data-id="${memo.id}">
        <i class="bi bi-trash btn-delete" ></i>
        <i class="bi bi-pen btn-edit" ></i>
        <i class="bi bi-pen btn-like" ></i>
      </div>
    `
      : "";
    htmlStr += /*html*/ `
    <div class="memo">
      <div contenteditable="true" id="memo-content-${memo.id}">${memo.content}</div>
      ${image}
      ${buttons}
    </div>
    `;
  }
  document.querySelector("#memo-board").innerHTML = htmlStr;

  document.querySelectorAll(".btn-like").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id;
      const resp = await fetch(`/memos/${id}/likes`, { method: "POST" });
      if (resp.status === 400) {
        const result = await resp.json();
        alert(result.message);
      }
    })
  );

  document.querySelectorAll(".btn-delete").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id;
      const resp = await fetch(`/memos/${id}`, { method: "DELETE" });
      const result = await resp.json();
      if (result.success) {
        loadMemos(isLoggedIn);
      }
    })
  );

  document.querySelectorAll(".btn-edit").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id;
      const content = document.querySelector(`#memo-content-${id}`).innerText;
      const resp = await fetch(`/memos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const result = await resp.json();
      if (result.success) {
        loadMemos(isLoggedIn);
      }
    })
  );
}
