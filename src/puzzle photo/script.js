// Variables
var images = ['./crush_image/Screenshot_2025_0220_164957.jpg'];
var currentIndex = 0;
var totalClicks = 0;
// Randomize the puzzle image
function randomizeImage() {
  let root = document.documentElement;
  root.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  var puzzleItems = document.querySelectorAll('#puzz i');
  for (var i = 0; i < puzzleItems.length; i++) {
    puzzleItems[i].style.left = Math.random() * (window.innerWidth - 100) + 'px';
    puzzleItems[i].style.top = Math.random() * (window.innerHeight - 100) + 'px';
  }
}

// Reset the puzzle pieces
function reloadPuzzle() {
  var doneItems = document.querySelectorAll('.done');
  doneItems.forEach(function (element) {
    element.classList.remove('done');
  });

  var droppedItems = document.querySelectorAll('.dropped');
  droppedItems.forEach(function (element) {
    element.classList.remove('dropped');
  });

  var allDoneElement = document.querySelector('.allDone');
  if (allDoneElement) {
    allDoneElement.style = '';
    allDoneElement.classList.remove('allDone');
  }
}

// Show heart animation as completion message
function showCompletionMessage() {
  const animationHtml = `
    <div id="completionContainer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #161515; overflow: hidden; z-index: 1000;">
      <script>
        const bodyEl = document.querySelector("#completionContainer");
        bodyEl.addEventListener("mousemove", (event) => {
          const xPosition = event.clientX;
          const yPosition = event.clientY;
          const spanEl = document.createElement("span");
          spanEl.style.position = "absolute";
          spanEl.style.left = xPosition + "px";
          spanEl.style.top = yPosition + "px";
          spanEl.style.width = Math.floor(Math.random() * 100) + "px";
          spanEl.style.height = spanEl.style.width;
          spanEl.style.backgroundImage = 'url("https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_54-256.png")';
          spanEl.style.backgroundSize = "cover";
          spanEl.style.pointerEvents = "none";
          spanEl.style.animation = "animate 6s linear forwards";
          bodyEl.appendChild(spanEl);
          setTimeout(() => spanEl.remove(), 3000);
        });
      </script>
      <style>
        @keyframes animate {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px);
            opacity: 0;
          }
        }
      </style>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = animationHtml;
  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 3000);
}

// Handle mobile functionality
function initializeMobileEvents() {
  var puzzleItemsMobile = document.querySelectorAll('#puzz i');
  puzzleItemsMobile.forEach(function (element) {
    element.addEventListener('mousedown', function () {
      totalClicks++;
      document.querySelector('#clicks').innerHTML = totalClicks;
    });
    element.addEventListener('click', function () {
      if (document.querySelector('.clicked')) {
        document.querySelector('.clicked').classList.toggle('clicked');
        element.classList.toggle('clicked');
      } else {
        element.classList.toggle('clicked');
      }
    });
  });
}

// Handle desktop functionality
function initializeDesktopEvents() {
  var puzzleItemsDesktop = document.querySelectorAll('#puz i');
  puzzleItemsDesktop.forEach(function (element) {
    element.addEventListener('click', function () {
      if (document.querySelector('.clicked')) {
        var clickedElement = document.querySelector('.clicked');
        if (clickedElement.classList.contains(element.classList)) {
          element.classList.add('dropped');
          clickedElement.classList.add('done');
          clickedElement.classList.remove('clicked');

          if (document.querySelectorAll('.dropped').length == 9) {
            document.querySelector('#puz').classList.add('allDone');
            document.querySelector('#puz').style.border = 'none';
            document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

            showCompletionMessage();

            setTimeout(function () {
              reloadPuzzle();
              randomizeImage();
            }, 3000);
          }
        }
      }
    });
  });
}

// Allow drag-and-drop functionality
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if (ev.target.className == data) {
    ev.target.classList.add('dropped');
    document.querySelector('.' + data + "[draggable='true']").classList.add('done');

    if (document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone');
      document.querySelector('#puz').style.border = 'none';
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

      showCompletionMessage();

      setTimeout(function () {
        reloadPuzzle();
        randomizeImage();
      }, 3000);
    }
  }
}
// Show heart animation as completion message
function showCompletionMessage() {
  const animationHtml = `
    <div id="completionContainer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #161515; overflow: hidden; z-index: 1000;">
      <script>
        const bodyEl = document.querySelector("#completionContainer");
        bodyEl.addEventListener("mousemove", (event) => {
          const xPosition = event.clientX;
          const yPosition = event.clientY;
          const spanEl = document.createElement("span");
          spanEl.style.position = "absolute";
          spanEl.style.left = xPosition + "px";
          spanEl.style.top = yPosition + "px";
          spanEl.style.width = Math.floor(Math.random() * 100) + "px";
          spanEl.style.height = spanEl.style.width;
          spanEl.style.backgroundImage = 'url("https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_54-256.png")';
          spanEl.style.backgroundSize = "cover";
          spanEl.style.pointerEvents = "none";
          spanEl.style.animation = "animate 6s linear forwards";
          bodyEl.appendChild(spanEl);
          setTimeout(() => spanEl.remove(), 3000);
        });
      </script>
      <style>
        @keyframes animate {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px);
            opacity: 0;
          }
        }
      </style>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = animationHtml;
  document.body.appendChild(container);

  // Redirect to a new HTML page after 3 seconds
  setTimeout(() => {
    container.remove();
    window.location.href = "Heart_Trial_Animation-main/index.html"; // Replace with your desired HTML page URL
  }, 1000);
}

// Initialize everything
window.onload = function () {
  randomizeImage();
  initializeMobileEvents();
  initializeDesktopEvents();
};
