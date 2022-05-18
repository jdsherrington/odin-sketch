let width = 700,
    resolution = 16,
    drawMode = false,
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

    colorPalette.setAttribute('style', 'width: '+(numColors*14)+'px; grid-template-columns: repeat('+(numColors/2)+', 1fr); grid-template-rows: repeat(2, 1fr);');

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
        colorTile.addEventListener('click', function (c) {
            clearColor();
            currentColor = c.target.id;
            c.target.classList.add('colorClicked');
            disableDodgeBurnRandom();
            lightenColor(currentColor);
        });
    });
};

function clearColor() {
    colorTile.forEach((colorTile) => {
        colorTile.classList.remove('colorClicked');
    });
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
    drawMode = true;
};

function stopDrawing() {
    drawMode = false;
};

function pixelDraw() {
    pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixels) => {
        pixels.addEventListener('mouseover', function (e) {
            if (drawMode == false) {
                console.log(drawMode);
                return;
            } else {
                console.log(drawMode);
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
            };
        });
        pixels.addEventListener('mousedown', function (c) {
                console.log(drawMode);
                if (dodge == true) {
                    if (c.target.style.backgroundColor == "") {
                        return;
                    }
                    console.log(c.target.style.backgroundColor);
                    currentColor = lightenColor(c.target.style.backgroundColor);
                }
                if (burn == true) {
                    if (c.target.style.backgroundColor == "") {
                        return;
                    }
                    console.log(c.target.style.backgroundColor);
                    currentColor = darkenColor(c.target.style.backgroundColor);
                }
                if (random == true) {
                    console.log(c.target.style.backgroundColor);
                    currentColor = randColor();
                    while (c.target.style.backgroundColor == currentColor) {
                        currentColor = randColor();
                        if (c.target.style.backgroundColor != currentColor) {
                            break;
                        }
                    }
                }
                c.target.style.backgroundColor = currentColor;
                c.target.style.border = '#eee 0px solid';
        });
    });
};

document.addEventListener("dragstart", preventDrag);
function preventDrag(event) {
    event.preventDefault();
}

fillGrid();

function enableDodge() {
    dodge = true;
    burn = false;
    random = false;
    clearColor();
    dodgeBtn.classList.add('dodgeClicked');
    burnBtn.classList.remove('burnClicked');
    randomBtn.classList.remove('randomClicked');
    return;
}

function enableBurn() {
    dodge = false;
    burn = true;
    random = false;
    clearColor();
    dodgeBtn.classList.remove('dodgeClicked');
    burnBtn.classList.add('burnClicked');
    randomBtn.classList.remove('randomClicked');
    return;
}

function enableRandom() {
    dodge = false;
    burn = false;
    random = true;
    clearColor();
    dodgeBtn.classList.remove('dodgeClicked');
    burnBtn.classList.remove('burnClicked');
    randomBtn.classList.add('randomClicked');
    return;
}

function disableDodgeBurnRandom() {
    dodgeBtn.classList.remove('dodgeClicked');
    burnBtn.classList.remove('burnClicked');
    randomBtn.classList.remove('randomClicked');
    dodge = false;
    burn = false;
    random = false;
    return;
}

sketchPad.addEventListener('mousedown', startDrawing);
sketchPad.addEventListener('mouseup', stopDrawing);
sketchPad.addEventListener('mouseleave', stopDrawing);
fillBtn.addEventListener('click', fillGrid);
dodgeBtn.addEventListener('click', enableDodge);
burnBtn.addEventListener('click', enableBurn);
randomBtn.addEventListener('click', enableRandom);