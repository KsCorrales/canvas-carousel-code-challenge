# Canvas Image Slider

A horizontal drag-to-slide image slider rendered entirely on a single `<canvas>` element.

**Target browser:** Latest Chrome.

## Requirements

- Slider rendered in a single `<canvas>` element
- 3 images with different dimensions (1200x800, 800x1200, 1600x900)
- Drag interaction to navigate between images
- Works on latest Chrome
- "Drag to change image" hint text under the carousel

## Run
- No build step required — the project root **is** the built release
- Serve it with any static file server:

```bash
npx nws
```

Then open the reported URL in your browser.

## Project Structure

```
index.html      - Entry point with centered canvas container (max 600px)
images/         - Sample images (different dimensions)
src/
  main.js       - Bootstrap: loads images, orchestrates slider logic
  utils.js      - Reusable helpers (loadImage, scaleImage, mouseDragXTracking)
```
