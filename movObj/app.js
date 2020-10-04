
let ANIMATION_SPEED = 0.08; //vielfache von 0.05
let animationRuns = false;
let lastRenderTime = 0;
const FRAMERATE = 50;

for(let i = 0; i<100; i++){
    let p = document.createElement('p');
    p.innerHTML = String(i);
    p.id = String(i);
    document.querySelector(".grid").appendChild(p);
}


function createMovingObj(aPath){
    
    let iDiv = document.createElement('div');
    
    
    iDiv.id = 'movObj';
    iDiv.className = 'movObj';
    iDiv.style.position = "absolute";
    iDiv.style.top = String(aPath[0].y*10) + "%" ;
    iDiv.style.left = String(aPath[0].x*10) + "%";
    iDiv.style.display = "flex";
    iDiv.style.justifyContent = "center";
    iDiv.style.alignItems = "center";
    iDiv.style.height = "10vh";
    iDiv.style.width = "10vh";
    iDiv.innerHTML = "FF";
    iDiv.style.background = "yellow";
    document.querySelector(".grid").appendChild(iDiv);

    let movObj = {aDiv: iDiv, path: aPath};
    return movObj;
}


//AtoB
{
    
const fixPoints = [
    {
        x: 0,
        y: 0,
        index: 0,
        label: "ROM1",
        parent: -1,
        childs: [1]
    },
    {
        x: 6,
        y: 0,
        index: 1,
        label: "",
        parent: 0,
        childs: [2,3]
    },
    {
        x: 9,
        y: 0,
        index: 2,
        label: "RAM",
        parent: 1,
        childs: []
    },
    {
        x: 6,
        y: 5,
        index: 3,
        label: "",
        parent: 1,
        childs: [4,6]
    },
    {
        x: 1,
        y: 5,
        index: 4,
        label: "",
        parent: 3,
        childs: [5]
    },
    {
        x: 1,
        y: 9,
        index: 5,
        label: "ROM2",
        parent: 4,
        childs: []
    },
    {
        x: 9,
        y: 5,
        index: 6,
        label: "SW",
        parent: 3,
        childs: []
    }
];

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

//returns an array of the
function pointsFromTo(pointA, pointB){
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




let path = pointsFromTo(convertlabelToPoint("ROM1"), convertlabelToPoint("ROM2"));
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
        aMovObj.aDiv.style.top = String(aMovObj.path[0].y*10) + "%" ;
        aMovObj.aDiv.style.left = String(aMovObj.path[0].x*10) + "%" ;  
    } 
}

// function getIdunderObj(aMovObj){
//     aMovObj.
// }

function dropHexNum(aMovObj){


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
console.log(mov.path);

//button functions
function start(){
    animationRuns = true;
}
function stop(){
    animationRuns = false;
}

function increaseSpeed(){
    if(ANIMATION_SPEED < 0.5)
        ANIMATION_SPEED += 0.04

}
function decreaseSpeed(){
    if(ANIMATION_SPEED > 0.04)
        ANIMATION_SPEED -= 0.04
}


//main loop
window.requestAnimationFrame(main);

