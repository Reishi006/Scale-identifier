let notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
let stepsMajor = [0, 1, 1, 0, 1, 1, 1]; //0 - half step; 1 - whole step; 2- 1.5 steps
let stepsHminor = [0, 1, 0, 1, 1, 0, 2]; 
let interval = 7;
//0_2_4_5_7_9_11

let eStandard = [4, 11, 7, 2, 9, 4];
let dStandard = [3, 10, 6, 1, 8, 3];
let dropD = [4, 11, 7, 2, 9, 2];

let j = 0;
console.log(`C Major:`);
for (let i = 0; i < interval + stepsMajor.length - 2; i++) {
    console.log(`${i}, ${notes[i + stepsMajor[j]]}`);
    i = i + stepsMajor[j];
    j++;
}
j = 0;

console.log(`C Hminor:`);
for (let i = 0; i < interval + stepsHminor.length - 2; i++) {
    console.log(`${i}, ${notes[i + stepsHminor[j]]}`);
    i = i + stepsHminor[j];
    j++;
}
j = 0;

let clickedTuningNote = document.querySelectorAll(`article[id="container"] > div`);

let clickedNote = document.querySelectorAll(`article[id="notes"] > div`);
let clickedScale = document.querySelectorAll(`article[id="scales"] > div`);

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


function changeTuning() {
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 24; j++) {
            let text = container.querySelector(`[id="${i}_${j}"] > [class="string"] > text`);
            let circleExist = document.querySelector(`[id="${i}_${j}"] > [class="string"] > circle`);
            if (circleExist != null) {
                text.textContent = `${countNote(i, j)}`;
                if (countNote(i, j).indexOf('#') == -1) text.setAttribute('x', '35%'); //centering a note letter in case it takes 'one space'
                else text.setAttribute('x', '25%'); // centering a note letter in case it takes 'two spaces' like a sharp note or flat
                console.log(`countNote inside changeTuning: ${countNote(i, j)}`); //^ the 'if else' statement occurs also in createCircle() the same way as shown here
            }
        }
    }
    for (let i = 1; i <= 6; i++) {
        let tune = document.getElementById(`${i}_0`);
        let selectTuning = document.querySelector('#tunings');
        console.log(notes[eval(selectTuning.options[selectTuning.selectedIndex].value + '[i-1]')]);
        output = notes[eval(selectTuning.options[selectTuning.selectedIndex].value + '[i-1]')];
        tune.textContent = output;
    }
    console.log(`tuning changed`);
}

function countNote(stringNo, fretNo) {
    //TESTS (not tests anymore, it works!)
    let selectTuning = document.querySelector('#tunings');
    let noteIndex = eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1] + fretNo');

    if (noteIndex < 12) output = notes[eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1] + fretNo')];
    else if (noteIndex >= 12 && noteIndex < 24) output = notes[eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1] + fretNo - 12')];
    else if (noteIndex >= 24) output = notes[eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1] + fretNo - 24')];
    
    //output = notes[eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1] + fretNo-12')];
    console.log(`toNoteIndex: ${eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1] + fretNo')}`)
    console.log(`Output: ${output}`);
    console.log(`notes eval countNote ${notes[eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1]')]}`);
    //let noteIndex = notes.findIndex(eval(selectTuning.options[selectTuning.selectedIndex].value + '[stringNo-1]'));
    //console.log(`noteIndex ${noteIndex}`);
    return output;
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
        svg.setAttribute('display', 'block');

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

function createFret(stringNo, fretNo) {
    let fretExist = document.querySelector(`div[id="${stringNo}_${fretNo}"] > svg[class="string"] > line[id="fret${fretNo}"]`);
    if (fretExist == null) {
        let fretDiv = document.querySelector(`div[id="${stringNo}_${fretNo}"] > svg[class="string"]`);

        let fretLine = document.createElementNS('http://www.w3.org/2000/svg','line');

        fretLine.setAttribute('id', `fret${fretNo}`);
        fretLine.setAttribute('x1', '95%');
        fretLine.setAttribute('x2', '95%');
        fretLine.setAttribute('y1', '0');
        fretLine.setAttribute('y2', '100%');
        fretLine.setAttribute('stroke', 'darkblue');
        fretLine.setAttribute('stroke-width', '5px');
        fretLine.setAttribute('stroke-linecap', 'round');

        fretDiv.appendChild(fretLine);
    }
}

function createDiv(num) {

    val.textContent = num;

    createString(stringNum, fretNum);

    createFret(stringNum, fretNum);

    stringNum++;
    if (stringNum > 6) {
        stringNum = 1;
        if (fretNum < num) fretNum++;
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
            let fretExist = document.getElementById(`fretno${i}`)
            if (fretExist == null) {
                let div = document.createElement('div');
                console.log(frets);
                div.textContent = i;
                if (fretHighlight.includes(i)) {
                    div.style.fontWeight = 'bold';
                    div.style.fontStyle = 'italic';
                    div.style.fontSize = 'larger';
                }
                
                div.setAttribute('id', `fretno${i}`);
        
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

        if (countNote(stringNo, fretNo).indexOf('#') == -1) text.setAttribute('x', '35%'); //centering a note letter in case it takes 'one space'
        else text.setAttribute('x', '25%'); // centering a note letter in case it takes 'two spaces' like a sharp note or flat
        text.setAttribute('y', '67.7%');
        text.setAttribute('fill', 'black');
        text.textContent = `${countNote(stringNo, fretNo)}`;
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
    container.querySelector(`[id="${stringNo}_${fretNo}"] > [class="string"] > text`).remove();
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

    for (let i = 1; i <= 6; i++) {
        let cTN = document.querySelector(`article[id="container"] > div[id="${i}_0"]`); //clickedTuningNote
        console.log(`cTN${cTN}`);
        if (cTN.style.border != null) {
            cTN.style.border = 'none';
            cTN.style.backgroundColor = '';
        }
    }
    console.log(`allcircles removed`);
}

//TESTING NEWER FEATURES/IDEAS
/* const highlightNote = () => {
    
    clickedNote.style.fontWeight = 'bold';
    console.log(clickedNote.textContent);
} */

clickedTuningNote.forEach((tnote) => {
    tnote.addEventListener('click', () => {
        if (tnote.style.backgroundColor != 'lightblue') {
            tnote.style.border = '3px solid darkblue';
            tnote.style.backgroundColor = 'lightblue';
        }
        else {
            tnote.style.border = 'none';
            tnote.style.backgroundColor = '';
        }
        console.log("forEach with notes worked");
    })
})

clickedNote.forEach((note) => {
    note.addEventListener('click', () => {
        clickedNote.forEach((note) => {
            note.style.fontWeight = 'normal';
            note.style.backgroundColor = '';
        })
        if (note.style.fontWeight != 'bold') {
            note.style.fontWeight = 'bold';
            note.style.backgroundColor = 'rgb(30, 196, 187)';
        }
        else {
            note.style.fontWeight = 'normal';
            note.style.backgroundColor = '';
        }
        console.log("forEach with notes worked");
    });
});

clickedScale.forEach((scale) => {
    scale.addEventListener('click', () => {
        clickedScale.forEach((scale) => {
            scale.style.color = 'black';
            scale.style.backgroundColor = '';
        })
        if (scale.style.color != 'rgb(211, 240, 238)') {
            scale.style.color = 'rgb(211, 240, 238)';
            scale.style.backgroundColor = 'rgb(22, 148, 142)';
        }
        else {
            scale.style.color = 'black';
            scale.style.backgroundColor = '';
        }
        console.log("forEach with scales worked");
    });
});

document.addEventListener('load', divOnload());
