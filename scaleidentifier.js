let container = document.getElementById('container');
let input = document.getElementById('fretRange');

let maxFrets = input.value;
let countFrets = 0;
let createdCheck = false;

let stringNum = 1;
let fretNum = 1;


//TESTS

function fretLimit() {
    maxFrets = input.value;
    console.log(`count:${countFrets}`);
    createDiv(maxFrets);
    console.log(`maxFrets ${maxFrets}`);
    countFrets = maxFrets;
    
}


function createDiv(num) {
    
    if (num > countFrets && createdCheck == false) {
        //console.log(`fretNum in createDiv if statement: ${fretNum}`);
        /* if (createdCheck == true) {
            num = (maxFrets - countFrets) * 6;
            console.log(`num ${num}`);
        } */
        //console.log(`num ${num} countFrets ${countFrets} = ${(num - countFrets) * 6}`);

        for (let i = 1; i <= ((num - countFrets) * 6); i++) {
            let div = document.createElement('div');
    
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let line = document.createElementNS('http://www.w3.org/2000/svg','line');
    
            /* div.setAttribute('style', 
            'max-width: 100px; max-height: 3px; margin: 20px 0px; padding: 0; height: 3px;'); */
    
            //div.style.cssText = 'max-width: 100px; max-height: 3px; margin: 20px 0px; padding: 0; height: 3px;';

            let existCheck = document.getElementById(`${stringNum}_${fretNum}`);

            if (!existCheck) {
                div.setAttribute('id', `${stringNum}_${fretNum}`);

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
        
            }
            stringNum++;
            if (stringNum > 6) {
                stringNum = 1;
                if (fretNum < num) {
                    fretNum++;
                }
            }

            //countFrets = num;
            if (fretNum == 24) createdCheck = true;
            console.log(`created ${i}`);
            
        }
    }
    else if (num < countFrets) {
        /* for (let i = 0; i < countFrets - num; i++) {
            for (let j = 0; j < 5; j++) {
                console.log(`ELSE IF FRETNUM ${stringNum+j}_${fretNum-i}`);
                document.getElementById(`${stringNum+j}_${fretNum-i}`).remove();
                console.log(document.getElementById(`${stringNum-j}_${fretNum-i}`))
            }
            
        } */
        /* console.log(document.getElementById(`${stringNum}_${fretNum}`));
        console.log(`strNumfretNum ${stringNum}_${fretNum}`); */

        for (let i = 0; i <= countFrets - num; i++) {
            for (let j = 0; j <= 5; j++) {
                //document.getElementById(`${stringNum+j}_${fretNum-i}`).remove();
                console.log(`i: ${fretNum-i} j: ${stringNum+j}`);
            }
        }
    }
    else {
        return;
    }
}
    


document.addEventListener('change', fretLimit());
document.addEventListener('load', createDiv(maxFrets));
