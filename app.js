//resize window
{
let mc8 = document.querySelector(".mc8");
let style = document.querySelector("style");


const resizeWindow = () => {
	if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 3vw;} .h2mov{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw} .textareaFontSize{font-size: 1.4vw;}";
        
    } else {
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 4.3125vh;} .h2mov{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh} .textareaFontSize{font-size: 2.0125vh;}";
    }
}

window.addEventListener('DOMContentLoaded', function () {
	resizeWindow();
});


window.addEventListener('resize', function () {
    resizeWindow();
});
}



/*************************************************************** Classes ***************************************************************/
class PlayStatus{
    constructor(){
        this.play = false;
        this.stop = true;
        this.pause = false;
        this.noAnim = false;
        this.completeExe = false;
        this.rocketSpeed = false;
    }

    getStatus(){
        console.log('play: ' + this.play);
        console.log('stop: ' + this.stop);
        console.log('pause: ' + this.pause);
        console.log('noAnim: ' + this.noAnim);
        console.log('completeExe: ' + this.completeExe);
        console.log('rocketSpeed: ' + this.rocketSpeed);
    }

    setPlay(){
        this.play = true;
        this.stop = false;
        this.pause = false;
    }

    setPause(){
        this.play = false;
        this.stop = false;
        this.pause = true;
        this.completeExe = false;
        this.noAnim = false;
    }

    setStop(){
        this.play = false;
        this.stop = true;
        this.pause = false;
        this.noAnim = false;
        this.completeExe = false;
        this.rocketSpeed = false;
    }

    setCompleteExecution(){
        this.noAnim = true;
        this.completeExe = true;
    }

    setNoAnimation(){
        this.noAnim = true;
    }

    setRocketSpeed(){
        this.rocketSpeed = true;
    }

    setSnailSpeed(){
        this.rocketSpeed = false;
    }

}

/******************************* ROM *********************************** */
class Rom {
	constructor() {
		this.dec_array = this.init_dec();
		this.init_DOM();		
	}
	
	init_dec() {
		let buf_arr = [];
		for (let i = 0; i < 224; i++)
        	buf_arr.push(255);
		return buf_arr;	
    }
	
	init_DOM() {
	    let j = 0;
	    for(var i = 0; i<224; i++){
	        //create a romElement
	        let romElement = document.createElement('p');
	        romElement.classList.add('romElement', 'grid-template');
	        romElement.id = "romElement" + String(i);
	
	        //after every 8th romElement -> new line should be filled
	        if(!(i%8) && i !== 0)
	            j++;
	
	        romElement.textContent = 'FF';
	
	        //define Position of romElement
	        romElement.style.top = String(100/32*(j+2)) + "%";
	        romElement.style.left = String(100/46*((i%8)+2)) + "%";
	
	        //add romElement to body
	        document.querySelector(".gridcontainer").appendChild(romElement);    
	    }
	    return true;
    }

    update() {
		let buf_string = '';
        let linker_string = linkerFile.value.replace(/\r\n|\n|\r/gm, '');
		
		//update dec_arr
		for (let i = 0; i < linker_string.length; i++) {
        	if(linker_string[i] === ':'){
            	if(linker_string[i+8] === '1')
                	break;
                let length = Number(linker_string[i+2]);
                let adress = convertHexToInt(linker_string[i+3]+linker_string[i+4]+linker_string[i+5]+linker_string[i+6]);

            	for (let j = 0; j < length; j++) {
                    this.dec_array[adress+j] = convertHexToInt(linker_string[i+9+j*2]+linker_string[i+10+j*2]);                          
            	}   
        	}
    	}
		
		//update DOM
		for(let i = 0; i<224; i++){
        	buf_string = this.dec_array[i].toString(16).toUpperCase();
        	if(buf_string.length === 1)
            	buf_string = '0' + buf_string;
        	document.getElementById("romElement" + String(i)).textContent = buf_string;
		}
    }
    
    getPCValue(PC_dec) {
        return this.dec_array[PC_dec];
    }
}

/******************************* RedRactangle *********************************** */
class RedRactangle {

}

/******************************* IOs *********************************** */

class IO{
	constructor(IO_DOM){
		this.dec = 255;
		this.DOM = IO_DOM;
	}
	
	update(decimal_number){
		this.dec = decimal_number;
		this.DOM.textcontent = convertNumberToHex_2digits(decimal_number);
	}
}

/******************************* Register *********************************** */

class Register_x2 {
	constructor(register_DOM){
		this.DOM = register_DOM;
		this.dec = 255;
	}
	
