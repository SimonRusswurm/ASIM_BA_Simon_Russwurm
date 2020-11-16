//resize window
{
let mc8 = document.querySelector(".mc8");
let style = document.querySelector("style");

const resizeWindow = () => {
	if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 3vw;} .h2mov{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw}";
        
    } else {
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 4.3125vh;} .h2mov{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh}";
    }
}

window.addEventListener('DOMContentLoaded', function () {
	resizeWindow();
});


window.addEventListener('resize', function () {
	resizeWindow();
});
}


//variables
let ANIMATION_SPEED = 0.2;
let animationRuns = false;
let lastRenderTime = 0;
const FRAMERATE = 50;
let stepCounter = 0;
let frameCounter = 0;
let isMovAnimationFinished = true;
let isMovAnimation = false;
let path = 0;   //animation Path
let mov = 0;    //moving Object

let romArray = ['3E','12','06','22', '3C', '3C'];
let romEntries = [];
let ramArray = [];
const commands = [
    {
        hex: "3E",
        assemb: "MOV SP, dat_16",
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
]


//variables DOM
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
let assemblerCommand = document.getElementById('assemblerCommand');
let stepNumber = document.getElementById('stepNumber');
let stepDescription = document.getElementById('stepDescription');
let stepNumberBackground = document.getElementsByClassName('sNum')[0];
let registerArrow = document.getElementById('registerArrow');
let irArrow = document.getElementById('ir_arrow');
let WR = document.getElementById('WR');
let RD = document.getElementById('RD');
let M = document.getElementById('M');
let IO = document.getElementById('IO');
let rom = document.querySelector(".Adresse-000x-1FFx");
let ram = document.getElementsByClassName("Adresse-200x-3FFx");


//fixpoints on the canvas
class Point{
    constructor(index,x,y,labelString, parent,childsArray){
        this.index = index;
        this.x = x;
        this.y = y;
        this.label = labelString;
        this.parent = parent;
        this.childs = childsArray;
    }

    getParent(){
        return this.parent;
    }

    getSmallerChild(){
        if(this.childs.length === 0)
            return;
        return this.childs[0];
    }
    getGreaterChild(){
        if(this.childs.length === 0)
            return;
        else
            return this.childs[this.childs.length -1];
    }

}

const fixPoints = [
    rom1    = new Point(0,10,2,'ROM1',-1,[1]),
    point1  = new Point(1,14,2,'',0,[2,4]),
    point2  = new Point(2,14,0,'',1,[3]),
    io1     = new Point(3,16,0,'IO1',2,[]),
    point4  = new Point(4,18,2,'',1,[5,12]),
    point5  = new Point(5,22,2,'',4,[6,8]),
    point6  = new Point(6,22,0,'',5,[7]),
    io2     = new Point(7,24,0,'IO2',6,[]),
    point8  = new Point(8,30,2,'',5,[9,11]),
    point9  = new Point(9,30,0,'',8,[10]),
    io3     = new Point(10,32,0,'IO3',9,[]),
    ram1    = new Point(11,34,2,'RAM1',8,[]),
    point12 = new Point(12,18,4,'',4,[13,23]),
    point13 = new Point(13,24,4,'',12,[14,15]),
    alu1    = new Point(14,24,6,'ALU1',13,[]),
    point15 = new Point(15,30,4,'',13,[16,17]),
    alu2    = new Point(16,30,6,'ALU2',15,[]),
    point17 = new Point(17,34,4,'',15,[18]),
    point18 = new Point(18,34,12,'',17,[19,21]),
    point19 = new Point(19,27,12,'',18,[20]),
    aluout  = new Point(20,27,10,'',19,[]),
    point21 = new Point(21,34,14,'',18,[22]),
    sw      = new Point(22,32,14,'SW',21,[]),
    point23 = new Point(23,13,4,'',12,[24,25]),
    a	    = new Point(24,13,6,'A',23,[]),
    point25 = new Point(25,10,4,'',23,[26]),
    point26 = new Point(26,10,15,'',25,[27]),
    point27 = new Point(27,14,15,'',26,[28,33]),
    ix      = new Point(28,14,14,'IX',27,[29]),
    hl      = new Point(29,14,12,'HL',28,[30]),
    point30 = new Point(30,14,10,'',29,[31,32]),
    b       = new Point(31,13,10,'B',30,[]),
    b       = new Point(32,15,10,'C',30,[]),
    sp      = new Point(33,14,16,'SP',27,[34]),
    pc      = new Point(34,14,18,'PC',33,[35]),
    zr      = new Point(35,14,20,'ZR',34,[36]),
    point36 = new Point(36,14,24,'',35,[37,38]),
    rom2    = new Point(37,10,24,'ROM2',36,[]),
    point38 = new Point(38,28,24,'',36,[39,40]),
    dec     = new Point(39,28,26,'DEC',38,[]),
    ram2    = new Point(40,34,24,'RAM2',38,[])
];

//AtoB functions
const convertlabelToPoint = (elementIDString) =>{
    for(let i=0; i<fixPoints.length;i++){
        if(fixPoints[i].label === elementIDString)
           return fixPoints[i];
    }
    return null;
}

const getPointIndex = (elementIDString) =>{
     for(let i=0; i<fixPoints.length;i++){
         if(fixPoints[i].label === elementIDString)
            return i;
     }
     return -1;
}
//TODO: while(true) loop 
const getZeroToAindexArray = (pointIndexA) =>{
    let atoZero = [];

    while(true){
        if(pointIndexA === 0){
            atoZero.push(0);
            return atoZero.reverse();
        }else{
            atoZero.push(pointIndexA);
            pointIndexA = fixPoints[pointIndexA].getParent();
        }
    }
}

const getAtoBindexArray = (arrayZtoA, arrayZtoB) =>{
    let smallerArray = (arrayZtoA < arrayZtoB ? arrayZtoA.length : arrayZtoB.length);
    let AtoB = [];
    let buffer= 0;

    for(let i=0; i<smallerArray; i++){
        if(arrayZtoA[i] === arrayZtoB[i]){
            buffer = arrayZtoA[i];
        }
    }
    
    arrayZtoA = arrayZtoA.reverse();

    arrayZtoA.forEach(element => {
        if(element > buffer){
            AtoB.push(element);
        }   
    });
    arrayZtoB.forEach(element => {
        if(element >= buffer)
            AtoB.push(element);
    });
    return AtoB;
}

const romElementToROM1 = (romElementID) =>{
    let toROM1 = [];
    let romElement = document.getElementById(romElementID);
    let rEx = romElement.style.left.replace('%','');
    let rEy = romElement.style.top.replace('%','');
    rEx = Math.round(Number(rEx) *46/100);
    rEy = Math.round(Number(rEy)*32/100);

    let romBetweenPoint = new Point(-1,rEx,2,'',0,[]);
    let romPoint = new Point(-1,rEx,rEy,'',0,[]);

    toROM1.push(romPoint);
    toROM1.push(romBetweenPoint);
    return toROM1;
}

const getPointsAtoB = (elementIDStringA, elementIDStringB) => {
    let pointsAtoB = [];
    let pointA = 0;
    let pointB = 0;

    if(elementIDStringA.includes('romElement')){
        pointsAtoB = getPointsAtoB('ROM1',elementIDStringB);
        pointsAtoB = romElementToROM1(elementIDStringA).concat(pointsAtoB);
        return pointsAtoB;
    }
    
    pointA = convertlabelToPoint(elementIDStringA);
    pointB = convertlabelToPoint(elementIDStringB);

    pointsAtoB = getAtoBindexArray(getZeroToAindexArray(getPointIndex(elementIDStringA)),
                                   getZeroToAindexArray(getPointIndex(elementIDStringB)));
    console.log(pointsAtoB);
    //convert Index-Array to Point-Array
    for (let i = 0; i < pointsAtoB.length; i++) {
        pointsAtoB[i] = fixPoints[pointsAtoB[i]];        
    }
    console.log(pointsAtoB);
    return pointsAtoB;
}


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

//redRectangle
let redRectangle = document.getElementById('romElement0').cloneNode(true);
redRectangle.classList.add("boxborder");
redRectangle.id = "redRectangle";
redRectangle.style.borderColor = "#FF1930";
redRectangle.style.background = "#FCDEE1";
document.querySelector(".gridcontainer").appendChild(redRectangle);

function updateRedRectangle(PC_IntValue){
    let xPos = PC_IntValue%8 +2;
    let yPos = Math.floor(PC_IntValue/8) + 2;
    redRectangle.textContent = romArray[PC_IntValue];
    redRectangle.style.left = String(100/46*(xPos)) + "%";
    redRectangle.style.top = String(100/32*(yPos)) + "%";
}



function createMovingObj(elementId, aPath){
    let element = document.getElementById(elementId);
    let clone = element.cloneNode(true);
    clone.classList.add("boxborder" ,"rounded");
    clone.style.zIndex = "10";
    clone.id = "clonedElement";
    clone.style.background = "yellow";
    clone.style.color = "#222222";
    clone.style.top = String(100/32*aPath[0].y) +"%";
    clone.style.left = String(100/46*aPath[0].x) +"%";
    clone.style.transition = "width 0.3s, height 0.3s, font-size 0.3s, border-radius 0.5s";

    if(elementId.includes('romElement')){
        clone.id = "clonedRomElement";
    }

    document.querySelector(".gridcontainer").appendChild(clone);
    let  movObj = {aDiv: clone, path: aPath};
    return movObj;
}

function convertHexToInt(hexString){
    return parseInt(hexString, 16);
}
function convertIntToHex4(intNum){
    intNum = intNum.toString(16);
    let len = intNum.length;
    for(i=4; i>len;i--){
        intNum = '0' +intNum;
    }
    return intNum;
}
function getRomElement(){
    return document.getElementById('romElement' + String(convertHexToInt(PC.textContent)));
}
const getAssemblerCommand = (hexStr) =>{
    for(i=0; i<commands.length; i++){
        if(commands[i].hex === hexStr)
            return commands[i].assemb; 
    }
}


const getNextPositivValue = (pathValue) => Math.round((pathValue+ANIMATION_SPEED)*100)/100;
const getNextNegativValue = (pathValue) => Math.round((pathValue-ANIMATION_SPEED)*100)/100;

function updateMovObjPosition(aMovObj){
    let isfinished = false;
    if(aMovObj === 0)
        return false;

    if(aMovObj.path.length > 1){
        if(aMovObj.path[1].x >  aMovObj.path[0].x){
            aMovObj.path[0].x = getNextPositivValue(aMovObj.path[0].x);
        } else if(aMovObj.path[1].x <  aMovObj.path[0].x){
            aMovObj.path[0].x = getNextNegativValue(aMovObj.path[0].x);
        }

        if(aMovObj.path[1].y >  aMovObj.path[0].y){
            aMovObj.path[0].y = getNextPositivValue(aMovObj.path[0].y);
        } else if(aMovObj.path[1].y <  aMovObj.path[0].y){
            aMovObj.path[0].y =  getNextNegativValue(aMovObj.path[0].y);
        }
        

        //case: RomElement (grow bigger)
        if(Math.floor(aMovObj.path[0].x) === 9 && Math.floor(aMovObj.path[0].y) === 2){
            aMovObj.aDiv.classList.add('square2x2' , 'h2mov');
        }
       
        if(Math.abs(aMovObj.path[1].x-aMovObj.path[0].x) < ANIMATION_SPEED && Math.abs(aMovObj.path[1].y - aMovObj.path[0].y) < ANIMATION_SPEED){
            aMovObj.path.shift();
        }
        aMovObj.aDiv.style.top = String(aMovObj.path[0].y*100/32) + "%" ;
        aMovObj.aDiv.style.left = String(aMovObj.path[0].x*100/46) + "%";
    }else{
        isfinished = true;
        return isfinished;
    }
    return isfinished;
}

//stepFunctions
const updatePC = () => {
    PC.textContent = convertIntToHex4(convertHexToInt(PC.textContent)+1);
    updateRedRectangle(convertHexToInt(PC.textContent));
}
const increaseStepNumber = () => {
    stepNumber.textContent = String(Number(stepNumber.textContent)+1);
}
const addYellow = (element) => {
    element.classList.add('yellowBg');
}
const removeYellow = (element) => {
    element.classList.remove('yellowBg');
}
const stepDesc = (StringDescription) => {
    stepDescription.textContent = StringDescription;
}

const addArrow = (element) => {
    if(element === PC){
        registerArrow.classList.add('PC_arrow');
    }
}
const removeArrow = (element) => {
    if(element === PC){
        registerArrow.classList.remove('PC_arrow');
    }
}


//animations
function getNextCommand(step){
    switch(step){
        case 0: stepDesc("Hole nächsten Befehl");
                increaseStepNumber();
                addYellow(stepNumberBackground);
                break;
        case 1: removeYellow(stepNumberBackground);
                addArrow(PC);
                break;

        case 2: isMovAnimation = true;
                removeArrow(PC);
                path = getPointsAtoB('PC',"ROM2");
                mov = createMovingObj('PC', path);
                break;
        case 3: isMovAnimation = true;
                mov.aDiv.remove();
                path = getPointsAtoB(getRomElement().id, "SW");
                mov = createMovingObj(getRomElement().id, path);
                break;
        case 4: isMovAnimation = false;
                IR.textContent = getRomElement().textContent;
                addYellow(IR);
                mov.aDiv.remove();
                mov  =0;
                break;
        case 5: isMovAnimation = false;
                removeYellow(IR);
                stepDesc("Erhöhe Programmzähler um 1");
                addYellow(stepNumberBackground);
                increaseStepNumber();
                break;
        case 6: removeYellow(stepNumberBackground);
                addArrow(PC);
                addYellow(PC);
                updatePC();
                break;
        case 7: stepDesc('Erkenne den Befehl');
                increaseStepNumber();
                addYellow(stepNumberBackground);
                removeArrow(PC);
                removeYellow(PC);
                break;
        case 8: removeYellow(stepNumberBackground);
                irArrow.classList.add('ir_arrow');
                addYellow(IR);
                assemblerCommand.textContent = getAssemblerCommand(IR.textContent);
                break;
        case 9: removeYellow(IR);
                irArrow.classList.remove('ir_arrow');
                return true;
        default:
            return false;
    }
    return false;
}

const movAdat_8 = (step) =>{
    switch (step) {
        case 0:
            stepDesc('Hole den Parameter');
            addYellow(stepNumberBackground);      
            break;
        case 1:
            removeYellow(stepNumberBackground);
            addArrow(PC);
            break;
        case 2:
            isMovAnimation = true;
            removeArrow(PC);
            path = getPointsAtoB('PC',"ROM2");
            mov = createMovingObj('PC', path);
            break;
        case 3:
            isMovAnimation = true;
            mov.aDiv.remove();
            path = getPointsAtoB(getRomElement().id,"A");
            mov = createMovingObj(getRomElement(), path);
            break;
        case 4:
            isMovAnimation = false;
            A.textContent = getRomElement().textContent;
            addYellow(A);
            mov.aDiv.remove();
            mov = 0;
            break;
        case 5:
            isMovAnimation = false;
            removeYellow(A);
            addYellow
    
        default:
            break;
    }
    
}



function main(currentTime){
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if(secondsSinceLastRender < 1/FRAMERATE || !animationRuns){
        return;
    }
    
    if(frameCounter === 0 || isMovAnimationFinished){
        frameCounter = Math.round(FRAMERATE/2);
        if(isMovAnimationFinished || !isMovAnimation){
            if(getNextCommand(stepCounter))
                stepCounter = 0;
            stepCounter++;
        }        
    }
    frameCounter--;
    lastRenderTime = currentTime;
    isMovAnimationFinished = updateMovObjPosition(mov);
}


function draw(){
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
        ANIMATION_SPEED += 0.08;

}
function decreaseSpeed(){
    if(ANIMATION_SPEED > 0.16)
        ANIMATION_SPEED -= 0.08
}

function toggleTheme(){
    document.getElementsByClassName('mc8')[0].classList.toggle('black');
    console.log(document.getElementsByTagName('h2'))
}


//main loop
window.requestAnimationFrame(main);
