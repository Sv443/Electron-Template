export {};

document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if(app)
    app.innerText = "Hello World!";
}
