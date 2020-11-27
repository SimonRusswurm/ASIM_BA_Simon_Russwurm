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
let isFullscreen = false;
let ANIMATION_SPEED = 2;
let noAnimation = false;
let completeExecution = false;
let WAITTIME = 500;
let FRAMES = 60;
let animationRuns = false;
let stopPressed = true;
let lastRenderTime = 0;
const FRAMERATE = 50;
let stepCounter = 0;
let frameCounter = 0;
let isMovAnimationFinished = true;
let isMovAnimation = false;
let path = 0;   //animation Path
let mov = 0;    //moving Object

let romArray = ['3E','12','06','22', '76', 'FF'];
let romEntries = [];
let ramArray = [];
const commands = [
    {
        hex: "76",
        assemb: "HALT",
        flags: false,
        index: 0,
        wr: "0",
        rd: "0",
        m: "0",
        io: "0",
    },
    {
        hex: "3E",
        assemb: "MOV A, dat_8",
        flags: false,
        index: 0,
        wr: "1",
        rd: "0",
        m: "0",
        io: "1",
    },
    {
        hex: "06",
        assemb: "MOV B, dat_8",
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
let settings = document.getElementById('settings');



/*********************************** rom/ram ************************************/
const initRom = () => {
    let j = 0;
    for(var i = 0; i<224; i++){
        //create a romElement
        let romElement = document.createElement('p');
        romElement.classList.add('romElement', 'grid-template');
        romElement.id = "romElement" + String(i);

        //after every 8th romElement -> new line should be filled
        if(!(i%8) && i !== 0)
            j++;

        //define textContent of romElement
        if(i<romArray.length){
            romElement.textContent = romArray[i]
        } else {
            romElement.textContent = 'FF';
        }

        //define Position of romElement
        romElement.style.top = String(100/32*(j+2)) + "%";
        romElement.style.left = String(100/46*((i%8)+2)) + "%";

        //add romElement to body
        document.querySelector(".gridcontainer").appendChild(romElement);    
    }
    return true;
}
initRom();

const initRam = () => {
    let j = 0;
    for(var i = 0; i<224; i++){
        //create a ramElement (same CSS as romElement)
        let ramElement = document.createElement('p');
        ramElement.classList.add('romElement', 'grid-template');
        ramElement.id = "ramElement" + String(i);

        //after every 8th romElement -> new line should be filled
        if(!(i%8) && i !== 0)
            j++;
        if(j === 14)
            j += 2;

        //define textContent of ramElement
        ramElement.textContent = 'FF';

        //define Position of romElement
        ramElement.style.top = String(100/32*(j+2)) + "%";
        ramElement.style.left = String(100/46*((i%8)+36)) + "%";

        //add romElement to body
        document.querySelector(".gridcontainer").appendChild(ramElement);    
    }
    return true;
}
initRam();

const getRomElement = () => document.getElementById('romElement' + String(convertHexToInt(PC.textContent)));



/*********************************** bussystem and pathlogic ************************************/
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

//TODO: comment functions

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

    //convert Index-Array to Point-Array
    for (let i = 0; i < pointsAtoB.length; i++) {
        pointsAtoB[i] = fixPoints[pointsAtoB[i]];        
    }
    return pointsAtoB;
}


/*********************************** red rectangle ************************************/
const create_RedRectangle = () => {
    let redRectangle = document.getElementById('romElement0').cloneNode(true);
    redRectangle.classList.add("boxborder");
    redRectangle.id = "redRectangle";
    redRectangle.style.borderColor = "#FF1930";
    redRectangle.style.background = "#FCDEE1";
    redRectangle.style.color = "Black";
    document.querySelector(".gridcontainer").appendChild(redRectangle);
}
create_RedRectangle();

const updateRedRectangle = (PC_IntValue) =>{
    //should always be on the position the PC is pointing at
    let xPos = PC_IntValue%8 +2;
    let yPos = Math.floor(PC_IntValue/8) + 2;
    redRectangle.textContent = romArray[PC_IntValue];
    redRectangle.style.left = String(100/46*(xPos)) + "%";
    redRectangle.style.top = String(100/32*(yPos)) + "%";
}

/*********************************** moving object ************************************/
const createMovingObj = (elementId, aPath) => {
    // select the div which should be moved
    let element = document.getElementById(elementId);
    let clone = element.cloneNode(true);
    clone.classList.add("boxborder" ,"rounded");
    clone.style.zIndex = "5";
    clone.id = "movingObject";
    clone.style.background = "yellow";
    clone.style.color = "#222222";
    clone.style.top = String(100/32*aPath[0].y) +"%";
    clone.style.left = String(100/46*aPath[0].x) +"%";
    clone.style.transition = "width 0.5s, height 0.5s, font-size 0.5s, border-radius 0.5s";

    if(elementId.includes('romElement')){
        clone.id = "movingRomElement";
    }

    document.querySelector(".gridcontainer").appendChild(clone);
    let  movObj = {aDiv: clone, path: aPath};
    return movObj;
}

/*********************************** convert Hex/Int ************************************/
const convertHexToInt = (hexString) => {
    return parseInt(hexString, 16);
}

const convertIntToHex_4digits = (intNum) => {
    intNum = intNum.toString(16);
    let len = intNum.length;
    for(i=4; i>len;i--){
        intNum = '0' +intNum;
    }
    return intNum;
}

/******************************* ANIMATION IMPLIMENTATION *************************************** */

/******************** basic functions ********************/

const isRunning = async() => {
    while(true) {
        if(animationRuns)
            return true;
        else{               
            if(stopPressed)
                return false;
            console.log('waiting for userinput'); //if pause is pressed user will be caught in this loop till h
            await Sleep(100);
        }    
    }   
}

const Sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const Sleep_Waittime = () => Sleep(WAITTIME);

const Sleep_NoAnimationTime = () => Sleep(50);

const check_AnimationType = () => {
    if(!completeExecution){
        description_update('Prozessor angehalten');
        if(noAnimation)
            animationRuns = false;
        noAnimation = false;
    }
}

/******************** instant changes ********************/
const change_stepDescription = (StringDescription) => stepDescription.textContent = StringDescription;

const increaseStepNumber = () => stepNumber.textContent = String(Number(stepNumber.textContent)+1);

const change_assemblerCommand = (hex2digit_string) =>{
    for(i=0; i<commands.length; i++){
        if(commands[i].hex === hex2digit_string)
            assemblerCommand.textContent = commands[i].assemb;
    }
    return true;
}

//*********************************Moving Anmiations*********************************
const calcIntermediatePositions = (path) => {
    let xPositions = [];
    let yPositions = [];
    let bufferX = [];
    let bufferY = [];
    let posDiff = 0;
    const interPointsQuantity = 12;
    const reciprocal = 1/interPointsQuantity;
    
    
    for (let j = 0; j < path.length-1; j++) {
        if(path[j].y !== path[j+1].y){
            posDiff = Math.abs((path[j+1].y-path[j].y));

            for (let i = 0; i < interPointsQuantity*posDiff; i++) {
                if((path[j+1].y>path[j].y))
                    yPositions.push(path[j].y + reciprocal*(i+1));
                else
                    yPositions.push(path[j].y - reciprocal*(i+1))

                xPositions.push(path[j].x)
            }
        }
        if(path[j].x !== path[j+1].x){
            posDiff = Math.abs((path[j+1].x-path[j].x));

            for (let i = 0; i < interPointsQuantity*posDiff; i++) {
                if((path[j+1].x>path[j].x))
                    xPositions.push(path[j].x + reciprocal*(i+1));
                else
                    xPositions.push(path[j].x - reciprocal*(i+1))

                yPositions.push(path[j].y)
            }
        }
    }

    for (let i = 0, k = -1; i < xPositions.length; i++) {
        if(i % interPointsQuantity === 0){
            k++;
            bufferX[k] = [];
            bufferY[k] = []
        }
        bufferX[k].push(xPositions[i]); 
        bufferY[k].push(yPositions[i]);       
    }

    return [bufferX, bufferY];
    //return [xPositions, yPositions];
}

const updatePosition = (movingObject, x, y) => {
    movingObject.aDiv.style.top = String(100/32*y) +"%";
    movingObject.aDiv.style.left = String(100/46*x) +"%";
}

const transfer_new = async(elementIDA_string, elementIDB_string) => {
    if(!noAnimation){
        const path = getPointsAtoB(elementIDA_string, elementIDB_string);
        let movingObject = createMovingObj(elementIDA_string, path);
        let movingObjectCoordinates = calcIntermediatePositions(path);


        for (let i = 0; i < movingObjectCoordinates[0].length; i++) {
            //ROM-BUS Schnittstelle
            if(movingObjectCoordinates[0][i] === 9 && movingObjectCoordinates[1][i] === 2){
                movingObject.aDiv.classList.add('square2x2' , 'h2mov');
            }
            if(await isRunning()){
                updatePosition(movingObject, movingObjectCoordinates[0][i], movingObjectCoordinates[1][i]);
                await Sleep(1000/FRAMES);
            }  
            else {
                movingObject.aDiv.remove();
                movingObject = 0;
                return false;
            }      
        }

        movingObject.aDiv.remove();
        movingObject = 0;
    }
    return true;
}

const transfer = async(elementIDA_string, elementIDB_string) => {
    if(!noAnimation){
        const path = getPointsAtoB(elementIDA_string, elementIDB_string);
        let movingObject = createMovingObj(elementIDA_string, path);
        const movingObjectCoordinates = calcIntermediatePositions(path);
        const xCoord = movingObjectCoordinates[0];
        const yCoord = movingObjectCoordinates[1];
        

        for (let i = 0; i < movingObjectCoordinates[0].length; i++) {
            if(!await conditionalPositionupdate(xCoord[i], yCoord[i], ANIMATION_SPEED, movingObject))
                return false;
        }
        movingObject.aDiv.remove();
        movingObject = 0;  
    }
    return true;
}

const conditionalPositionupdate = async(xCoord, yCoord, speed, movingObject) => {
    for (let j = 0; j < xCoord.length/speed; j++) {
        if(await isRunning()){
            updatePosition(movingObject, xCoord[j*speed], yCoord[j*speed]);
            await Sleep(1000/FRAMES);
        }  
        else {
            movingObject.aDiv.remove();
            movingObject = 0;
            return false;
        }  
    }
    if(xCoord[xCoord.length-1] === 9 && yCoord[xCoord.length-1] === 2){
        movingObject.aDiv.classList.add('square2x2' , 'h2mov');
    }
    return true;
}



/********************************** single animations ****************************** */
const add_yellow_background_for_WAITTIME = async(DOM_variable) => {
    if(!await isRunning()){
        return false;
    }
    if(!noAnimation){
        DOM_variable.classList.add('yellowBg');
        DOM_variable.style = "color: black";
        await Sleep_Waittime();
        DOM_variable.classList.remove('yellowBg');
        DOM_variable.style = "";
    }else{
        await Sleep_NoAnimationTime();
    }
    return true;
}

const description_update = async(description_string) => {
    if(!await isRunning()){
        return false;
    }
    change_stepDescription(description_string);
    increaseStepNumber();
    await add_yellow_background_for_WAITTIME(stepNumberBackground);
    
    return true;
}

const addArrow = async(element) => {
    if(!await isRunning()){
        return false;
    }
    if(!noAnimation){
        if(element === PC){
            registerArrow.classList.add('PC_arrow');
            await Sleep_Waittime();
            registerArrow.classList.remove('PC_arrow');
        }
        else if(element === IR){
            irArrow.classList.add('ir_arrow');
            await Sleep_Waittime();
            irArrow.classList.remove('ir_arrow');
        }
    } 
    return true;
}

const updatePC = async() => {
    if(!await isRunning())
        return false;
    PC.textContent = convertIntToHex_4digits(convertHexToInt(PC.textContent)+1);
    updateRedRectangle(convertHexToInt(PC.textContent));
    await add_yellow_background_for_WAITTIME(PC);
    return true;
}

const updateRegister_hex2 = async(register, hex2_string) => {
    if(!await isRunning())
        return false;
    register.textContent = hex2_string;
    await add_yellow_background_for_WAITTIME(register);
    return true;
}

const assemblerCommand_update = async(hex2digit_string) => {
    if(!await isRunning())
        return false;
    add_yellow_background_for_WAITTIME(IR);
    change_assemblerCommand(hex2digit_string)
    await addArrow(IR);
    return true;
}


/********************************** composite animations ****************************** */
const get_next_command = async() => {
    stepNumber.textContent = '0';
    if(await description_update('Hole nächsten Befehl')){
        if(await addArrow(PC)){
            if(await transfer('PC', 'ROM2')){
                if(await transfer(getRomElement().id, "SW")){
                    if(await updateRegister_hex2(IR, getRomElement().textContent)){
                        if(await description_update('Erhöhe Programmzähler um 1')){
                            if(await addArrow(PC)){
                                if(await updatePC()){
                                    if(await description_update('Erkenne den Befehl')){
                                        if(await assemblerCommand_update(IR.textContent)){
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

const movAdat_8 = async() => {
    if(await description_update('Hole den Parameter')){
        if(await addArrow(PC)){
            if(await transfer('PC', 'ROM2')){
                if(await transfer(getRomElement().id, "A")){
                    if(await updateRegister_hex2(A, getRomElement().textContent)){
                        if(await description_update('Erhöhe Programmzähler um 1')){
                            if(await addArrow(PC)){
                                if(await updatePC()){
                                    check_AnimationType();
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

const movBdat_8 = async() => {
    if(await description_update('Hole den Parameter')){
        if(await addArrow(PC)){
            if(await transfer('PC', 'ROM2')){
                if(await transfer(getRomElement().id, "B")){
                    if(await updateRegister_hex2(B, getRomElement().textContent)){
                        if(await description_update('Erhöhe Programmzähler um 1')){
                            if(await addArrow(PC)){
                                if(await updatePC()){
                                    check_AnimationType();
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

let programList =   [
                        async function () {  return get_next_command(); },
                        async function () {  return movAdat_8(); },
                        async function () {  return get_next_command(); },
                        async function () {  return movBdat_8(); },
                        async function () {  return get_next_command(); }
                    ];


const run_program = async(currentTime) => {
    for(let i = 0; i<programList.length; i++){
        if(!await programList[i]()){
            return false;
        }
    }
}
const init = () => {
    try {
        document.querySelector(".gridcontainer").removeChild(document.getElementById('movingObject'));
    } catch (error) {
        
    }
    try {
        document.querySelector(".gridcontainer").removeChild(document.getElementById('movingRomElement'));
    } catch (error) {
        
    }
    IO1.textContent = 'FF';
    IO2.textContent = 'FF';
    IO3.textContent = 'FF';
    A.textContent = '00';
    B.textContent = '00';
    C.textContent = '00';
    HL.textContent = '0000';
    IX.textContent = '0000';
    SP.textContent = '0000';
    PC.textContent = '0000';
    ZR.textContent = '0000';
    IR.textContent = '00';
    c_flag.textContent = '0';
    z_flag.textContent = '0';
    p_flag.textContent = '0';
    s_flag.textContent = '0';
    WR.textContent = '0';
    RD.textContent = '0';
    M.textContent = '0';
    IO.textContent = '0';

    stepNumber.textContent = '0';
    stepDescription.textContent = 'Prozessor angehalten';
    assemblerCommand.textContent = '';
    
    updateRedRectangle(convertHexToInt(PC.textContent));
    noAnimation = false;
    animationRuns = false;
    completeExecution = false;

    // let stepNumberBackground = document.getElementsByClassName('sNum')[0];
    // let registerArrow = document.getElementById('registerArrow');
    // let irArrow = document.getElementById('ir_arrow');
    
    // let rom = document.querySelector(".Adresse-000x-1FFx");
    // let ram = document.getElementsByClassName("Adresse-200x-3FFx");
    // let settings = document.getElementById('settings');

}

function draw(){
    updateMovObjPosition(mov);
}

//button functions
function play(){
    animationRuns = true;
    if(stopPressed){
        stopPressed = false;
        run_program();
    }
    document.getElementById('play').toggleAttribute('buttonPressed');
}
function pause(){
    animationRuns = false;
}
function stopBtn(){
    animationRuns = false;
    stopPressed = true;
    init();
}

function increaseSpeed(){
    if(ANIMATION_SPEED < 12)
        ANIMATION_SPEED += 1;
    if(ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 6;
    if(ANIMATION_SPEED === 7)
        ANIMATION_SPEED = 12;
    console.log(ANIMATION_SPEED);
    // if(FRAMES < 200)
    //     FRAMES += 30;
}

function decreaseSpeed(){
    if(ANIMATION_SPEED > 1)
        ANIMATION_SPEED -= 1;
    if(ANIMATION_SPEED === 11)
        ANIMATION_SPEED = 6;
    if(ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 4;
    console.log(ANIMATION_SPEED)

    // if(FRAMES > 30)
    //     FRAMES -= 30;
}

function toggleTheme(){
    document.getElementsByTagName('html')[0].classList.toggle('black');
    console.log(document.getElementsByTagName('h2'))
}

const runNextSingleStep = () => {
    noAnimation = true;
    play();
}

const runCompleteExecution = () => {
    completeExecution = true;
    noAnimation = true;
    play();
}

const toggleSettings = () => {
    
    settings.classList.toggle('toggleDisplay');
}

const toggleFullscreen = () => {
    if(!isFullscreen){
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        }
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }
}