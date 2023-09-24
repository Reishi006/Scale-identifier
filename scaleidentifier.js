//TESTS
function createDiv() {

    let container = document.getElementById('container');
    let div = document.createElement('div');

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let line = document.createElementNS('http://www.w3.org/2000/svg','line');

    /* div.setAttribute('style', 
    'max-width: 100px; max-height: 3px; margin: 20px 0px; padding: 0; height: 3px;'); */

    //div.style.cssText = 'max-width: 100px; max-height: 3px; margin: 20px 0px; padding: 0; height: 3px;';

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
    console.log(`created`);
}

document.addEventListener('load', createDiv());
