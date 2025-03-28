const bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", (event) => {
    const xPosition = event.offsetX;
    const yPosition = event.offsetY;

    const spanEl = document.createElement("span");

    spanEl.style.left = xPosition + "px";
    spanEl.style.top = yPosition + "px";

    const size = Math.floor(Math.random() * 100);
    spanEl.style.height = size + "px";
    spanEl.style.width = size + "px";
    bodyEl.appendChild(spanEl);

    setTimeout (() => {
        spanEl.remove();
    }, 3000);
});