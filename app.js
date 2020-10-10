//resize window
{
let mc8 = document.querySelector(".mc8");
let style = document.querySelector("style");


window.addEventListener('DOMContentLoaded', function () {
    if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 3vw;} .h2mov{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw}";
        
    } else{
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 4.3125vh;} .h2mov{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh}";
    }  
});

window.addEventListener('resize', function () {
    if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 3vw;} .h2mov{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw}";
        
    } else{
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 4.3125vh;} .h2mov{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh}";
    }  
});
}





//program
let IO1 = document.getElementById('IO1');
let I02 = document.getElementById('IO2');
let I03 = document.getElementById('IO3');
let A = document.getElementById('A');
let c_flag = document.getElementById('c_flag');
let z_flag = document.getElementById('z_flag');
let p_flag = document.getElementById('p_flag');
let s_flag = document.getElementById('s_flag');
let B = document.getElementById('B');
let C = document.getElementById('C');
let HL = document.getElementById('HL');
let IX = document.getElementById('IX');
let SP = document.getElementById('SP');
let PC = document.getElementById('PC');
let ZR = document.getElementById('ZR');
let IR = document.getElementById('IR');
let mc8Command = document.getElementById('mc8Command');
let commandNumber = document.getElementById('commandNumber');
let commandStep = document.getElementById('commandStep');
let WR = document.getElementById('WR');
let RD = document.getElementById('RD');
let M = document.getElementById('M');
let IO = document.getElementById('IO');
let rom = document.querySelector(".Adresse-000x-1FFx");
let ram = document.getElementsByClassName("Adresse-200x-3FFx");
let romArray = ['3E','12','06','22'];
let romPoints = [];
let ramArray = [];

const commands = [
    {
        label: "Hole den nächsten Befehl",
        assemb: "",
        flags: false,
        index: 0,
        wr: "1",
        rd: "0",
        m: "0",
        io: "1",
    },
    {
        label: "Erhöhe den Programmzähler um 1",
        assemb: "",
        machine: "",
        flags: false,
        index: 1,
        wr: "",
        rd: "",
        m: "",
        io: "",
    },
    {
        label: "Erkenne den Befehl",
        assemb: "",
        maschine: "",
        flags: false,
        index: 2,
        wr: "",
        rd: "",
        m: "",
        io: "",
    },
    {
        label: "Hole den Parameter",
        assemb: "MOV A,dat_8",
        maschine: "3E",
        flags: false,
        wr: "",
        rd: "",
        m: "",
        io: "",
    },

];

