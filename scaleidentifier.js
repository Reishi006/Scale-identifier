let container = document.getElementById('container');
let fretIndicator = document.getElementById('fret-indicators');
let input = document.getElementById('fretRange');
let val = document.getElementById('value');

let maxFrets = input.value;
let beforeFrets = maxFrets;

let stringNum = 1;
let fretNum = 1;

let fretCheck = false;


function fretLimit() {
    
    beforeFrets = maxFrets;
    maxFrets = input.value;

    if (beforeFrets < maxFrets) {
        for (let i = 1; i < maxFrets * 6; i++) {
            createDiv(maxFrets);
        }
        fretCheck = false;
        createIndicators(maxFrets);
    } else if (beforeFrets > maxFrets) {
        removeDiv(maxFrets);

        removeIndicators(maxFrets);
    }
    
    
}


function createDiv(num) {

    val.textContent = num;

    createString(stringNum, fretNum);

    stringNum++;
    if (stringNum > 6) {
        stringNum = 1;
        if (fretNum < num) fretNum++;
    }
}


function createString(stringNo, fretNo) {
    let existCheck = document.getElementById(`${stringNo}_${fretNo}`);

    if (existCheck == null) {
        let div = document.createElement('div');
        
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let line = document.createElementNS('http://www.w3.org/2000/svg','line');
        
        
        div.setAttribute('id', `${stringNo}_${fretNo}`);
        console.log(`${stringNo}_${fretNo} has been created`);

        svg.classList.add('string');

        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        line.setAttribute('x1', '0');
        line.setAttribute('x2', '100%');
        line.setAttribute('y1', '1');
        line.setAttribute('y2', '1');
        line.setAttribute('stroke', 'blue');
        line.setAttribute('stroke-width', '3px');

        container.appendChild(div);
        div.appendChild(svg);
        svg.appendChild(line);

        document.getElementById(`${stringNo}_${fretNo}`).addEventListener('click', function () {createCircle(stringNo, fretNo)});

        //--------------------MIGHT BE USEFUL-----------------
        //DIVS LATER TO BE REMOVED/ADJUSTED ---> REMOVE DIVS KEEP SVGS AS ID HOLDERS
    }
}

function divOnload() {
    for (let i = 1; i <= maxFrets * 6; i++) {
        createDiv(maxFrets);
    }
    createIndicators(maxFrets);
}

function removeDiv(num) {
    val.textContent = num;
    stringNum = 6;
    for (let i = beforeFrets * 6; i > num * 6; i--) {
        document.getElementById(`${stringNum}_${fretNum}`).removeEventListener('click', function () {createCircle()});
        document.getElementById(`${stringNum}_${fretNum}`).remove();
        console.log(`${stringNum}_${fretNum} has been removed`);
        stringNum--;
        if (stringNum < 1) {
            stringNum = 6;
            fretNum--;
        }
    }
}

function createIndicators(frets) {
    if (fretCheck == false) {
        for (let i = 1; i <= frets; i++) {
            let fretExist = document.getElementById(`fret${i}`)
            if (fretExist == null) {
                let div = document.createElement('div');
                console.log(frets);
                div.textContent = i;
                if (i == 3) div.setAttribute('background-color', 'red');
                
                div.setAttribute('id', `fret${i}`);
        
                fretIndicator.appendChild(div);
            }
        }
    }
    
    fretCheck = true;
}

function removeIndicators(frets) {
    for (let i = beforeFrets; i > frets; i--) {
        document.getElementById(`fret${i}`).remove();
        console.log(`fret${i} indicator removing`);
    }
}

function createCircle(stringNo, fretNo) {
    let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');

    circle.setAttribute('cx', '50%');
    circle.setAttribute('cy', '0%');
    circle.setAttribute('r', '12%');
    circle.setAttribute('stroke', 'darkblue');
    circle.setAttribute('stroke-width', '3px');
    circle.setAttribute('fill', 'lightblue');

    container.querySelector(`[id="${stringNo}_${fretNo}"] > [class="string"]`).appendChild(circle);
    console.log('clicked');
}

document.addEventListener('load', divOnload());
