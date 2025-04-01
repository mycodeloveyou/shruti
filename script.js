let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    const updatePosition = (x, y) => {
      this.mouseX = x;
      this.mouseY = y;

      if (!this.rotating) {
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = this.mouseX - this.mouseTouchX;
      const dirY = this.mouseY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      if (dirLength > 0) {
        const dirNormalizedX = dirX / dirLength;
        const dirNormalizedY = dirY / dirLength;
        const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
        let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;
        
        if (this.rotating) {
          this.rotation = degrees;
        }
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    const handleMove = (e) => {
      e.preventDefault();
      let x, y;
      if (e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      updatePosition(x, y);
    };

    const handleStart = (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      let touch = e.touches ? e.touches[0] : e;

      this.mouseTouchX = touch.clientX;
      this.mouseTouchY = touch.clientY;
      this.prevMouseX = this.mouseTouchX;
      this.prevMouseY = this.mouseTouchY;

      if (e.touches && e.touches.length > 1) {
        this.rotating = true;
      }
    };

    const handleEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMove, { passive: false });
    document.addEventListener("touchmove", handleMove, { passive: false });

    paper.addEventListener("mousedown", handleStart);
    paper.addEventListener("touchstart", handleStart, { passive: false });

    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);
  }
}

// Initialize all papers
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  new Paper().init(paper);
});