const fixPoints = [
    {
        x: 10,
        y: 2,
        index: 0,
        label: "ROM1",
        parent: -1,
        childs: [1]
    },
    {
        x: 14,
        y: 2,
        index: 1,
        label: "",
        parent: 0,
        childs: [2,4]
    },
    {
        x: 14,
        y: 0,
        index: 2,
        label: "",
        parent: 2,
        childs: [3]
    },
    {
        x: 16,
        y: 0,
        index: 3,
        label: "IO1",
        parent: 2,
        childs: []
    },
    {
        x: 18,
        y: 2,
        index: 4,
        label: "",
        parent: 1,
        childs: [5,12]
    },
    {
        x: 22,
        y: 2,
        index: 5,
        label: "",
        parent: 4,
        childs: [6,8]
    },
    {
        x: 22,
        y: 0,
        index: 6,
        label: "",
        parent: 5,
        childs: [7]
    },
    {
        x: 24,
        y: 0,
        index: 7,
        label: "IO2",
        parent: 6,
        childs: []
    },
    {
        x: 30,
        y: 2,
        index: 8,
        label: "",
        parent: 5,
        childs: [9,11]
    },
    {
        x: 30,
        y: 0,
        index: 9,
        label: "",
        parent: 8,
        childs: [10]
    },
    {
        x: 32,
        y: 0,
        index: 10,
        label: "IO3",
        parent: 9,
        childs: []
    },
    {
        x: 34,
        y: 2,
        index: 11,
        label: "RAM1",
        parent: 8,
        childs: []
    },
    {
        x: 18,
        y: 4,
        index: 12,
        label: "",
        parent: 3,
        childs: [13,23]
    },
    {
        x: 24,
        y: 4,
        index: 13,
        label: "",
        parent: 12,
        childs: [14,15]
    },
    {
        x: 24,
        y: 6,
        index: 14,
        label: "ALU1",
        parent: 13,
        childs: []
    },
    {
        x: 30,
        y: 4,
        index: 15,
        label: "",
        parent: 13,
        childs: [16,17]
    },
    {
        x: 30,
        y: 6,
        index: 16,
        label: "ALU2",
        parent: 15,
        childs: []
    },
    {
        x: 34,
        y: 4,
        index: 17,
        label: "",
        parent: 15,
        childs: [18]
    },
    {
        x: 34,
        y: 12,
        index: 18,
        label: "",
        parent: 17,
        childs: [19,21]
    },
    {
        x: 27,
        y: 12,
        index: 19,
        label: "",
        parent: 18,
        childs: [20]
    },
    {
        x: 27,
        y: 10,
        index: 20,
        label: "ALUOUT",
        parent: 19,
        childs: []
    },
    {
        x: 34,
        y: 14,
        index: 21,
        label: "",
        parent: 18,
        childs: [22]
    },
    {
        x: 32,
        y: 14,
        index: 22,
        label: "SW",
        parent: 21,
        childs: []
    },
    {
        x: 13,
        y: 4,
        index: 23,
        label: "",
        parent: 12,
        childs: [24,25]
    },
    {
        x: 13,
        y: 6,
        index: 24,
        label: "A",
        parent: 23,
        childs: []
    },
    {
        x: 10,
        y: 4,
        index: 25,
        label: "",
        parent: 23,
        childs: [26]
    },
    {
        x: 10,
        y: 15,
        index: 26,
        label: "",
        parent: 25,
        childs: [27]
    },
    {
        x: 14,
        y: 15,
        index: 27,
        label: "",
        parent: 26,
        childs: [28,33]
    },
    {
        x: 14,
        y: 14,
        index: 28,
        label: "IX",
        parent: 27,
        childs: [29]
    },
    {
        x: 14,
        y: 12,
        index: 29,
        label: "HL",
        parent: 28,
        childs: [30]
    },
    {
        x: 14,
        y: 10,
        index: 30,
        label: "",
        parent: 29,
        childs: [31,32]

    },
    {
        x: 13,
        y: 10,
        index: 31,
        label: "B",
        parent: 30,
        childs: [32]
    },
    {
        x: 15,
        y: 10,
        index: 32,
        label: "C",
        parent: 30,
        childs: []
    },
    {
        x: 14,
        y: 16,
        index: 33,
        label: "SP",
        parent: 27,
        childs: [34]
    },
    {
        x: 14,
        y: 18,
        index: 34,
        label: "PC",
        parent: 33,
        childs: [35]
    },
    {
        x: 14,
        y: 20,
        index: 35,
        label: "ZR",
        parent: 34,
        childs: [36]
    },
    {
        x: 14,
        y: 24,
        index: 36,
        label: "",
        parent: 35,
        childs: [37,38]
    },
    {
        x: 10,
        y: 24,
        index: 37,
        label: "ROM2",
        parent: 36,
        childs: []
    },
    {
        x: 28,
        y: 24,
        index: 38,
        label: "",
        parent: 36,
        childs: [39,40]
    },
    {
        x: 28,
        y: 26,
        index: 39,
        label: "DEC",
        parent: 38,
        childs: []
    },
    {
        x: 34,
        y: 24,
        index: 40,
        label: "RAM2",
        parent: 38,
        childs: []
    },
]


// fill ROM
{
    let j = 0;
    for(var i = 0; i<224; i++){
        let romElement = document.createElement('p');
        romElement.classList.add('romElement', 'grid-template');
        romElement.id = "romElement" + String(i);
        if(!(i%8) && i !== 0)
            j++;
        
       if(i<romArray.length){
           romElement.textContent = romArray[i]
       } else {
            romElement.textContent ='FF';
       }

        romElement.style.top = String(100/32*(j+2)) + "%";
        romElement.style.left = String(100/46*((i%8)+2)) + "%";
        document.querySelector(".gridcontainer").appendChild(romElement);    
    }
}

