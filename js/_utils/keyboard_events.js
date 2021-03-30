export function setKeyListeners() {
  window.addEventListener("load", (event) => {
    sessionStorage.setItem("keys_pressed", JSON.stringify([]));
  });

  document.addEventListener("keyup", (event) => {
    checkMultipleEventKeys(event);
  });

  document.addEventListener("keydown", (event) => {
    checkMultipleEventKeys(event);
  });
}

function checkMultipleEventKeys(evt) {
  let keysPressed = !!sessionStorage.getItem("keys_pressed")
    ? JSON.parse(sessionStorage.getItem("keys_pressed"))
    : [];
  const eventKey = evt.key.toLowerCase();

  if (evt.type === "keydown") {
    const index = keysPressed.indexOf(eventKey);
    if (index >= 0) keysPressed.splice(index, 1);
    keysPressed.push(eventKey);
  }
  if (evt.type === "keyup") {
    const index = keysPressed.indexOf(eventKey);
    if (index >= 0) keysPressed.splice(index, 1);
  }

  sessionStorage.setItem("keys_pressed", JSON.stringify(keysPressed));
}
