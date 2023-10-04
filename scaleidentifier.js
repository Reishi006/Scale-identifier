class Tuning {
    constructor() {
        this.string1 = string1;
        this.string2 = string2;
        this.string3 = string3;
        this.string4 = string4;
        this.string5 = string5;
        this.string6 = string6;
    }
}

const Estandard = new Tuning(notes[4], notes[11], notes[7], notes[2], notes[9], notes[4]);
const DStandard = new Tuning(notes[3], notes[10], notes[6], notes[1], notes[8], notes[3]);

/* let Estandard = {
    string1: notes[4],
    string2: notes[11],
    string3: notes[7],
    string4: notes[2],
    string5: notes[9],
    string6: notes[4]
} */


let notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
let stepsMajor = [0, 1, 1, 0, 1, 1, 1]; //0 - half step; 1 - whole step;
let interval = 7;
//0_2_4_5_7_9_11
let j = 0;
for (let i = 0; i < interval+stepsMajor.length-2; i++) {
    console.log(`${i}, ${notes[i+stepsMajor[j]]}`);
    i = i + stepsMajor[j];
    j++;
}
j = 0;

let container = document.getElementById('container');
let fretIndicator = document.getElementById('fret-indicators');
let input = document.getElementById('fretRange');
let val = document.getElementById('value');

let maxFrets = input.value;
let beforeFrets = maxFrets;

let stringNum = 1;
let fretNum = 1;

let fretHighlight = [3, 5, 7, 12, 15, 17, 19, 21, 24];
let fretCheck = false;


function generateTuningNotes() {

}

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
        svg.setAttribute('height', '30px');

        line.setAttribute('x1', '0');
        line.setAttribute('x2', '100%');
        line.setAttribute('y1', '50%');
        line.setAttribute('y2', '50%');
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
        document.getElementById(`${stringNum}_${fretNum}`).removeEventListener('click', function () {removeCircle()});
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
                if (fretHighlight.includes(i)) {
                    div.style.fontWeight = 'bold';
                    div.style.fontStyle = 'italic';
                    div.style.fontSize = 'larger';
                }
                
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
        console.log(`fret${i} indicator removal`);
    }
}

function createCircle(stringNo, fretNo) {
    let circleExist = document.querySelector(`div[id="${stringNo}_${fretNo}"] > svg[class="string"] > circle`); //circle > [id="${stringNo}_${fretNo}"] > [class="string"]
    console.log(`CIRCLEEXIST: ${circleExist}`);
    
    if (circleExist == null) {
        let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        let text = document.createElementNS('http://www.w3.org/2000/svg','text');

        circle.setAttribute('cx', '50%');
        circle.setAttribute('cy', '50%');
        circle.setAttribute('r', '42%');
        circle.setAttribute('stroke', 'darkblue');
        circle.setAttribute('stroke-width', '3px');
        circle.setAttribute('fill', 'lightblue');

        text.setAttribute('x', '25%');
        text.setAttribute('y', '67.7%');
        text.setAttribute('fill', 'black');
        text.textContent = `${notes[3]}`;
        text.setAttribute('font-size', '13px');

        container.querySelector(`[id="${stringNo}_${fretNo}"] > [class="string"]`).appendChild(circle);
        container.querySelector(`[id="${stringNo}_${fretNo}"] > [class="string"]`).appendChild(text);
        console.log('clicked');
    } else {
        removeCircle(stringNo, fretNo);
    }
}


function removeCircle(stringNo, fretNo) {
    document.getElementById(`${stringNo}_${fretNo}`).removeEventListener('click', function () {createCircle()});
    container.querySelector(`div[id="${stringNo}_${fretNo}"] > svg[class="string"] > circle`).remove();
    console.log(`circle with id="${stringNo}_${fretNo}" removed`);
}

function removeAllCircles(stringNo, fretNo) {
    for (let i = 1; i <= stringNo; i++) {
        for (j = 1; j <= fretNo; j++) {
            let circleExist = document.querySelector(`div[id="${i}_${j}"] > svg[class="string"] > circle`);
            if (circleExist != null) {
            console.log(`isnt null`);
            removeCircle(i, j);
            }
        }
    }
    console.log(`allcircles removed`);
}

document.addEventListener('load', divOnload());
