const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code === "Space") {
    setColor();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type == "lock") {
    const node =
      event.target.tagName.toLowerCase() == "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type == "copy") {
    copyClick(event.target.textContent);
  }
});

function generateColor() {
  const hexCode = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * hexCode.length)];
  }
  return "#" + color;
}

function copyClick(text) {
  return navigator.clipboard.writeText(text);
}

function setColor() {
  cols.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const lock = col.querySelector("button");
    const color = generateColor();
    if (isLocked) {
      return;
    }
    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(lock, color);
  });
}
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

setColor();
