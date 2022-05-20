let width = 700,
    resolution = 16,
    draw = false,
    drawMode = "paint",
    sketchPad = document.querySelector('#sketchpad'),
    colorPalette = document.querySelector('#palette'),
    pixels,
    colors = ["#E90000", // Red
            "#FF4F06", // Orange
            "#FBC01E", // Yellow
            "#66BF1D", // Green
            "#1AC370", // Cyan
            "#00B7F0", // Light Blue
            "#1C67FF", // Blue
            "#3737FF", // Indigo
            "#E734FF", // Pink
            "#E4005A", // Fuchsia
            "#303646", // Grey
            "#000000"], // Black
    colorTile,
    currentColor = colors[11],
    dodge = false,
    burn = false,
    random = false;
const fillBtn = document.querySelector('#fillBtn'),
      eraseBtn = document.querySelector('.erase'),
      dodgeBtn = document.querySelector('.dodge'),
      burnBtn = document.querySelector('.burn'),
      randomBtn = document.querySelector('.random');
randomBtn.setAttribute('style',`background: linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]}, ${colors[4]}, ${colors[5]}, ${colors[6]}, ${colors[7]}, ${colors[8]}, ${colors[9]});`);

function fillGrid() {
    resolution = document.getElementById('gridSize').value
    sketchPad = document.querySelector('#sketchpad');
    sketchPad.innerHTML = '';
    console.log(width+10);
    document.getElementById('gridSize').value = resolution;

    sketchPad.setAttribute('style', 'width: '+width+'px; height: '+width+'px; grid-template-columns: repeat('+resolution+', 1fr); grid-template-rows: repeat('+resolution+', 1fr);');

    document.getElementById('details').setAttribute('style', 'width: '+(width)+'px;');

    for (let xy = 0; xy < resolution*resolution; xy++) {
        createPixels();
    }
    pixelDraw();
    createColors();
    document.getElementById(currentColor).classList.add('colorClicked');
    return;
};


function createPixels() {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    // newPixel.setAttribute('style', 'background-color: '+randColor()+';');
    newPixel.innerHTML = '';
    sketchPad.appendChild(newPixel);
};

function createColors() {
    let colorPalette = document.querySelector('#palette');
    colorPalette.innerHTML = '';
    let numColors = colors.length+1;
    console.log(numColors);

    colorPalette.setAttribute('style', 'width: '+(numColors*10)+'px; grid-template-columns: repeat('+(numColors/2)+', 1fr); grid-template-rows: repeat(2, 1fr);');

    colors.forEach((color) => {
        const newColor = document.createElement('div');
        newColor.classList.add('color');
        newColor.setAttribute('id',color);
        newColor.setAttribute('style','background-color: '+color);
        newColor.innerHTML = '';
        colorPalette.appendChild(newColor);
    });
    colorTile = document.querySelectorAll('.color');
    colorTile.forEach((colorTile) => {
        colorTile.addEventListener('click', function (e) {
            clearMode();
            currentColor = e.target.id;
            e.target.classList.add('colorClicked');
        });
    });
};

function clearColor() {
    colorTile.forEach((colorTile) => {
        colorTile.classList.remove('colorClicked');
    });
};

function clearMode() {
    drawMode = "paint";
    eraseBtn.classList.remove('eraseClicked');
    dodgeBtn.classList.remove('dodgeClicked');
    burnBtn.classList.remove('burnClicked');
    randomBtn.classList.remove('randomClicked');
    clearColor();
};