	update(decimal_number){
		this.dec = decimal_number;
		this.DOM.textContent = convertNumberToHex_2digits(decimal_number);		
	}
	
}

class Register_x4 {
	constructor(register_DOM){
		this.dec = 0;
		this.DOM = register_DOM;
		this.hi_dec = 0;
		this.low_dec = 0;
	}
	
	update(decimal_number){
		this.dec = decimal_number;
		this.DOM.textContent = convertNumberToHex_4digits(decimal_number);
	}	
	
	update_low(decimal_number){
		let buf_string = this.DOM.textContent;
		this.low_dec = decimal_number;
		this.DOM.textContent = buf_string[0] + buf_string[1] + convertIntToHex(decimal_number);
	}
	
	update_hi(decimal_number){
		let buf_string = this.DOM.textContent;
		this.hi_dec = decimal_number;
		this.DOM.textContent = convertIntToHex(decimal_number) + buf_string[2] + buf_string[3];
	}
}

/******************************* Flags *********************************** */

class Flags {
	constructor(c_flag_DOM, z_flag_DOM, p_flag_DOM, s_flag_DOM){
		this.c_dec = 0;
		this.z_dec = 0;
		this.p_dec = 0;
		this.s_dec = 0;
		this.c_DOM = c_flag_DOM;
		this.z_DOM = z_flag_DOM;
		this.p_DOM = p_flag_DOM;
		this.s_DOM = s_flag_DOM;
	}
	
	update(c_0or1, z_0or1, p_0or1, s_0or1){
		this.c_dec = c_0or1;
		this.z_dec = z_0or1;
		this.p_dec = p_0or1;
		this.s_dec = s_0or1;
		this.c_DOM.textContent = c_0or1.toString();
		this.z_DOM.textContent = z_0or1.toString();
		this.p_DOM.textContent = p_0or1.toString();
		this.s_DOM.textContent = s_0or1.toString();
	}	
}

/******************************* mc8_command ********************************* */

class mc8_command {
    constructor(assembler_notation_string, maschinecode_dec, maschinecode_hex_string, bytes, flags_array, animationFunction){
        this.assembler_notation_string = assembler_notation_string;
        this.maschinecode_dec = maschinecode_dec;
        this.maschinecode_hex_string = maschinecode_hex_string;
        this.bytes = bytes;
        this.flags_array = flags_array;
        this.animationFunction = animationFunction;
    }
    
    async runAnimation() {
        return this.animationFunction();        
    }
}

//variables
let isFullscreen = false;
let ANIMATION_SPEED = 2;
const playStatus = new PlayStatus();
const WAITTIME = 500;
const NOANIMATIONTIME = 30;
const FRAMES = 60;


//variables DOM
const IO1 = new IO(document.getElementById('IO1'));
const IO2 = new IO(document.getElementById('IO2'));
const IO3 = new IO(document.getElementById('IO3'));
const A   = new Register_x2(document.getElementById('A'));
const B   = new Register_x2(document.getElementById('B'));
const C   = new Register_x2(document.getElementById('C'));
const IR  = new Register_x2(document.getElementById('IR'));
const HL  = new Register_x4(document.getElementById('HL'));
const IX  = new Register_x4(document.getElementById('IX'));
const SP  = new Register_x4(document.getElementById('SP'));
const PC  = new Register_x4(document.getElementById('PC'));
const ZR  = new Register_x4(document.getElementById('ZR'));
const FLAGS = new Flags(document.getElementById('C_Flag'),document.getElementById('Z_Flag'),document.getElementById('P_Flag'),document.getElementById('S_Flag'));
const ROM = new Rom();

let assemblerCommand = document.getElementById('assemblerCommand');
let stepNumber = document.getElementById('stepNumber');
let stepDescription = document.getElementById('stepDescription');
let stepNumberBackground = document.getElementsByClassName('sNum')[0];
let registerArrow = document.getElementById('registerArrow');
let irArrow = document.getElementById('ir_arrow');
let WR = document.getElementById('WR');
let RD = document.getElementById('RD');
let M = document.getElementById('M');
let io = document.getElementById('IO');
let settings = document.getElementById('settings');
let linkerFile = document.getElementById('linkerFile');
let commandSelect = document.getElementById('commandSelect');

