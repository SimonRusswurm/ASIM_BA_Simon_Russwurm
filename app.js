//resize window
{
let mc8 = document.querySelector(".mc8");
let style = document.querySelector("style");


window.addEventListener('DOMContentLoaded', function () {
    if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw}";
        
    } else{
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh}";
    }  
});

window.addEventListener('resize', function () {
    if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw}";
        
    } else{
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh}";
    }  
});
}


// fill ROM
{
let rom = document.getElementsByClassName("Adresse-000x-1FFx");
let ram = document.getElementsByClassName("Adresse-200x-3FFx");
let j = 0;
for(var i = 0; i<224; i++){
    let ro = document.createElement('p');
    let ra = document.createElement('p');
    ro.textContent = "FF";
    ra.textContent = "FF";
    if(i%16 === 0 && i !== 0){
        j++;
    }
    rom[j].appendChild(ro);
    ram[j].appendChild(ra);
}
}


//program
let IO1 = document.getElementById('io-input1');
let I02 = document.getElementById('io-input2');
let I03 = document.getElementById('io-input3');
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
        y: 3,
        index: 0,
        label: "ROM1",
        parent: -1,
        childs: [1]
    },
    {
        x: 15,
        y: 3,
        index: 1,
        label: "",
        parent: 0,
        childs: [2,4]
    },
    {
        x: 15,
        y: 1,
        index: 2,
        label: "",
        parent: 2,
        childs: [3]
    },
    {
        x: 17,
        y: 1,
        index: 3,
        label: "IO1",
        parent: 2,
        childs: []
    },
    {
        x: 19,
        y: 3,
        index: 4,
        label: "",
        parent: 1,
        childs: [5,12]
    },
    {
        x: 23,
        y: 3,
        index: 5,
        label: "",
        parent: 4,
        childs: [6,8]
    },
    {
        x: 23,
        y: 1,
        index: 6,
        label: "",
        parent: 5,
        childs: [7]
    },
    {
        x: 25,
        y: 1,
        index: 7,
        label: "IO2",
        parent: 6,
        childs: []
    },
    {
        x: 31,
        y: 3,
        index: 8,
        label: "",
        parent: 5,
        childs: [9,11]
    },
    {
        x: 31,
        y: 1,
        index: 9,
        label: "",
        parent: 8,
        childs: [10]
    },
    {
        x: 33,
        y: 1,
        index: 10,
        label: "IO3",
        parent: 9,
        childs: []
    },
    {
        x: 36,
        y: 3,
        index: 11,
        label: "RAM1",
        parent: 8,
        childs: []
    },
    {
        x: 19,
        y: 5,
        index: 12,
        label: "",
        parent: 3,
        childs: [13,23]
    },
    {
        x: 24,
        y: 5,
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
        x: 32,
        y: 5,
        index: 15,
        label: "",
        parent: 13,
        childs: [16,17]
    },
    {
        x: 32,
        y: 6,
        index: 16,
        label: "ALU2",
        parent: 15,
        childs: []
    },
    {
        x: 35,
        y: 5,
        index: 17,
        label: "",
        parent: 15,
        childs: [18]
    },
    {
        x: 35,
        y: 13,
        index: 18,
        label: "",
        parent: 17,
        childs: [19,21]
    },
    {
        x: 28,
        y: 13,
        index: 19,
        label: "",
        parent: 18,
        childs: [20]
    },
    {
        x: 28,
        y: 12,
        index: 20,
        label: "ALUOUT",
        parent: 19,
        childs: []
    },
    {
        x: 35,
        y: 15,
        index: 21,
        label: "",
        parent: 18,
        childs: [22]
    },
    {
        x: 32,
        y: 15,
        index: 22,
        label: "SW",
        parent: 21,
        childs: []
    },
    {
        x: 14,
        y: 5,
        index: 23,
        label: "",
        parent: 12,
        childs: [24,25]
    },
    {
        x: 14,
        y: 7,
        index: 24,
        label: "A",
        parent: 23,
        childs: []
    },
    {
        x: 11,
        y: 5,
        index: 25,
        label: "",
        parent: 23,
        childs: [26]
    },
    {
        x: 11,
        y: 16,
        index: 26,
        label: "",
        parent: 25,
        childs: [27]
    },
    {
        x: 16,
        y: 16,
        index: 27,
        label: "",
        parent: 26,
        childs: [28,32]
    },
    {
        x: 16,
        y: 15,
        index: 28,
        label: "IX",
        parent: 27,
        childs: [28]
    },
    {
        x: 16,
        y: 13,
        index: 29,
        label: "HL",
        parent: 28,
        childs: [30]
    },
    {
        x: 16,
        y: 11,
        index: 30,
        label: "C",
        parent: 29,
        childs: [31]
    },
    {
        x: 14,
        y: 11,
        index: 31,
        label: "B",
        parent: 30,
        childs: []
    },
    {
        x: 16,
        y: 17,
        index: 32,
        label: "SP",
        parent: 27,
        childs: [33]
    },
    {
        x: 16,
        y: 19,
        index: 33,
        label: "PC",
        parent: 32,
        childs: [34]
    },
    {
        x: 16,
        y: 21,
        index: 34,
        label: "ZR",
        parent: 33,
        childs: [35]
    },
    {
        x: 16,
        y: 25,
        index: 35,
        label: "",
        parent: 34,
        childs: [36,37]
    },
    {
        x: 10,
        y: 25,
        index: 36,
        label: "ROM2",
        parent: 35,
        childs: []
    },
    {
        x: 29,
        y: 25,
        index: 37,
        label: "",
        parent: 35,
        childs: [38,39]
    },
    {
        x: 29,
        y: 26,
        index: 38,
        label: "DEC",
        parent: 37,
        childs: []
    },
    {
        x: 36,
        y: 25,
        index: 39,
        label: "RAM2",
        parent: 37,
        childs: []
    }
]