function lightenColor(col) {
    let rgb = col.slice(4).replace(/\s/g, "").slice(0, -1).split(',');
    for (let i = 0; i < 3; i++) {
        rgb[i] = parseInt(rgb[i]);
        if ((rgb[i] + 10) <= 255) {
            rgb[i] = Math.ceil(rgb[i] + 10);
        } else {
            rgb[i] = 255;
        }
        console.log(rgb[i]);
    }
    console.log(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

function darkenColor(col) {
    let rgb = col.slice(4).replace(/\s/g, "").slice(0, -1).split(',');
    for (let i = 0; i < 3; i++) {
        rgb[i] = parseInt(rgb[i]);
        if ((rgb[i] - 10) >= 0) {
            rgb[i] = Math.ceil(rgb[i] - 10);
        } else {
            rgb[i] = 0;
        }
        console.log(rgb[i]);
    }
    console.log(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

function randColor() {
    let color = Math.floor(Math.random() * 9) + 1;
    return colors[color];
};

function startDrawing() {
    draw = true;
};

function stopDrawing() {
    draw = false;
};

function pixelDraw() {
    pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixels) => {
        pixels.addEventListener('mouseover', function (e) {
            if (draw == false) {
                return;
            }
            console.log(draw);
            switch (drawMode) {
                case "paint":
                    e.target.style.backgroundColor = currentColor;
                    e.target.classList.add('noBorder');
                    break;
                case "erase":
                    e.target.style.backgroundColor = ""
                    e.target.classList.remove('noBorder');
                    break;
                case "dodge":
                    if (e.target.style.backgroundColor == "") {
                        break;
                    }
                    currentColor = lightenColor(e.target.style.backgroundColor);
                    e.target.style.backgroundColor = currentColor;
                    e.target.classList.add('noBorder');
                    break;
                case "burn":
                    if (e.target.style.backgroundColor == "") {
                        break;
                    }
                    currentColor = darkenColor(e.target.style.backgroundColor);
                    e.target.style.backgroundColor = currentColor;
                    e.target.classList.add('noBorder');
                    break;
                case "random":
                    currentColor = randColor();
                    while (e.target.style.backgroundColor == currentColor) {
                        currentColor = randColor();
                        if (e.target.style.backgroundColor != currentColor) {
                            break;
                        }
                    }
                    e.target.classList.add('noBorder');
                    e.target.style.backgroundColor = currentColor;
                    break;
            }
           
           
            /* if (draw == false) {
                console.log(draw);
                return;
            } else {
                console.log(draw);
                if (e.target.style.backgroundColor == "") {
                    return;
                }
                if (dodge == true) {
                    if (e.target.style.backgroundColor == "") {
                        return;
                    }
                    console.log(e.target.style.backgroundColor);
                    currentColor = lightenColor(e.target.style.backgroundColor);
                }
                if (burn == true) {
                    if (e.target.style.backgroundColor == "") {
                        return;
                    }
                    console.log(e.target.style.backgroundColor);
                    currentColor = darkenColor(e.target.style.backgroundColor);
                }
                if (random == true) {
                    console.log(e.target.style.backgroundColor);
                    currentColor = randColor();
                    while (e.target.style.backgroundColor == currentColor) {
                        currentColor = randColor();
                        if (e.target.style.backgroundColor != currentColor) {
                            break;
                        }
                    }
                }
                e.target.style.backgroundColor = currentColor;
                e.target.style.border = '#eee 0px solid';
            }; */
        });
        pixels.addEventListener('mousedown', function (e) {
            startDrawing();
            if (draw == false) {
                return;
            }
            console.log(draw);
            switch (drawMode) {
                case "paint":
                    e.target.style.backgroundColor = currentColor;
                    e.target.classList.add('noBorder');
                    break;
                case "erase":
                    e.target.style.backgroundColor = ""
                    e.target.classList.remove('noBorder');
                    break;
                case "dodge":
                    if (e.target.style.backgroundColor == "") {
                        break;
                    }
                    currentColor = lightenColor(e.target.style.backgroundColor);
                    e.target.style.backgroundColor = currentColor;
                    e.target.classList.add('noBorder');
                    break;
                case "burn":
                    if (e.target.style.backgroundColor == "") {
                        break;
                    }
                    currentColor = darkenColor(e.target.style.backgroundColor);
                    e.target.style.backgroundColor = currentColor;
                    e.target.classList.add('noBorder');
                    break;
                case "random":
                    currentColor = randColor();
                    while (e.target.style.backgroundColor == currentColor) {
                        currentColor = randColor();
                        if (e.target.style.backgroundColor != currentColor) {
                            break;
                        }
                    }
                    e.target.classList.add('noBorder');
                    e.target.style.backgroundColor = currentColor;
                    break;
            }
        });
    });
};

document.addEventListener("dragstart", preventDrag);
function preventDrag(event) {
    event.preventDefault();
}

function enableErase() {
    clearMode();
    drawMode = "erase";
    eraseBtn.classList.add('eraseClicked');
    return;
}

function enableDodge() {
    clearMode();
    drawMode = "dodge";
    dodgeBtn.classList.add('dodgeClicked');
    return;
}

function enableBurn() {
    clearMode();
    drawMode = "burn";
    burnBtn.classList.add('burnClicked');
    return;
}

function enableRandom() {
    clearMode();
    drawMode = "random";
    randomBtn.classList.add('randomClicked');
    return;
}

sketchPad.addEventListener('mousedown', startDrawing);
sketchPad.addEventListener('mouseup', stopDrawing);
sketchPad.addEventListener('mouseleave', stopDrawing);

fillBtn.addEventListener('click', fillGrid);

eraseBtn.addEventListener('click', enableErase);
dodgeBtn.addEventListener('click', enableDodge);
burnBtn.addEventListener('click', enableBurn);
randomBtn.addEventListener('click', enableRandom);

fillGrid();