/***************************************** Hover variables *********************************/
const rom_h1 = document.getElementById('rom_h1');
rom_h1.addEventListener('mouseover', function() {
    document.getElementById('rom_hover').classList.toggle('toggleGrid');
});
rom_h1.addEventListener('mouseleave', function() {
    document.getElementById('rom_hover').classList.toggle('toggleGrid'); 
});

const ram_h1 = document.getElementById('ram_h1');
ram_h1.addEventListener('mouseover', function() {
    document.getElementById('ramStartAdress_hex').textContent = convertNumberToHex_4digits(startAdressRam_dec) + 'h';
    document.getElementById('ramStartAdress_dec').textContent = String(startAdressRam_dec);
    document.getElementById('ramEndAdress_hex').textContent = convertNumberToHex_4digits(startAdressRam_dec+8192-1) + 'h';
    document.getElementById('ramEndAdress_dec').textContent = String(startAdressRam_dec+8192-1);
    document.getElementById('ram_hover').classList.toggle('toggleGrid');
});
ram_h1.addEventListener('mouseleave', function() {
    document.getElementById('ram_hover').classList.toggle('toggleGrid'); 
});

const io1_h1 = document.getElementById('io1_h1');
io1_h1.addEventListener('mouseover', function() {
    document.getElementById('io1Map').textContent = document.querySelector('input[name="radioMap"]:checked').value;
    document.getElementById('io1Adress_hex').textContent =  document.getElementById('io1Adress').value + 'h';
    document.getElementById('io1_hover').classList.toggle('toggleGrid');
});
io1_h1.addEventListener('mouseleave', function() {
    document.getElementById('io1_hover').classList.toggle('toggleGrid'); 
});

const io2_h1 = document.getElementById('io2_h1');
io2_h1.addEventListener('mouseover', function() {
    document.getElementById('io2Map').textContent = document.querySelector('input[name="radioMap"]:checked').value;
    document.getElementById('io2Adress_hex').textContent =  document.getElementById('io2Adress').value + 'h';
    document.getElementById('io2_hover').classList.toggle('toggleGrid');
});
io2_h1.addEventListener('mouseleave', function() {
    document.getElementById('io2_hover').classList.toggle('toggleGrid'); 
});

const io3_h1 = document.getElementById('io3_h1');
io3_h1.addEventListener('mouseover', function() {
    document.getElementById('io3Map').textContent = document.querySelector('input[name="radioMap"]:checked').value;
    document.getElementById('io3Adress_hex').textContent =  document.getElementById('io3Adress').value + 'h';
    document.getElementById('io3_hover').classList.toggle('toggleGrid');
});
io3_h1.addEventListener('mouseleave', function() {
    document.getElementById('io3_hover').classList.toggle('toggleGrid'); 
});

/***************************************** settings functions *********************************/
commandSelect.addEventListener('input', function() {
    switch(commandSelect.value){
        case 'own':
            linkerFile.value = 'Fügen Sie hier den Inhalt der vom Linker erzeugten .OBJ-Datei ein.\n(im Intel-HEX-Format)';
            break;
        case 'test':
            linkerFile.value = ':020000003E01BF\n:020002000602F4\n:020004003E03B9\n:020006000604EE\n:020008003E05B3\n:02000A000606E8\n:00000001FF';
            break;
        default:
            linkerFile.value = '';
            break;

    }
})

let adressRAM = document.getElementById('adressRAM');
let startAdressRam_dec = 8192;
adressRAM.addEventListener('input', function() {  
    switch (adressRAM.value) {
        case '2000h':
            changeRamAdress('20', '3F');
            break;
        case '4000h':
            changeRamAdress('40', '5F');
            break;
        case '6000h':
            changeRamAdress('60', '7F');
            break;
        case '8000h':
            changeRamAdress('80', '9F');
            break;
        case 'A000h':
            changeRamAdress('A0', 'BF');  
            break;
        case 'C000h':
            changeRamAdress('C0', 'DF');
            break;
        case 'E000h':
            changeRamAdress('E0', 'FF');
            break;
        default:
            break;
    }

})

const changeRamAdress = (hex1_string, hex2_string) => {
    const pEle = document.getElementsByClassName('RamAdressLabel');
    const str = ['0','1', '2','3','4','5','6','9','A','B','C','D','E','F'];
    startAdressRam_dec = convertHexToInt(hex1_string + '00');
    for (let i = 0; i < pEle.length; i++) {
        if(i<7){
            pEle[i].textContent = hex1_string + str[i] + 'x';
        }else{
            pEle[i].textContent = hex2_string + str[i] + 'x';
        }
    }
}