//-----------------------------------Test starts here--------------------------

SP.textContent = "3FFF";


let ANIMATION_SPEED = 0.2; //vielfache von 0.02
let animationRuns = false;
let lastRenderTime = 0;
const FRAMERATE = 50;
let OFFSET_X = 0;
let OFFSET_Y = 0;

// for(let i = 0; i<100; i++){
//     let p = document.createElement('p');
//     p.innerHTML = String(i);
//     p.id = String(i);
//     document.querySelector(".grid").appendChild(p);
// }


function createMovingObj(aPath){
    let iDiv = document.createElement('h4');
    let h = 3.125*1.6;
    let w = 3.125/1.4375*1.6;
    
    OFFSET_X = w/2;
    OFFSET_Y = h/2;
    iDiv.id = 'movObj';
    iDiv.className = 'movObj';
    iDiv.style.position = "absolute";
    iDiv.style.top = String(aPath[0].y*3.125-OFFSET_Y) + "%" ;
    iDiv.style.left = String(aPath[0].x*3.125/1.4375-OFFSET_X) + "%";
    iDiv.style.display = "grid";
    iDiv.style.justifyContent = "center";
    iDiv.style.alignItems = "center";
    iDiv.style.height = String(h) + "%";
    iDiv.style.width = String(w) +"%";
    iDiv.innerHTML = "FF";
    iDiv.style.background = "yellow";
    iDiv.style.zIndex = "10";
    iDiv.style.border = "1px solid #333333"
    iDiv.style.borderRadius = "0.5vw";
    document.querySelector(".globalgrid").appendChild(iDiv);

    let movObj = {aDiv: iDiv, path: aPath};
    return movObj;
}

//AtoB
{

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
function pathFromTo(pointA, pointB){
    let fixPointIndexA = -1;
    let fixPointIndexB = -1;
    let AtoB = [];
    
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
}

let path = pathFromTo(convertlabelToPoint("ROM1"), convertlabelToPoint("A"));
let mov = createMovingObj(path);

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
       
        if(Math.abs(aMovObj.path[1].x-aMovObj.path[0].x) < ANIMATION_SPEED && Math.abs(aMovObj.path[1].y - aMovObj.path[0].y) < ANIMATION_SPEED){
            aMovObj.path.shift();
        }
        aMovObj.aDiv.style.top = String(aMovObj.path[0].y*3.125-OFFSET_Y) + "%" ;
        aMovObj.aDiv.style.left = String(aMovObj.path[0].x*3.125/1.4375-OFFSET_X) + "%";
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