//-----------------------------------Test starts here--------------------------

SP.textContent = "3FFF";


let ANIMATION_SPEED = 0.2; //vielfache von 0.02
let animationRuns = false;
let lastRenderTime = 0;
const FRAMERATE = 50;
let OFFSET_X = 0;
let OFFSET_Y = 0;


function createMovingObj(elementId, aPath){
    element = document.getElementById(elementId);
    let clone = element.cloneNode(true);
    clone.classList.add("boxborder", "rounded");
    clone.style.zIndex = "10";
    clone.id = "clonedElement";
    clone.style.background = "yellow";
    clone.style.top = String(100/32*aPath[0].y) +"%";
    clone.style.left = String(100/46*aPath[0].x) +"%";


    document.querySelector(".gridcontainer").appendChild(clone);
    let  movObj = {aDiv: clone, path: aPath};
    return movObj;

}

//AtoB
{
//returns index array 0 to A
function getPathZerotoA(pointIndexA){
    let zeroToPointA = [0];
    let loop = true;
    let i = 0;

    if(pointIndexA === 0)
        return zeroToPointA;

    while(loop){
        if(fixPoints[i].childs.length !== 0){
            if(fixPoints[i].childs[fixPoints[i].childs.length-1] < pointIndexA){                
                i = fixPoints[i].childs[fixPoints[i].childs.length-1];
                zeroToPointA.push(i);

            } else if(fixPoints[i].childs[fixPoints[i].childs.length-1] === pointIndexA){
                i = fixPoints[i].childs[fixPoints[i].childs.length-1];
                zeroToPointA.push(i);
                loop = false;
                
            } else {
                i = fixPoints[i].childs[0];
                zeroToPointA.push(i);
                if(i === pointIndexA)
                    loop = false;
            }
        } 
    }
    return zeroToPointA;
}

//returns index array
function getPathAtoB(pointIndexA, pointIndexB){
    let zeroToPointA = getPathZerotoA(pointIndexA);
    let zeroToPointB = getPathZerotoA(pointIndexB);
    let loopLength = 0;
    let AtoB = [];

    //getting shorter arraylenght
    if(zeroToPointA.length > zeroToPointB.length){
        loopLength = zeroToPointB.length;
    }else{
        loopLength = zeroToPointA.length;
    }

    //create array AtoB
    for(let i=0; i < loopLength; i++){
        if(zeroToPointA[i] !== zeroToPointB[i]){
            for(let j = zeroToPointA.length-1; j >= i-1; j--){
                AtoB.push(zeroToPointA[j])
            }
            for(let j = i; j<zeroToPointB.length; j++){
                AtoB.push(zeroToPointB[j])
            }
            break;
        }
    }
    

    // if zeroToPointA (e.g. [0,1,2,3]) is a subset of zeroToPointB (e.g. [0,1,2,3,4,5]) AtoB is empty and the path should be [3,4,5]
    // it also applies the other way around
    if(AtoB.length === 0){
        if(zeroToPointA.length < zeroToPointB.length){
            for(let j = zeroToPointA.length-1; j<zeroToPointB.length; j++){
                AtoB.push(zeroToPointB[j]);
            }
        } else {
            for(let j = zeroToPointB.length-1; j<zeroToPointA.length; j++){
                AtoB.unshift(zeroToPointA[j]);
            }
        } 
    }

    //convert indexArray to pointArray
    for(let i=0; i < AtoB.length; i++){
        AtoB[i] = fixPoints[AtoB[i]];
    }
    return AtoB;
}

//returns an array of points
function pathFromTo(pointLabelA, pointLabelB){
    let pointA = 0;
    let pointB = convertlabelToPoint(pointLabelB);
    let fixPointIndexA = -1;
    let fixPointIndexB = -1;
    let AtoB = [];

    if(pointLabelA.includes('romElement')){
        AtoB = pathFromTo("ROM1", pointLabelB);
        AtoB = romElementToROM1(pointLabelA).concat(AtoB);
        return AtoB;

    } else {
        pointA = convertlabelToPoint(pointLabelA);
    }
    
    for(let i = 0; i<fixPoints.length;i++){
        if(pointA.x === fixPoints[i].x && pointA.y === fixPoints[i].y){
            fixPointIndexA = fixPoints[i].index;
        }
        if(pointB.x === fixPoints[i].x && pointB.y === fixPoints[i].y){
            fixPointIndexB = fixPoints[i].index;
        }  
    }
  
    if(fixPointIndexA > -1 && fixPointIndexB > -1){
        AtoB = getPathAtoB(fixPointIndexA, fixPointIndexB);
    }else{
        AtoB.push(pointA);
        AtoB.push(pointB);
    }
    return AtoB;
}

function convertlabelToPoint(label){
    let point = {
        x: 0,
        y: 0
    };

    for(let i = 0; i<fixPoints.length;i++){
        if(label === fixPoints[i].label){
            point.x = fixPoints[i].x;
            point.y = fixPoints[i].y;
        }  
    }
    return point;
}
function romElementToROM1(romElementID){
    let toROM1 = [];
    let romElement = document.getElementById(romElementID);
    let rEx = romElement.style.left.replace('%','');
    let rEy = romElement.style.top.replace('%','');
    rEx = Math.round(Number(rEx) *46/100);
    rEy = Math.round(Number(rEy)*32/100);
    let romBetweenPoint = {
        x: rEx,
        y: 2
    };
    let romPoint = {
        x: rEx,
        y: rEy,
    };
    toROM1.push(romPoint);
    toROM1.push(romBetweenPoint);
    return toROM1;
}
}