const changeInputArrow = (radioName_String) =>{
    if(document.querySelector(`input[name= "${radioName_String}"]:checked`).value === Out){
        document.getElementById(id_String).classList.toggle('')
    }
    
}


/***************************************** conversion Hex/Int *********************************/
const convertHexToInt = (hex_string) => {
    return parseInt(hex_string, 16);
}

const convertNumberToHex_4digits = (number_dec) => {
    number_dec = number_dec.toString(16);
    number_dec = number_dec.toUpperCase();
    let len = number_dec.length;
    for(i=4; i>len;i--){
        number_dec = '0' +number_dec;
    }
    return number_dec;
}

const convertNumberToHex_2digits = (number_dec) => {
    number_dec = number_dec.toString(16);
    number_dec = number_dec.toUpperCase();
    let len = number_dec.length;
    for(i=2; i>len;i--){
        number_dec = '0' + number_dec;
    }
    return number_dec;
}


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


const getRomElement = (position_dec = PC.dec) => document.getElementById('romElement' + String(position_dec));

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
const convertlabelToPoint = (fixPointLabel_string) =>{
    for(let i=0; i<fixPoints.length;i++){
        if(fixPoints[i].label === fixPointLabel_string)
           return fixPoints[i];
    }
    return null;
}

const getPointIndex = (elementID_string) =>{
     for(let i=0; i<fixPoints.length;i++){
         if(fixPoints[i].label === elementID_string)
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

const romElementToROM1 = (romElementID_string) =>{
    let toROM1 = [];
    let romElement = document.getElementById(romElementID_string);
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

const getPointsAtoB = (fixPointLabel_A_string, fixPointLabel_B_string) => {
    let pointsAtoB = [];
    let pointA = 0;
    let pointB = 0;

    if(fixPointLabel_A_string.includes('romElement')){
        pointsAtoB = getPointsAtoB('ROM1',fixPointLabel_B_string);
        pointsAtoB = romElementToROM1(fixPointLabel_A_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    
    pointA = convertlabelToPoint(fixPointLabel_A_string);
    pointB = convertlabelToPoint(fixPointLabel_B_string);

    pointsAtoB = getAtoBindexArray(getZeroToAindexArray(getPointIndex(fixPointLabel_A_string)),
                                   getZeroToAindexArray(getPointIndex(fixPointLabel_B_string)));

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
    redRectangle.textContent = convertNumberToHex_2digits(ROM.dec_array[PC_IntValue]);
    redRectangle.style.left = String(100/46*(xPos)) + "%";
    redRectangle.style.top = String(100/32*(yPos)) + "%";
}

/*********************************** moving object ************************************/
const createMovingObj = (elementId, aPath) => {
    // select the div which should be moved
    let clone = document.getElementById(elementId).cloneNode(true);
    clone.classList.add("boxborder" ,"rounded");
    clone.style.zIndex = "5";
    clone.id = "movingObject";
    clone.style.background = "yellow";
    clone.style.color = "#222222";
    clone.style.top = String(100/32*aPath[0].y) +"%";
    clone.style.left = String(100/46*aPath[0].x) +"%";

    if(elementId.includes('romElement')){
        clone.id = "movingRomElement";
        clone.classList.add('square2x2' , 'h2mov');
    }

    document.querySelector(".gridcontainer").appendChild(clone);
    let  movObj = {aDiv: clone, path: aPath};
    return movObj;
}


/******************************* ANIMATION IMPLIMENTATION *************************************** */

/******************** basic functions ********************/
const pausePressed = async() =>{
    while(true){
        if(playStatus.play){
            return true;
        } else {
            console.log('waiting for userinput');
            await Sleep(100);
        }
    }
}
const isRunning = async() => { // function checks if play/pause/stop is pressed
    while(true) {
        if(playStatus.play)
            return true;
        if(playStatus.stop)
            throw Error('Stop Pressed');
        
        console.log('waiting for userinput'); //if pause is pressed user will be caught in this loop till pressing play or stop
        await Sleep(100);
    }
}
const Sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const Sleep_Waittime = () => Sleep(WAITTIME);

const Sleep_NoAnimationTime = () => Sleep(NOANIMATIONTIME);

const check_completeExecution = () => {     //checks if completeExecution is true
    if(!playStatus.completeExe){
        if(playStatus.noAnim){
            description_update('Prozessor angehalten');
            playStatus.setPause();
            playStatus.getStatus();
        }
    }
}

const pushNextCommand = () => {
    switch(IR.dec){
        case 62: //3E
            runningProgramm.push(movAdat_8);
            break;
        case 6: //06
            runningProgramm.push(movBdat_8);
            break;
        case 118: //76
            return;
        default:
            //throw Error('push next command not found');
            break;
    }
    runningProgramm.push(get_next_command);
    return;
}

/******************** instant changes ********************/
const change_stepDescription = (StringDescription) => stepDescription.textContent = StringDescription;

const increaseStepNumber = () => stepNumber.textContent = String(Number(stepNumber.textContent)+1);

const change_assemblerCommand = () =>{      //throws Error
    for(i=0; i<mc8_commands_array.length; i++){
        if(mc8_commands_array[i].maschinecode_dec === IR.dec){
            assemblerCommand.textContent = mc8_commands_array[i].assembler_notation_string;
            return true;
        }
    }
    assemblerCommand.textContent = 'Befehl unbekannt';
    return false;
}

//*********************************Moving Anmiations*********************************
const calcIntermediatePositions = (path) => {
    let xPositions = [];
    let yPositions = [];
    let bufferX = [];
    let bufferY = [];
    let posDiff = 0;
    const interPointsQuantity = 12; //max Speed = 12
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

const transfer = async(fixPointLabel_A_string, fixPointLabel_B_string) => {
    await isRunning();
    if(!playStatus.noAnim){
        const path = getPointsAtoB(fixPointLabel_A_string, fixPointLabel_B_string);
        let movingObject = createMovingObj(fixPointLabel_A_string, path);
        const movingObjectCoordinates = calcIntermediatePositions(path);
        const xCoord = movingObjectCoordinates[0];
        const yCoord = movingObjectCoordinates[1];
        //await Sleep_Waittime(); //intended pause to reduce lag
        
        //TODO: arrows
        if(playStatus.rocketSpeed){
            document.querySelector(".gridcontainer").classList.add('bussystem_yellow');
            await Sleep_Waittime();
            document.querySelector(".gridcontainer").classList.remove('bussystem_yellow');
            await Sleep_Waittime();
        } else {
            for (let i = 0; i < movingObjectCoordinates[0].length; i++) {  //iterate through Coordinates
                await conditionalPositionupdate(xCoord[i], yCoord[i], ANIMATION_SPEED, movingObject)
            }
        }       

        movingObject.aDiv.remove();
        movingObject = 0;  
    }
    
    return true;
}

const conditionalPositionupdate = async(xCoord, yCoord, speed, movingObject) => {
    for (let j = 0; j < xCoord.length/speed; j++) {
        await isRunning()
        updatePosition(movingObject, xCoord[j*speed], yCoord[j*speed]);
        await Sleep(1000/FRAMES);
    }
    return true;
}

/********************************** single animations ****************************** */
const add_yellow_background_for_WAITTIME = async(variable_DOM) => {
    await isRunning()
    
    if(!playStatus.noAnim){
        variable_DOM.classList.add('yellowBg');
        variable_DOM.style = "color: black";
        await Sleep_Waittime();
        variable_DOM.classList.remove('yellowBg');
        variable_DOM.style = "";
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

const addArrow = async(register_string) => {
    if(!await isRunning()){
        return false;
    }
    if(!playStatus.noAnim){
        if(register_string === 'PC'){
            registerArrow.classList.add('PC_arrow');
            await Sleep_Waittime();
            registerArrow.classList.remove('PC_arrow');
        }
        else if(register_string === 'IR'){
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
    //PC.DOM.textContent = convertNumberToHex_4digits(convertHexToInt(PC.DOM.textContent)+1);
    PC.update(PC.dec + 1);
    updateRedRectangle(PC.dec);
    await add_yellow_background_for_WAITTIME(PC.DOM);
    return true;
}

const updateRegister_hex2 = async(register_class, hex2_dec) => {
    if(!await isRunning())
        return false;
    register_class.update(hex2_dec);
    await add_yellow_background_for_WAITTIME(register_class.DOM);
    return true;
}

const assemblerCommand_update = async() => {
    if(!await isRunning())
        return false;
    add_yellow_background_for_WAITTIME(IR.DOM);
    if(!change_assemblerCommand()){
        await addArrow('IR');
        throw Error('Unknown command');
    }
    await addArrow('IR');
}


/********************************** composite animations ****************************** */

const get_next_command = async() => {
    stepNumber.textContent = '0';
    assemblerCommand.textContent = '';
    const romEle = getRomElement();
    
    await description_update('Hole nächsten Befehl');
    await addArrow('PC');
    await transfer('PC', 'ROM2');
    await transfer(romEle.id, "SW");
    await updateRegister_hex2(IR, ROM.getPCValue(PC.dec));
    await description_update('Erhöhe Programmzähler um 1');
    await addArrow('PC');
    await updatePC();
    await description_update('Erkenne den Befehl');
    await assemblerCommand_update()
    pushNextCommand();
    return true;
}

const movAdat_8 = async() => {
    const romEle = getRomElement();
    await description_update('Hole den Parameter');
    await addArrow('PC');
    await transfer('PC', 'ROM2');
    await transfer(romEle.id, 'A');
    await updateRegister_hex2(A, ROM.getPCValue(PC.dec));
    await description_update('Erhöhe Programmzähler um 1');
    await addArrow('PC');
    await updatePC();
    check_completeExecution();
    return true;
}

const movBdat_8 = async() => {
    const romEle = getRomElement();
    await description_update('Hole den Parameter');
    await addArrow('PC');
    await transfer('PC', 'ROM2');
    await transfer(romEle.id, 'B');
    await updateRegister_hex2(B, ROM.getPCValue(PC.dec));
    await description_update('Erhöhe Programmzähler um 1');
    await addArrow('PC');
    await updatePC();
    check_completeExecution();
    return true;
}

let runningProgramm = [get_next_command];

const run_program = async(currentTime) => {
    let i = 0;
    while(true){
        if(runningProgramm[i] === undefined)
            return false;
        try{
            await runningProgramm[i]()
            // if(!await runningProgramm[i]()){
            //     return false;
            // } 
        }
        catch(e){
            console.log('In catch:');
            console.log(e);
        }
        
        i++;
    }
}

const init = () => {
    runningProgramm = [get_next_command];
    try {
        document.querySelector(".gridcontainer").removeChild(document.getElementById('movingObject'));
    } catch (error) {
        
    }
    try {
        document.querySelector(".gridcontainer").removeChild(document.getElementById('movingRomElement'));
    } catch (error) {
        
    }
    IO1.update(255);
    IO2.update(255);
    IO3.update(255);
    A.update(0);
    B.update(0);
    C.update(0);
    HL.update(0);
    IX.update(0);
    SP.update(0);
    PC.update(0);
    ZR.update(0);
    IR.update(0);
    FLAGS.update(0,0,0,0);
    WR.textContent = '0';
    RD.textContent = '0';
    M.textContent = '0';
    io.textContent = '0';

    stepNumber.textContent = '0';
    stepDescription.textContent = 'Prozessor angehalten';
    assemblerCommand.textContent = '';
    
    updateRedRectangle(convertHexToInt(PC.dec));
}

/********************************** button functions ****************************** */

function play(){

    if(playStatus.stop){
        playStatus.setPlay();
        run_program();
    }
    playStatus.setPlay();
    
    // if(stopPressed){
    //     stopPressed = false;
    //     run_program();
    // }
    document.getElementById('play').toggleAttribute('buttonPressed');
}
function pause(){
    playStatus.setPause();
}
function stopBtn(){
    playStatus.setStop();
    init();
}

function increaseSpeed(){
    if(ANIMATION_SPEED < 12)
        ANIMATION_SPEED += 1;
    if(ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 6;
    if(ANIMATION_SPEED === 7)
        ANIMATION_SPEED = 12;
}

function decreaseSpeed(){
    if(ANIMATION_SPEED > 1)
        ANIMATION_SPEED -= 1;
    if(ANIMATION_SPEED === 11)
        ANIMATION_SPEED = 6;
    if(ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 4;
}

function toggleTheme(){
    document.getElementsByTagName('html')[0].classList.toggle('black');
}

const rocketSpeed_on = () => {
    playStatus.setRocketSpeed();
}

const snailSpeed_on = () => {
    playStatus.setSnailSpeed();
}

const runNextSingleStep = () => {
    playStatus.setNoAnimation();    
    play();
}

const runCompleteExecution = () => {
    playStatus.setCompleteExecution();
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

const saveSettings = () => {
    stopBtn(); //init
    ROM.update();
    updateRedRectangle(0);
    toggleSettings();
}


/******************************* mc8_commands *********************************** */

const mc8_commands_array = [
    movAdat_8_command = new mc8_command('MOV A, dat_8', 62, '3E', 2, [0,0,0,0], movAdat_8),
    movBdat_8_command = new mc8_command('MOV B, dat_8',  6, '06', 2, [0,0,0,0], movBdat_8)

];