let container = document.getElementById('container');
let input = document.getElementById('fretRange');

let maxFrets = input.value;
let countFrets = maxFrets;

let stringNum = 1;


//TESTS

function fretLimit() {
    maxFrets = input.value;
    //console.log(`count:${countFrets}`);
    createDiv(maxFrets);
    console.log(maxFrets);
    
}


function createDiv(num) {
    
    if (maxFrets > countFrets) {
        for (let i = 1; i <= num*6; i++) {
            let div = document.createElement('div');
    
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let line = document.createElementNS('http://www.w3.org/2000/svg','line');
    
            /* div.setAttribute('style', 
            'max-width: 100px; max-height: 3px; margin: 20px 0px; padding: 0; height: 3px;'); */
    
            //div.style.cssText = 'max-width: 100px; max-height: 3px; margin: 20px 0px; padding: 0; height: 3px;';

            div.setAttribute('id', `id${stringNum}`);

            stringNum++;
            if (stringNum > 6) stringNum = 1; 
    
            svg.classList.add('string');
            //svg.style.cssText = 'width:100%;height:100%;';
    
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
    
            line.setAttribute('x1', '0');
            line.setAttribute('x2', '100%');
            line.setAttribute('y1', '1');
            line.setAttribute('y2', '1');
            line.setAttribute('stroke', 'blue');
            line.setAttribute('stroke-width', '3px');
            //line.style.cssText = 'stroke: blue; stroke-width: 3px;';
    
            container.appendChild(div);
            div.appendChild(svg);
            svg.appendChild(line);
    
            countFrets = maxFrets;
    
            console.log(`created ${i}`);
        }
    }
    else if (maxFrets < countFrets) {
        document.getElementById(`id${stringNum}`).remove();
    }
    
}
    


document.addEventListener('change', fretLimit());
document.addEventListener('load', createDiv());