let path = pathFromTo("romElement130","SW");

let mov = createMovingObj('romElement130', path);

let j = 0;

function updateMovObjPosition(aMovObj){
    
    if(aMovObj.path.length > 1){
        if(aMovObj.path[1].x >  aMovObj.path[0].x){
            aMovObj.path[0].x += ANIMATION_SPEED;
            aMovObj.path[0].x = Math.round(aMovObj.path[0].x*100)/100;
        } else if(aMovObj.path[1].x <  aMovObj.path[0].x){
            aMovObj.path[0].x -= ANIMATION_SPEED;
            aMovObj.path[0].x = Math.round(aMovObj.path[0].x*100)/100;   
        }

        if(aMovObj.path[1].y >  aMovObj.path[0].y){
            aMovObj.path[0].y += ANIMATION_SPEED;
            aMovObj.path[0].y = Math.round(aMovObj.path[0].y*100)/100;
        } else if(aMovObj.path[1].y <  aMovObj.path[0].y){
            aMovObj.path[0].y -= ANIMATION_SPEED;
            aMovObj.path[0].y = Math.round(aMovObj.path[0].y*100)/100;
        }
        

        //if RomElement
        if(Math.floor(aMovObj.path[0].x) === 9 && Math.floor(aMovObj.path[0].y) === 2){
            aMovObj.aDiv.classList.add('square2x2' , 'h2mov');   
        }
       
        if(Math.abs(aMovObj.path[1].x-aMovObj.path[0].x) < ANIMATION_SPEED && Math.abs(aMovObj.path[1].y - aMovObj.path[0].y) < ANIMATION_SPEED){
            aMovObj.path.shift();
        }
        aMovObj.aDiv.style.top = String(aMovObj.path[0].y*100/32) + "%" ;
        aMovObj.aDiv.style.left = String(aMovObj.path[0].x*100/46) + "%";
    }else{
        aMovObj.aDiv.remove();
    }
}

function main(currentTime){
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if(secondsSinceLastRender < 1/FRAMERATE || !animationRuns){
        return;
    }
    lastRenderTime = currentTime;
    update();
    draw(document.querySelector('gridcontainer'));
}

function update(){
    
}

function draw(grid){
    updateMovObjPosition(mov);
}

//button functions
function play(){
    animationRuns = true;
    document.getElementById('play').toggleAttribute('buttonPressed');
}
function pause(){
    animationRuns = false;
}

function increaseSpeed(){
    if(ANIMATION_SPEED < 0.7)
        ANIMATION_SPEED += 0.08

}
function decreaseSpeed(){
    if(ANIMATION_SPEED > 0.16)
        ANIMATION_SPEED -= 0.08
}


//main loop
window.requestAnimationFrame(main);
