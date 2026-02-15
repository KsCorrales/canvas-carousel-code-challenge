export const loadImage = (url) => {
    return new Promise ((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error(`failed to load image: ${url}`))
        
        img.src = url; 
    })
    
}

export const mouseDragXTracking = (canvas, onDragEnd) => {
    const dragState = { offset: 0}
    let isDragging = false;
    let dragStartX = 0;

    // start tracking mouse movement
    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        //  we use offset to be sure when we mouseup and mousedown again we're
        //  taking into count what is the current image offset is...  (prevents jumps)
        dragStartX = e.clientX - dragState.offset;
    });


    // only if isDragging is true we will update the drag ends
    // we dont want to track if the user does not press the canvas
    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        dragState.offset = e.clientX - dragStartX;
    });

    // restart the mouseDrag
    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        onDragEnd(dragState);
    });

    // we need to return an object because we need the referenced value
    return dragState;
}

export const scaleImage = (ctx, canvas, img, offsetX= 0) => {
    // fit the image inside the canvas to prevent distorsion
    const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;

    // center horizontally
    const x = offsetX + (canvas.width - w) / 2;
    // center vertically
    const y = (canvas.height - h) / 2; 
    
    ctx.drawImage(img, x, y, w, h);
}