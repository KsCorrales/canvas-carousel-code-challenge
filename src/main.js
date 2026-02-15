import { loadImage, scaleImage, mouseDragXTracking } from "./utils.js";

const canvas = document.getElementById("slider");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

ctx.fillStyle = "#000000"
ctx.fillRect(0, 0, canvas.width, canvas.height);

const IMAGE_URLS = [
  "./images/image1.jpg",
  "./images/image2.jpg",
  "./images/image3.jpg",
];

async function init() {
  const images = await Promise.all(IMAGE_URLS.map(loadImage));
  let currentIndex = 0;

  const mouseDragX = mouseDragXTracking(canvas, (dragState) => {
    const ratio = dragState.offset / canvas.width;
  
    // 0.1 value is to handle the threshold 
    if (ratio < -0.1 && currentIndex < images.length - 1) {
        currentIndex++;
        // new image was at offset + canvasWidth
        dragState.offset += canvas.width;  
    } else if (ratio > 0.1 && currentIndex > 0) {
        currentIndex--;
        // new image was at offset - canvasWidth
        dragState.offset -= canvas.width;  
    }
  }); 

  function draw() {
      
      // how far right we can drag = number of images behind us * canvas size
      // if we are on image 2, we can drag right up to 2 canvas widths (to go back to image 0)
      const maxOffset = currentIndex * canvas.width;

      // how far left we can drag = number of images ahead of us * canvas size (negative because left)
      // if we are on image 0 with 3 images, we can drag left up to -2 canvas widths (to reach image 2)
      const minOffset = -(images.length - 1 - currentIndex) * canvas.width;

      // keep the offset between those two walls — don't let the user scroll into empty space
      mouseDragX.offset = Math.min(Math.max(mouseDragX.offset, minOffset), maxOffset);

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw current image
      scaleImage(ctx, canvas, images[currentIndex], mouseDragX.offset);

      // Dragging left on negatvie offset we show the next right image
    if (mouseDragX.offset < 0 && currentIndex < images.length - 1) {
        scaleImage(ctx, canvas, images[currentIndex + 1], mouseDragX.offset + canvas.width);
    }

    // Dragging right on positive offset we sho the next left image
    if (mouseDragX.offset > 0 && currentIndex > 0) {
        scaleImage(ctx, canvas, images[currentIndex - 1], mouseDragX.offset - canvas.width);
    }

      requestAnimationFrame(draw);
  }

  draw();
}

init();