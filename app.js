//resize window
{
let mc8 = document.querySelector(".mc8");
let style = document.querySelector("style");


const resizeWindow = () => {
	if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.6vw;} p{font-size: 1.2vw;} h2{font-size: 3vw;} .h2mov{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw} .textareaFontSize{font-size: 1.4vw;}";
        
    } else {
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.3vh;} p{font-size: 1.725vh;} h2{font-size: 4.3125vh;} .h2mov{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh} .textareaFontSize{font-size: 2.0125vh;}";
    }
}

window.addEventListener('DOMContentLoaded', function () {
	resizeWindow();
});


window.addEventListener('resize', function () {
    resizeWindow();
});
}

/***************************************** DOM_Selectors *********************************/
let assemblerCommand = document.getElementById('assemblerCommand');
let stepNumber = document.getElementById('stepNumber');
let stepDescription = document.getElementById('stepDescription');
let stepNumberBackground = document.getElementsByClassName('sNum')[0];
let registerArrow = document.getElementById('registerArrow');
let irArrow = document.getElementById('ir_arrow');
let flagsArrow = document.getElementById('flagsArrow');
let cFlag_arrow = document.getElementById('cFlag_arrow');
let jump_arrow = document.getElementById('jump_arrow');
let settings = document.getElementById('settings');
const movingFlags = document.getElementById('movingFlags');
const flags_DOM = document.getElementById('flags');
const grid = document.querySelector(".gridContainer");
const yellowBgElement = document.getElementById('yellowBgElement');
const IO1_input_window = document.getElementById('IO1_input_window');
const IO2_input_window = document.getElementById('IO2_input_window');
const IO3_input_window = document.getElementById('IO3_input_window');
const IO1_input = document.getElementById('IO1_input');
const IO2_input = document.getElementById('IO2_input');
const IO3_input = document.getElementById('IO3_input');

const movingObject = document.getElementById('movingObject');
const movingAlu1 = document.getElementById('movingAlu1');
const movingAlu2 = document.getElementById('movingAlu2');

/***************************************** conversion Hex/Int *********************************/
const convertHexToNumber = (hex_string) => {
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

const convertNumberToBinary_8digits = (number_dec) => {
    let str = (number_dec).toString(2);
    const len = str.length;
    if(len != 8){
        for (let i = 0; i < 8-len; i++) {
            str = '0' + str;
        }
    }
    str = str[0] +str[1] +str[2]+str[3]+ ' ' +str[4]+str[5]+str[6]+str[7];
    return str;
}

const convertNumberToBinaryArray = (number_dec) => {
    let bin = convertNumberToBinary_8digits(number_dec).replace(' ', '');
    let buf = [];
    for (let i = 0; i < bin.length; i++) {
       buf.push(Number(bin[i]));
    }
    return buf;
}

const convertBinaryToNumber = (binary_dec) => {
    let str = '0b' + String(binary_dec);
    return Number(str);    
}

const convertNumberToComplementOnTwo = (number_dec) => {
    if(number_dec>127){
        number_dec = number_dec-256;
    }
    return number_dec;
}


/***************************************** ALU operations *********************************/

//sets the flags, 0 == don't set flag, 1 == setFlag
const setFlags = (value_dec, result_bin_array, carry_bin_array, cFlag_dec, zFlag_dec, pFlag_dec,vFlag_dec, sFlag_dec) => {
    
    //carry flag
    if(cFlag_dec){
        FLAGS.c_dec = carry_bin_array[0];
    }
    else{
        FLAGS.c_dec = '-';
    }

    //zero flag
    if(zFlag_dec){
        if(value_dec  === 0)
            FLAGS.z_dec = 1;
        else
            FLAGS.z_dec = 0;
    }
    else{
        FLAGS.z_dec = '-';
    }

    //sing flag
    if(sFlag_dec){
        FLAGS.s_dec = result_bin_array[0];
    }
    else{
        FLAGS.s_dec = '-';
    }

    //parity flag
    if(pFlag_dec){
        let cnt = 0;
        for (let i = 0; i < result_bin_array.length; i++) {
            if(result_bin_array[i])
                cnt += 1;        
        }
        if(cnt%2 === 0)
            FLAGS.p_dec = 1;
        else
            FLAGS.p_dec = 0;
    }
    //overflow flag
    else if(vFlag_dec){
        if((carry_bin_array[0] === 1 && carry_bin_array[1] === 0) || (carry_bin_array[0] === 0 && carry_bin_array[1] === 1))
            FLAGS.p_dec = 1;
        else
            FLAGS.p_dec = 0;
    }
    else{
        FLAGS.p_dec = '-';
    }
}

const addBinary = (value1_dec, value2_dec, ersatzAddition_boolean) => {
    let value1_bin = convertNumberToBinaryArray(value1_dec);
    let value2_bin = convertNumberToBinaryArray(value2_dec);
    let carry_bin = [0,0,0,0,0,0,0,0,0];
   
    if(ersatzAddition_boolean){
        carry_bin[8] = 1;
        for (let i = 0; i < value2_bin.length; i++) {
            if(value2_bin[i] === 0)
                value2_bin[i] = 1;
            else
                value2_bin[i] = 0;
        }
    }
        
    let sum_bin =   [0,0,0,0,0,0,0,0];
    let sum_dec = 0;

    for (let i = 8; i > 0; i--) {
        if(value1_bin[i-1] + value2_bin[i-1]+ carry_bin[i] === 1){
            carry_bin[i-1] = 0;
            sum_bin[i-1] = 1;
        }
        else if(value1_bin[i-1] + value2_bin[i-1]+ carry_bin[i] === 2){
            carry_bin[i-1] = 1;
            sum_bin[i-1] = 0;
        }
        else if(value1_bin[i-1] + value2_bin[i-1]+ carry_bin[i] === 3){
            carry_bin[i-1] = 1;
            sum_bin[i-1] = 1;
        }
    }


    sum_dec = convertBinaryToNumber(sum_bin.join(''));
     
    //set Flags
    setFlags(sum_dec, sum_bin, carry_bin, 1,1,0,1,1);

    //if the addition was a replace-addition switch sign-flag
    if(ersatzAddition_boolean){
        if(FLAGS.c_dec)
            FLAGS.c_dec = 0;
        else
            FLAGS.c_dec = 1;
    }

    return sum_dec;
}

const incBinary = (value_dec) => {
    const result_dec = addBinary(value_dec, 1,false);
    FLAGS.c_dec = '-';
    return result_dec;
}

const decBinary = (value_dec) => {
    const result_dec = addBinary(value_dec, 1, true);
    FLAGS.c_dec = '-';
    return result_dec;
}

const andBinary = (value1_dec, value2_dec) => {
    let value1_bin = convertNumberToBinaryArray(value1_dec);
    let value2_bin = convertNumberToBinaryArray(value2_dec);
    let result_bin =   [0,0,0,0,0,0,0,0];
    let result_dec = 0;
 

    for (let i = 8; i > 0; i--) {
        if(value1_bin[i-1] && value2_bin[i-1]){
            result_bin[i-1] = 1;
        }
    }

    result_dec = convertBinaryToNumber(result_bin.join(''));

    setFlags(result_dec, result_bin, [0], 1, 1,1,0,1);
    
    return result_dec;
}

const orBinary = (value1_dec, value2_dec) => {
    let value1_bin = convertNumberToBinaryArray(value1_dec);
    let value2_bin = convertNumberToBinaryArray(value2_dec);
    let result_bin =   [0,0,0,0,0,0,0,0];
    let result_dec = 0;

    for (let i = 8; i > 0; i--) {
        if(value1_bin[i-1] || value2_bin[i-1]){
            result_bin[i-1] = 1;
        }
    }

    result_dec = convertBinaryToNumber(result_bin.join(''));

    setFlags(result_dec, result_bin, [0], 1,1,1,0,1);
    
    
    return result_dec;
}

const xorBinary = (value1_dec, value2_dec) => {
    let value1_bin = convertNumberToBinaryArray(value1_dec);
    let value2_bin = convertNumberToBinaryArray(value2_dec);
    let result_bin =   [0,0,0,0,0,0,0,0];
    let result_dec = 0;

    for (let i = 8; i > 0; i--) {
        if(value1_bin[i-1] ^ value2_bin[i-1]){
            result_bin[i-1] = 1;
        }
    }

    result_dec = convertBinaryToNumber(result_bin.join(''));

    setFlags(result_dec, result_bin, [0], 1,1,1,0,1);
    
    
    return result_dec;
}

const shlBinary = (value_dec) => {
    let value_bin = convertNumberToBinaryArray(value_dec);
    let result_dec = 0;
    let firstBit = value_bin[0];

    for (let i = 0; i < value_bin.length-1; i++) {
        value_bin[i] = value_bin[i+1];        
    }
    value_bin[7] = 0;

    result_dec = convertBinaryToNumber(value_bin.join(''));

    setFlags(result_dec, value_bin, [firstBit], 1,1,1,0,1);
    
    return result_dec;
}

const shrBinary = (value_dec) => {
    let value_bin = convertNumberToBinaryArray(value_dec);
    let result_dec = 0;
    let lastBit = value_bin[7];

    for (let i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i-1];        
    }
    value_bin[0] = 0;

    result_dec = convertBinaryToNumber(value_bin.join(''));

    setFlags(result_dec, value_bin, [lastBit], 1,1,1,0,1);
    
    return result_dec;
}

const rclBinary = (value_dec) => {
    let value_bin = convertNumberToBinaryArray(value_dec);
    let result_dec = 0;

    //save bit position 7 for setFlags ( [7,6,5,4,3,2,1,0])
    let carry_dec = value_bin[0];

    //shift all bits left
    for (let i = 0; i < value_bin.length-1; i++) {
        value_bin[i] = value_bin[i+1];        
    }

    //write carry-flag in bit position 0 
    value_bin[7] = FLAGS.c_dec;

    result_dec = convertBinaryToNumber(value_bin.join(''));

    //set flags
    setFlags(result_dec, value_bin, [carry_dec], 1,0,0,0,0);
    
    return result_dec;
}

const rolBinary = (value_dec) => {
    let value_bin = convertNumberToBinaryArray(value_dec);
    let result_dec = 0;

    //save bit position 7 for setFlags [7,6,5,4,3,2,1,0]
    //                                  ^
    let carry_dec = value_bin[0];

    //shift all bits left
    for (let i = 0; i < value_bin.length-1; i++) {
        value_bin[i] = value_bin[i+1];        
    }

    //write former bit 7 in bit position 0 
    value_bin[7] = carry_dec;

    result_dec = convertBinaryToNumber(value_bin.join(''));

    setFlags(result_dec, value_bin, [carry_dec], 1,0,0,0,0);
    
    return result_dec;
}

const rcrBinary = (value_dec) => {
    let value_bin = convertNumberToBinaryArray(value_dec);
    let result_dec = 0;

    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    let carry_dec = value_bin[7];

    for (let i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i-1];        
    }

    //write carry-flag into bit 7
    value_bin[0] = FLAGS.c_dec;

    result_dec = convertBinaryToNumber(value_bin.join(''));

    setFlags(result_dec, value_bin, [carry_dec], 1,0,0,0,0);
    
    return result_dec;
}

const rorBinary = (value_dec) => {
    let value_bin = convertNumberToBinaryArray(value_dec);
    let result_dec = 0;

    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    let carry_dec = value_bin[7];

    for (let i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i-1];        
    }

    //write former bit 0 into bit 7
    value_bin[0] = carry_dec;

    result_dec = convertBinaryToNumber(value_bin.join(''));

    setFlags(result_dec, value_bin, [carry_dec], 1,0,0,0,0);
    
    return result_dec;
}

/*************************************************************** Classes ***************************************************************/
class PlayStatus{
    constructor(){
        this.play = false;
        this.stop = true;
        this.pause = false;
        this.oneCommand = false;
        this.noAnim = false;
        this.completeExe = false;
        this.rocketSpeed = false;
    }

    getStatus(){
        if(this.completeExe)
            return 'completeExe';
        else if(this.rocketSpeed)
            return 'rocketSpeed';
        else if(this.noAnim)
            return 'noAnim';
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
        this.oneCommand = false;
        this.noAnim = false;
        this.completeExe = false;
    }
    setOneCommand(){
        this.oneCommand = true;
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

/******************************* ROM/RAM *********************************** */
class Rom {
	constructor() {
		this.dec_array = this.init_dec();
        this.init_DOM();	
        this.startAddressRom_dec = 0;
        this.size_dec = 8192;
	}
	
	init_dec() {
		let buf_arr = [];
		for (let i = 0; i < 8192; i++)
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
	        grid.appendChild(romElement);    
	    }
	    return true;
    }

    update() {
		let buf_string = '';
        let linker_string = linkerFile.value.replace(/\r\n|\n|\r/gm, '');
		this.dec_array = this.init_dec();
		//update dec_arr
		for (let i = 0; i < linker_string.length; i++) {
        	if(linker_string[i] === ':'){
            	if(linker_string[i+8] === '1')
                	break;
                let length = Number(linker_string[i+2]);
                let address = convertHexToNumber(linker_string[i+3]+linker_string[i+4]+linker_string[i+5]+linker_string[i+6]);
                
            	for (let j = 0; j < length; j++) {
                    this.dec_array[address+j] = convertHexToNumber(linker_string[i+9+j*2]+linker_string[i+10+j*2]);                          
            	}   
        	}
    	}
		
		//update DOM
		for(let i = 0; i<224; i++){
        	buf_string = this.dec_array[i].toString(16).toUpperCase();
        	if(buf_string.length === 1) //if number is smaller than 10 -->Bsp(0F) 
            	buf_string = '0' + buf_string;
        	document.getElementById("romElement" + String(i)).textContent = buf_string;
		}
    }
    
    getValue(address_dec) {
        return this.dec_array[address_dec];
    }

    getElementId = (position_dec = PC.dec) => {
        if (position_dec > 223) {
            const romElementLast = document.getElementById('romElementLast');
            romElementLast.style.top = String(100/32*30) +'%';
            romElementLast.style.left = String(100/46*4) + '%';
            return romElementLast.id;
        }
        return document.getElementById('romElement' + String(position_dec)).id;
    } 
}

class Ram {
    constructor() {
        this.startAddressRam_dec = 8192;
        this.size_dec = 8192;
		this.dec_array = this.init_dec();
        this.init_DOM();	
	}
	
	init_dec() {
		let buf_arr = [];
		for (let i = 0; i < 8192; i++)
        	buf_arr.push(255);
		return buf_arr;	
    }
	
	init_DOM = () => {
        let j = 0;
        for(var i = 0; i<224; i++){
            //create a ramElement (same CSS as romElement)
            let ramElement = document.createElement('p');
            ramElement.classList.add('romElement', 'grid-template');
            if(i<112)
                ramElement.id = 'ramElement' + String(i);
            else
                ramElement.id = 'ramElement' + String(i+8192-224);
    
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
            grid.appendChild(ramElement);    
        }
        return true;
    }

    reset(){
        for (let i = 0; i < this.dec_array.length; i++) {
            this.dec_array[i] = 255;
            if(i<112){
                document.getElementById('ramElement' + String(i)).textContent = 'FF';
            }
            if(i>8192-113){
                document.getElementById('ramElement' + String(i)).textContent ='FF';
            }
                
            
        }
    }

    getValue(address_dec) {
        if(address_dec > 8191){
            let x = Math.floor(address_dec/8192);
            address_dec = address_dec - x*8192;
        }
        return this.dec_array[address_dec];
    }
    
    getHexValue(address_dec) {
        return convertNumberToHex_2digits(this.dec_array[address_dec]);
    }

    update(address_dec, number_dec){
        if(address_dec > 8191){
            let x = Math.floor(address_dec/8192);
            address_dec = address_dec - x*8192;
        }
        this.dec_array[address_dec] = number_dec;
        if(address_dec < 112 || address_dec > 8191-112){
            document.getElementById('ramElement' + String(address_dec)).textContent = convertNumberToHex_2digits(number_dec);
        }
    }

    getRamElementId = (position_dec = 0) =>{
        if(position_dec > 8191){
            let x = Math.floor(position_dec/8192);
            position_dec = position_dec - x*8192;
        }
        if(position_dec > 111 && position_dec < 8191-111){
            const ramElementBetween = document.getElementById('ramElementBetween');
            ramElementBetween.style.top = String(100/32*16) +'%';
            ramElementBetween.style.left = String(100/46*40) + '%';
            return ramElementBetween.id;
        }
        else
            return document.getElementById('ramElement' + String(position_dec)).id;
    }

}

/******************************* RedRectangle *********************************** */
class RedRectangle {

}

/******************************* Register *********************************** */

class Register_x2 {
	constructor(register_DOM){
		this.DOM = register_DOM;
		this.dec = 0;
	}
	
	update(value_dec){
        if(value_dec > 255)
            value_dec -= 256;
        if(value_dec < 0)
            value_dec = 255;
		this.dec = value_dec;
		this.DOM.textContent = convertNumberToHex_2digits(value_dec);		
	}
	
}

class Register_x4 {
	constructor(register_DOM){
		this.dec = 0;
        this.DOM = register_DOM;
		this.hi_dec = 0;
		this.lo_dec = 0;
	}
	
	update(value_dec){
        if(value_dec > 65535)
            value_dec -= 65536;
        if(value_dec < 0)
            value_dec = 65535;
        this.dec = value_dec;
        this.DOM.textContent = convertNumberToHex_4digits(value_dec);
        this.hi_dec = convertHexToNumber(this.DOM.textContent[0] + this.DOM.textContent[1]);
        this.lo_dec = convertHexToNumber(this.DOM.textContent[2] + this.DOM.textContent[3]);
	}	
	
	update_lo(decimal_number){
		let buf_string = this.DOM.textContent;
		this.lo_dec = decimal_number;
        this.DOM.textContent = buf_string[0] + buf_string[1] + convertNumberToHex_2digits(decimal_number);
        this.dec = convertHexToNumber(this.DOM.textContent);
	}
	
	update_hi(decimal_number){
		let buf_string = this.DOM.textContent;
		this.hi_dec = decimal_number;
        this.DOM.textContent = convertNumberToHex_2digits(decimal_number) + buf_string[2] + buf_string[3];
        this.dec = convertHexToNumber(this.DOM.textContent);
	}
}

class IO extends Register_x2{
    constructor(register_DOM, address_dec, io1IN_boolean){
		super(register_DOM);
        this.address_dec = address_dec;
        this.ioMapped_boolean = true;
        this.in_boolean = io1IN_boolean;
    }
    
    updateAddress(address_dec, ioMapped_boolean){
        this.address = address_dec;
        this.ioMapped_boolean = ioMapped_boolean;
    }
}

class Decoder {
    constructor(wr_DOM, rd_DOM, m_DOM, io_DOM, decDisplay_DOM){
        this.wr_DOM = wr_DOM;
        this.rd_DOM = rd_DOM;
        this.m_DOM = m_DOM;
        this.io_DOM = io_DOM;
        this.WR = 1;
        this.RD = 1;
        this.M = 1;
        this.IO = 1;
        this.display_DOM = decDisplay_DOM;
        this.text_string = '';
        this.error = false;
        this.ramAccess = false;
        this.ioAccess = false;
    }
	
	update(wr_dec, rd_dec, m_dec, io_dec, address_dec){
        this.WR = wr_dec;
        this.RD = rd_dec;
        this.M = m_dec;
        this.IO = io_dec;

        //read from memory
        if(rd_dec === 0 && m_dec === 0){
            this.ioAccess = false;
            if(address_dec < 8192){
                this.text_string = 'Lese von ROM';
                this.ramAccess = false;
            }   
            else if (address_dec >= RAM.startAddressRam_dec && address_dec < RAM.startAddressRam_dec+RAM.size_dec){
                this.ramAccess = true;
                this.text_string = 'Lese von RAM';
            }    
            else{
                this.ramAccess = false;
                this.text_string = 'Lese von ??? Adresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            }
                
        }
        //write to memory
        else if (wr_dec === 0 && m_dec === 0){
            this.ioAccess = false;
            if(address_dec < 8192){
                this.ramAccess = false;
                this.text_string = 'Schreibe auf ROM';
                this.error = true;
            } 
            else if (address_dec >= RAM.startAddressRam_dec && address_dec < RAM.startAddressRam_dec+RAM.size_dec){
                this.ramAccess = true;
                this.text_string = 'Schreibe auf RAM';
            } 
            else{
                this.ramAccess = false;
                this.text_string = 'Schreibe auf ??? Adresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            } 
        }
        //read IO
        else if(rd_dec === 0 && io_dec === 0){
            this.ioAccess = true;
            if(address_dec === IO1.address_dec){
                if(IO1.in_boolean){
                    this.text_string = 'Lese von IN1';
                }
                else{
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            }
            else if (address_dec === IO2.address_dec){
                if(IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else{
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            }
            else if (address_dec === IO3.address_dec){
                if(IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else{
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            }
            else{
                this.text_string = 'Lese von ??? Adresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            }
        }
        //write IO
        else if(wr_dec === 0 && io_dec === 0){
            this.ioAccess = true;
            if(address_dec === IO1.address_dec){
                if(!IO1.in_boolean){
                    this.text_string = 'Schreibe auf OUT1';
                }
                else{
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }                
            }
            else if (address_dec === IO2.address_dec){
                if(!IO2.in_boolean){
                    this.text_string = 'Schreibe auf OUT2';
                }
                else{
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }   
            }
            else if (address_dec === IO3.address_dec){
                if(!IO3.in_boolean){
                    this.text_string = 'Schreibe auf OUT3';
                }
                else{
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }   
            }
            else{
                this.text_string = 'Schreibe auf ??? Adresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            }
        }
    }
    
    updateDOM(){
        this.wr_DOM.textContent = this.WR;
        this.rd_DOM.textContent = this.RD;
        this.m_DOM.textContent = this.M;
        this.io_DOM.textContent = this.IO;
        this.display_DOM.textContent = this.text_string;
        if(this.ramAccess || this.ioAccess)
            this.display_DOM.classList.add('yellowBg');
        if(this.error){
            this.display_DOM.classList.add('redBg');
            throw Error('Decoder error');
        }
    }

    resetDOM() {
        this.wr_DOM.textContent = '';
        this.rd_DOM.textContent = '';
        this.m_DOM.textContent = '';
        this.io_DOM.textContent = '';
        this.display_DOM.textContent = '';
        try{
            this.display_DOM.classList.remove('yellowBg');
        }catch{}
        try{
            this.display_DOM.classList.remove('redBg');
        }catch{}
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
        this.dec = 0;
        this.DOM = flags_DOM;
    }
    update(value_dec){
        let bin_array = convertNumberToBinaryArray(value_dec);
        this.c_dec = bin_array[7];
        this.z_dec = bin_array[5];
        this.p_dec = bin_array[1];
        this.s_dec = bin_array[0];
        this.updateDOM()

    }
    updateDec(cFlag_dec, zFlag_dec, pFlag_dec, sFlag_dec){
        let buf = c
        this.c_dec = cFlag_dec;
		this.z_dec = zFlag_dec;
		this.p_dec = pFlag_dec;
        this.s_dec = sFlag_dec;
    }
	
	updateDOM(){
        if(this.c_dec === '-')
            this.c_dec = 0;
        if(this.z_dec === '-')
            this.z_dec = 0;
        if(this.p_dec === '-')
            this.p_dec = 0;
        if(this.s_dec === '-')
            this.s_dec = 0;
        this.dec = convertBinaryToNumber([this.s_dec, this.p_dec, 0,0,0,this.z_dec,0,this.c_dec].join(''));
		this.c_DOM.textContent = this.c_dec.toString();
		this.z_DOM.textContent = this.z_dec.toString();
		this.p_DOM.textContent = this.p_dec.toString();
		this.s_DOM.textContent = this.s_dec.toString();
	}	
}

/******************************* mc8_command ********************************* */

class mc8_command {
    constructor(assembler_notation_string, machineCommand_dec, bytes, flags_array, animationFunction){
        this.assembler_notation_string = assembler_notation_string;
        this.machineCommand_dec = machineCommand_dec;
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
let ANIMATION_SPEED = 3;
const playStatus = new PlayStatus();
let IDLETIME = 400;
let NOANIMATIONIDLETIME = 30;
const FRAMES = 60;


//class variables
const IO1 = new IO(document.getElementById('IO1'), 0, true);
const IO2 = new IO(document.getElementById('IO2'), 1, false);
const IO3 = new IO(document.getElementById('IO3'), 2, true);
const A   = new Register_x2(document.getElementById('A'));
const B   = new Register_x2(document.getElementById('B'));
const C   = new Register_x2(document.getElementById('C'));
const IR  = new Register_x2(document.getElementById('IR'));
const ALU1 = new Register_x2(document.getElementById('ALU1'));
const ALU2 = new Register_x2(document.getElementById('ALU2'));
const ALUOUT = new Register_x2(document.getElementById('ALUOUT'));
const HL  = new Register_x4(document.getElementById('HL'));
const IX  = new Register_x4(document.getElementById('IX'));
const SP  = new Register_x4(document.getElementById('SP'));
const PC  = new Register_x4(document.getElementById('PC'));
const ZR  = new Register_x4(document.getElementById('ZR'));
const FLAGS = new Flags(document.getElementById('C_Flag'),document.getElementById('Z_Flag'),document.getElementById('P_Flag'),document.getElementById('S_Flag'));
const ROM = new Rom();
const RAM = new Ram();
const DECODER = new Decoder(document.getElementById('WR'),document.getElementById('RD'), document.getElementById('M'), document.getElementById('IO'),document.getElementById('decDisplay'));


/***************************************** Hover popups *********************************/
const rom_h1 = document.getElementById('rom_h1');
rom_h1.addEventListener('mouseover', function() {
    document.getElementById('rom_hover').classList.toggle('toggleGrid');
});
rom_h1.addEventListener('mouseleave', function() {
    document.getElementById('rom_hover').classList.toggle('toggleGrid'); 
});

const ram_h1 = document.getElementById('ram_h1');
ram_h1.addEventListener('mouseover', function() {
    document.getElementById('ramStartAddress_hex').textContent = convertNumberToHex_4digits(RAM.startAddressRam_dec) + 'h';
    document.getElementById('ramStartAddress_dec').textContent = String(RAM.startAddressRam_dec);
    document.getElementById('ramEndAddress_hex').textContent = convertNumberToHex_4digits(RAM.startAddressRam_dec+8192-1) + 'h';
    document.getElementById('ramEndAddress_dec').textContent = String(RAM.startAddressRam_dec+8192-1);
    document.getElementById('ram_hover').classList.toggle('toggleGrid');
});
ram_h1.addEventListener('mouseleave', function() {
    document.getElementById('ram_hover').classList.toggle('toggleGrid'); 
});

const io1_h1 = document.getElementById('io1_h1');
io1_h1.addEventListener('mouseover', function() {
    document.getElementById('io1Map').textContent = document.querySelector('input[name="radioMap"]:checked').value;
    document.getElementById('io1Address_hex').textContent = io1Address.value + 'h';
    document.getElementById('io1_dec').textContent = IO1.dec + ' (' + convertNumberToComplementOnTwo(IO1.dec) + ')';
    document.getElementById('io1_bin').textContent = convertNumberToBinary_8digits(IO1.dec);
    document.getElementById('io1_hover').classList.toggle('toggleGrid');
});
io1_h1.addEventListener('mouseleave', function() {
    document.getElementById('io1_hover').classList.toggle('toggleGrid'); 
});

const io2_h1 = document.getElementById('io2_h1');
io2_h1.addEventListener('mouseover', function() {
    document.getElementById('io2Map').textContent = document.querySelector('input[name="radioMap"]:checked').value;
    document.getElementById('io2Address_hex').textContent =  document.getElementById('io2Address').value + 'h';
    document.getElementById('io2_dec').textContent = IO2.dec + ' (' + convertNumberToComplementOnTwo(IO2.dec) + ')';
    document.getElementById('io2_bin').textContent = convertNumberToBinary_8digits(IO2.dec);
    document.getElementById('io2_hover').classList.toggle('toggleGrid');
});
io2_h1.addEventListener('mouseleave', function() {
    document.getElementById('io2_hover').classList.toggle('toggleGrid'); 
});

const io3_h1 = document.getElementById('io3_h1');
io3_h1.addEventListener('mouseover', function() {
    document.getElementById('io3Map').textContent = document.querySelector('input[name="radioMap"]:checked').value;
    document.getElementById('io3Address_hex').textContent =  document.getElementById('io3Address').value + 'h';
    document.getElementById('io3_dec').textContent = IO3.dec + ' (' + convertNumberToComplementOnTwo(IO3.dec) + ')';
    document.getElementById('io3_bin').textContent = convertNumberToBinary_8digits(IO3.dec);
    document.getElementById('io3_hover').classList.toggle('toggleGrid');
});
io3_h1.addEventListener('mouseleave', function() {
    document.getElementById('io3_hover').classList.toggle('toggleGrid'); 
});

const a_h1 = document.getElementById('a');
a_h1.addEventListener('mouseover', function() {
    document.getElementById('a_dec').textContent = 'Dezimal: ' + A.dec + ' (' + convertNumberToComplementOnTwo(A.dec) + ')';
    document.getElementById('a_bin').textContent =  'Binär: ' + convertNumberToBinary_8digits(A.dec);
    document.getElementById('a_hover').classList.toggle('toggleGrid');
});
a_h1.addEventListener('mouseleave', function() {
    document.getElementById('a_hover').classList.toggle('toggleGrid');
});

const b_h1 = document.getElementById('b');
b_h1.addEventListener('mouseover', function() {
    document.getElementById('b_dec').textContent = 'Dezimal: ' + B.dec + ' (' + convertNumberToComplementOnTwo(B.dec) + ')';
    document.getElementById('b_bin').textContent =  'Binär: ' + convertNumberToBinary_8digits(B.dec);
    document.getElementById('b_hover').classList.toggle('toggleGrid');
});
b_h1.addEventListener('mouseleave', function() {
    document.getElementById('b_hover').classList.toggle('toggleGrid');
});

const c_h1 = document.getElementById('c');
c_h1.addEventListener('mouseover', function() {
    document.getElementById('c_dec').textContent = 'Dezimal: ' + C.dec + ' (' + convertNumberToComplementOnTwo(C.dec) + ')';
    document.getElementById('c_bin').textContent =  'Binär: ' + convertNumberToBinary_8digits(C.dec);
    document.getElementById('c_hover').classList.toggle('toggleGrid');
});
c_h1.addEventListener('mouseleave', function() {
    document.getElementById('c_hover').classList.toggle('toggleGrid');
});

const hl_h1 = document.getElementById('hl');
hl_h1.addEventListener('mouseover', function() {
    document.getElementById('hl_dec').textContent = 'Dezimal: ' + HL.dec;
    document.getElementById('hl_hover').classList.toggle('toggleGrid');
});
hl_h1.addEventListener('mouseleave', function() {
    document.getElementById('hl_hover').classList.toggle('toggleGrid');
});

const ix_h1 = document.getElementById('ix');
ix_h1.addEventListener('mouseover', function() {
    document.getElementById('ix_dec').textContent = 'Dezimal: ' + IX.dec;
    document.getElementById('ix_hover').classList.toggle('toggleGrid');
});
ix_h1.addEventListener('mouseleave', function() {
    document.getElementById('ix_hover').classList.toggle('toggleGrid');
});

const sp_h1 = document.getElementById('sp');
sp_h1.addEventListener('mouseover', function() {
    document.getElementById('sp_dec').textContent = 'Dezimal: ' + SP.dec;
    document.getElementById('sp_hover').classList.toggle('toggleGrid');
});
sp_h1.addEventListener('mouseleave', function() {
    document.getElementById('sp_hover').classList.toggle('toggleGrid');
});

const pc_h1 = document.getElementById('pc');
pc_h1.addEventListener('mouseover', function() {
    document.getElementById('pc_dec').textContent = 'Dezimal: ' + PC.dec;
    document.getElementById('pc_hover').classList.toggle('toggleGrid');
});
pc_h1.addEventListener('mouseleave', function() {
    document.getElementById('pc_hover').classList.toggle('toggleGrid');
});

const zr_h1 = document.getElementById('zr');
zr_h1.addEventListener('mouseover', function() {
    document.getElementById('zr_dec').textContent = 'Dezimal: ' + ZR.dec;
    document.getElementById('zr_hover').classList.toggle('toggleGrid');
});
zr_h1.addEventListener('mouseleave', function() {
    document.getElementById('zr_hover').classList.toggle('toggleGrid');
});

const ir_h1 = document.getElementById('ir');
ir_h1.addEventListener('mouseover', function() {
    document.getElementById('ir_bin').textContent =  'Binär: ' + convertNumberToBinary_8digits(IR.dec);
    document.getElementById('ir_hover').classList.toggle('toggleGrid');
});
ir_h1.addEventListener('mouseleave', function() {
    document.getElementById('ir_hover').classList.toggle('toggleGrid');
});

const dec_h1 = document.getElementById('dec');
dec_h1.addEventListener('mouseover', function() {
    document.getElementById('dec_hover').classList.toggle('toggleGrid');
});
dec_h1.addEventListener('mouseleave', function() {
    document.getElementById('dec_hover').classList.toggle('toggleGrid');
});

const c_flag = document.getElementById('c_flag');
c_flag.addEventListener('mouseover', function() {
    document.getElementById('cFlag_hover').classList.toggle('toggleGrid');
});
c_flag.addEventListener('mouseleave', function() {
    document.getElementById('cFlag_hover').classList.toggle('toggleGrid');
});

const z_flag = document.getElementById('z_flag');
z_flag.addEventListener('mouseover', function() {
    document.getElementById('zFlag_hover').classList.toggle('toggleGrid');
});
z_flag.addEventListener('mouseleave', function() {
    document.getElementById('zFlag_hover').classList.toggle('toggleGrid');
});

const p_flag = document.getElementById('p_flag');
p_flag.addEventListener('mouseover', function() {
    document.getElementById('pFlag_hover').classList.toggle('toggleGrid');
});
p_flag.addEventListener('mouseleave', function() {
    document.getElementById('pFlag_hover').classList.toggle('toggleGrid');
});

const s_flag = document.getElementById('s_flag');
s_flag.addEventListener('mouseover', function() {
    document.getElementById('sFlag_hover').classList.toggle('toggleGrid');
});
s_flag.addEventListener('mouseleave', function() {
    document.getElementById('sFlag_hover').classList.toggle('toggleGrid');
});

const wr_h3 = document.getElementById('wr');
wr_h3.addEventListener('mouseover', function() {
    document.getElementById('wr_hover').classList.toggle('toggleGrid');
});
wr_h3.addEventListener('mouseleave', function() {
    document.getElementById('wr_hover').classList.toggle('toggleGrid');
});

const rd_h3 = document.getElementById('rd');
rd_h3.addEventListener('mouseover', function() {
    document.getElementById('rd_hover').classList.toggle('toggleGrid');
});
rd_h3.addEventListener('mouseleave', function() {
    document.getElementById('rd_hover').classList.toggle('toggleGrid');
});

const m_h3 = document.getElementById('m');
m_h3.addEventListener('mouseover', function() {
    document.getElementById('m_hover').classList.toggle('toggleGrid');
});
m_h3.addEventListener('mouseleave', function() {
    document.getElementById('m_hover').classList.toggle('toggleGrid');
});

const io_h3 = document.getElementById('io');
io_h3.addEventListener('mouseover', function() {
    document.getElementById('io_hover').classList.toggle('toggleGrid');
});
io_h3.addEventListener('mouseleave', function() {
    document.getElementById('io_hover').classList.toggle('toggleGrid');
});

const play_button = document.getElementById('play');
play_button.addEventListener('mouseover', function() {
    document.getElementById('play_hover').classList.toggle('toggleGrid');
});
play_button.addEventListener('mouseleave', function() {
    document.getElementById('play_hover').classList.toggle('toggleGrid');
});

const pause_button = document.getElementById('pause');
pause_button.addEventListener('mouseover', function() {
    document.getElementById('pause_hover').classList.toggle('toggleGrid');
});
pause_button.addEventListener('mouseleave', function() {
    document.getElementById('pause_hover').classList.toggle('toggleGrid');
});

const stop_button = document.getElementById('stop');
stop_button.addEventListener('mouseover', function() {
    document.getElementById('stop_hover').classList.toggle('toggleGrid');
});
stop_button.addEventListener('mouseleave', function() {
    document.getElementById('stop_hover').classList.toggle('toggleGrid');
});

const slow_button = document.getElementById('slow');
slow_button.addEventListener('mouseover', function() {
    document.getElementById('slow_hover').classList.toggle('toggleGrid');
});
slow_button.addEventListener('mouseleave', function() {
    document.getElementById('slow_hover').classList.toggle('toggleGrid');
});

const fast_button = document.getElementById('fast');
fast_button.addEventListener('mouseover', function() {
    document.getElementById('fast_hover').classList.toggle('toggleGrid');
});
fast_button.addEventListener('mouseleave', function() {
    document.getElementById('fast_hover').classList.toggle('toggleGrid');
});

const decrease_button = document.getElementById('decrease');
decrease_button.addEventListener('mouseover', function() {
    document.getElementById('decrease_hover').classList.toggle('toggleGrid');
});
decrease_button.addEventListener('mouseleave', function() {
    document.getElementById('decrease_hover').classList.toggle('toggleGrid');
});

const increase_button = document.getElementById('increase');
increase_button.addEventListener('mouseover', function() {
    document.getElementById('increase_hover').classList.toggle('toggleGrid');
});
increase_button.addEventListener('mouseleave', function() {
    document.getElementById('increase_hover').classList.toggle('toggleGrid');
});

const oneCommand_button = document.getElementById('oneCommand');
oneCommand_button.addEventListener('mouseover', function() {
    document.getElementById('oneCommand_hover').classList.toggle('toggleGrid');
});
oneCommand_button.addEventListener('mouseleave', function() {
    document.getElementById('oneCommand_hover').classList.toggle('toggleGrid');
});

const singleStep_button = document.getElementById('singleStep');
singleStep_button.addEventListener('mouseover', function() {
    document.getElementById('singleStep_hover').classList.toggle('toggleGrid');
});
singleStep_button.addEventListener('mouseleave', function() {
    document.getElementById('singleStep_hover').classList.toggle('toggleGrid');
});

const fullCommand_button = document.getElementById('fullCommand');
fullCommand_button.addEventListener('mouseover', function() {
    document.getElementById('fullCommand_hover').classList.toggle('toggleGrid');
});
fullCommand_button.addEventListener('mouseleave', function() {
    document.getElementById('fullCommand_hover').classList.toggle('toggleGrid');
});

const settings_button = document.getElementById('settingsButton');
settings_button.addEventListener('mouseover', function() {
    document.getElementById('settingsButton_hover').classList.toggle('toggleGrid');
});
settings_button.addEventListener('mouseleave', function() {
    document.getElementById('settingsButton_hover').classList.toggle('toggleGrid');
});

const fullscreen_button = document.getElementById('fullscreenButton');
fullscreen_button.addEventListener('mouseover', function() {
    document.getElementById('fullscreenButton_hover').classList.toggle('toggleGrid');
});
fullscreen_button.addEventListener('mouseleave', function() {
    document.getElementById('fullscreenButton_hover').classList.toggle('toggleGrid');
});

const toggleTheme_button = document.getElementById('toggleTheme');
toggleTheme_button.addEventListener('mouseover', function() {
    document.getElementById('toggleTheme_hover').classList.toggle('toggleGrid');
});
toggleTheme_button.addEventListener('mouseleave', function() {
    document.getElementById('toggleTheme_hover').classList.toggle('toggleGrid');
});



/***************************************** settings functions *********************************/
const programSelect = document.getElementById('commandSelect');
const linkerFile = document.getElementById('linkerFile');
const ioMapped = document.getElementById('radioIoMapped');
const memoryMapped = document.getElementById('radioMemoryMap');
const io1In = document.getElementById('IO1In');
const io1Out = document.getElementById('IO1Out');
const io1Address = document.getElementById('io1Address');
const io2In = document.getElementById('IO2In');
const io2Out = document.getElementById('IO2Out');
const io2Address = document.getElementById('io2Address');
const io3In = document.getElementById('IO3In');
const io3Out = document.getElementById('IO3Out');
const io3Address = document.getElementById('io3Address');
const io1_arrow = document.getElementById('io1_arrow');
const io2_arrow = document.getElementById('io2_arrow');
const io3_arrow = document.getElementById('io3_arrow');

const ramAddress = document.getElementById('addressRAM');


const changeRamAddress_DOM = (hex1_string, hex2_string) => {
    const pEle = document.getElementsByClassName('RamAddressLabel');
    const str = ['0','1', '2','3','4','5','6','9','A','B','C','D','E','F'];
    RAM.startAddressRam_dec = convertHexToNumber(hex1_string + '00');
    for (let i = 0; i < pEle.length; i++) {
        if(i<7){
            pEle[i].textContent = hex1_string + str[i] + 'x';
        }else{
            pEle[i].textContent = hex2_string + str[i] + 'x';
        }
    }
}

const changeRamAddress = () => {
    switch (ramAddress.value) {
        case '2000':
            changeRamAddress_DOM('20', '3F');
            break;
        case '4000':
            changeRamAddress_DOM('40', '5F');
            break;
        case '6000':
            changeRamAddress_DOM('60', '7F');
            break;
        case '8000':
            changeRamAddress_DOM('80', '9F');
            break;
        case 'A000':
            changeRamAddress_DOM('A0', 'BF');  
            break;
        case 'C000':
            changeRamAddress_DOM('C0', 'DF');
            break;
        case 'E000':
            changeRamAddress_DOM('E0', 'FF');
            break;
        default:
            break;
    }
}

const setSettingsDependingOnProgram = (ioMapped_boolean, io1IN_boolean, io2IN_boolean, io3IN_boolean, io1Address_hex, io2Address_hex, io3Address_hex, ramStartingAddress_hex) => {
    if(ioMapped_boolean){
        ioMapped.checked = true;
    }
    else{
        memoryMapped.checked = true;
    }

    if(io1IN_boolean){
        io1In.checked = true;
        io1_arrow.classList.remove('ioArrowOUT');
    } else {
        io1Out.checked = true;
        io1_arrow.classList.add('ioArrowOUT');
    }
    if(io2IN_boolean){
        io2In.checked = true;
        io2_arrow.classList.remove('ioArrowOUT');
    } else {
        io2Out.checked = true;
        io2_arrow.classList.add('ioArrowOUT');
    }
    if(io3IN_boolean){
        io3In.checked = true;
        io3_arrow.classList.remove('ioArrowOUT');
    } else {
        io3Out.checked = true;
        io3_arrow.classList.add('ioArrowOUT');
    }

    io1Address.value = io1Address_hex;
    io2Address.value = io2Address_hex;
    io3Address.value = io3Address_hex;
    ramAddress.value = ramStartingAddress_hex;
    changeRamAddress();
}

const updateProgram = () => {
    switch(programSelect.value){
        case 'own':
            linkerFile.value = 'Fügen Sie hier den Inhalt der vom Linker erzeugten .OBJ-Datei ein.\n(im Intel-HEX-Format)';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp1':
            linkerFile.value = ':0100000000ff\n:0100010000fe\n:0100020000fd\n:0100030000fc\n:0100040000fb\n:0100050000fa\n:0100060000f9\n:0100070000f8\n:0100080000f7\n:0100090000f6\n:01000a0000d5\n:01000b0000d4\n:01000c0000d3\n:01000d0000d2\n:01000e0000d1\n:01000f0000d0\n:0100100000ef\n:0100110000ee\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp2':
            linkerFile.value = ':010000003Cc3\n:010001003Cc2\n:010002003Cc1\n:0100030004f8\n:0100040004f7\n:010005000Cee\n:0100060023d6\n:010007008771\n:010008008770\n:010009008076\n:01000a008055\n:01000b008153\n:01000c008152\n:01000d003D95\n:01000e003D94\n:01000f0005cb\n:010010000De2\n:01001100905e\n:01001200905d\n:01001300915b\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp3':
            linkerFile.value = ':020000003E11af\n:020002000622d4\n:020004000E33b9\n:030006002155443d\n:01000900787e\n:01000a004194\n:01000b004F85\n:02000c003E662e\n:01000e00478a\n:02000f003E771a\n:010011004F9f\n:020012003E8826\n:010014007675\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp4':
            linkerFile.value = ':04000000DD212211cb\n:02000400DD23fa\n:02000600DD23f8\n:02000800DD2Bee\n:03000a002144333b\n:01000d0023af\n:01000e0023ae\n:03000f003103009a\n:010012007677\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp5':
            linkerFile.value = ':020000003E11af\n:030002003200E0e9\n:0300050021332282\n:030008002201E0f2\n:04000b00DD2155443a\n:04000f00DD2203E0eb\n:010013003Cb0\n:0100140023c8\n:02001500DD23e9\n:0100170047a1\n:030018003A00E0cb\n:03001b002A03E0b5\n:04001e00DD2A01E0d6\n:01e00000001f\n:01e00100001e\n:01e00200001d\n:01e00300001c\n:01e00400001b\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp6':
            linkerFile.value = ':020000003E12ae\n:030002002150E0aa\n:0100050047b3\n:03000600324FE096\n:01000900876f\n:01000a004F86\n:03000b003250E070\n:01000e00874a\n:01000f007759\n:030010003A4FE084\n:0100130047a5\n:030014003A50E07f\n:010017004F99\n:010018007E69\n:010019007670\n:01e04f0000b0\n:01e0500000cf\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp7':
            linkerFile.value = ':0300000031FFFFce\n:020003003EEEcf\n:020005000622d1\n:020007000E8861\n:010009008076\n:01000a00F5e0\n:01000b009143\n:01000c00478c\n:01000d00F1e1\n:01000e008051\n:01000f00F5db\n:01001000915e\n:0100110047a7\n:01001200F1fc\n:010013007676\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp8':
            linkerFile.value = ':020000003E0Cb4\n:0100020047b6\n:020003003EC0fd\n:010005004Fab\n:01000600A059\n:030007003200E0e4\n:01000a00795c\n:01000b00B024\n:03000c003201E0be\n:02000f003E177a\n:0100110047a7\n:020012003E713d\n:01001400A843\n:0100150047a3\n:02001600CB27f6\n:02001800CB27f4\n:02001a00CB27d2\n:01001c00784b\n:01001d0007bb\n:01001e0007ba\n:01001f0007b9\n:010020007867\n:0100210017c7\n:0100220017c6\n:0100230017c5\n:010024007665\n:01e00000001f\n:01e00100001e\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp9':
            linkerFile.value = ':020000003E20a0\n:020002000610e6\n:020004000E30bc\n:01000600BF3a\n:03000700CA0B0021\n:01000a003C99\n:01000b00B81c\n:03000c00F21000cf\n:01000f003C94\n:01001000B936\n:03001100FA1500dd\n:010014003Caf\n:010015008169\n:010016008762\n:03001700DA2300e9\n:01001a00873e\n:03001b00DA2300c5\n:01001e00873a\n:03001f00DA2300c1\n:010022008756\n:03002300C3000017\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp10':
            linkerFile.value = ':0300000031FFFFce\n:0300030021700069\n:010006007E7b\n:02000700D30321\n:0100090047af\n:01000a0023b2\n:02000b00DB01f7\n:01000d004F83\n:01000e00B819\n:03000f00C2060006\n:010012007677\n:01007000008f\n:01007100107e\n:01007200206d\n:01007300305c\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,false,'0001','0003','0005','E000');
            break;
        case 'bsp11':
            linkerFile.value = ':0300000031FFFFce\n:030003003A00A020\n:0100060047b2\n:03000700CD4000e9\n:03000a003A00A0f9\n:01000d00B81a\n:03000e00CA030002\n:020040003E037d\n:010042003D80\n:03004300C24200b6\n:01004600C9f0\n:01a00000005f\n:01a00100005e\n:00000001FF';
            setSettingsDependingOnProgram(false,true,false,true,'A000','A001','A002','E000');
            break;
        case 'bsp12':
            linkerFile.value = ':0300000031FFFFce\n:020003000E7776\n:02000500DB011d\n:01000700B93f\n:03000800CA1A0011\n:03000b00D21400ec\n:03000e00CD3200d0\n:03001100C3170012\n:03001400CD3B00e1\n:03001700C305001e\n:03001a00CD4400b2\n:03001d00C31700e6\n:020032003E008e\n:02003400D303f4\n:020036003E99f1\n:02003800D305ee\n:01003a00C9dc\n:02003b003E0065\n:02003d00D305c9\n:02003f003E99c8\n:02004100D303e7\n:01004300C9f3\n:020044003E007c\n:02004600D305e0\n:020048003E0078\n:02004a00D303be\n:01004c00C9ca\n:00000001FF';
            setSettingsDependingOnProgram(true,true,false,false,'0001','0003','0005','E000');
            break;
        case 'bsp13':
            linkerFile.value = ':0300000031FF3F8e\n:02000300DB0020\n:0100050047b3\n:02000600DB011c\n:03000800CD100018\n:02000b00D302fe\n:03000d00C303000a\n:020010000E04dc\n:02001200CB27fa\n:010014000Dde\n:03001500C2120014\n:020018000E04d4\n:02001a00CB27d2\n:03001c00D22000cf\n:01001f008040\n:010020000Dd2\n:03002100C21A0000\n:01002400C912\n:00000001FF';
            setSettingsDependingOnProgram(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp14':
            linkerFile.value = ':0300000031FF3F8e\n:02000300DB0020\n:020005000600f3\n:03000700CD0E001b\n:01000a00785d\n:02000b00D302fe\n:01000d00765c\n:01000e00F5dc\n:01000f003D93\n:03001000CA16000d\n:03001300CD0E000f\n:01001600F1f8\n:010017008068\n:0100180047a0\n:01001900C91d\n:00000001FF';
            setSettingsDependingOnProgram(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp15':
            linkerFile.value = ':02000000DB0023\n:0300020032D007f2\n:02000500DB011d\n:0300070032D107ec\n:03000a00CDD60729\n:03000d003AD307bc\n:02001000D30219\n:03001200C3000028\n:0107d0000028\n:0107d1000027\n:0107d2000026\n:0107d3000025\n:0107d4000024\n:0107d5000023\n:0307d6003AD0070f\n:0107d90047d8\n:0307da003AD107ea\n:0107dd00807b\n:0307de0032D307ec\n:0107e100C94e\n:00000001FF';
            setSettingsDependingOnProgram(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp16':
            linkerFile.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007003A1600a6\n:01000a00478e\n:03000b002117009a\n:01000e007E53\n:02000f00D302fa\n:0100110023cb\n:0100120005e8\n:03001300C20E001a\n:0100160004e5\n:0100170007e1\n:010018000Dda\n:010019000Fd7\n:01001a00764f\n:00000001FF';
            setSettingsDependingOnProgram(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp17':
            linkerFile.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007002A1A00b2\n:01000a007E57\n:01000b00478d\n:03000c002A1B008c\n:01000f007E52\n:02001000D30219\n:0100120023ca\n:0100130005e7\n:03001400C20F0018\n:03001700C3000023\n:01001a0009bc\n:01001b0001c3\n:01001c0003c0\n:01001d0005bd\n:01001e0007ba\n:01001f000Bb5\n:010020000Dd2\n:0100210011cd\n:0100220013ca\n:0100230017c5\n:00000001FF';
            setSettingsDependingOnProgram(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp18':
            linkerFile.value = ':0300000031FF3F8e\n:020003000E02eb\n:02000500DB001e\n:03000700320020a4\n:01000a00795c\n:03000b00CD5000b5\n:02000e00DB00f5\n:030010003201209a\n:03001300CD4400d9\n:030016003A02208b\n:02001900FE00e7\n:03001b00CA31007\n:02001e003EABd7\n:02002000D30209\n:010022007964\n:03002300CD5000bd\n:020026003E0199\n:02002800D30201\n:01002a00793c\n:03002b00CD500095\n:03002e00C30500e7\n:020031003E7619\n:02003300D302f6\n:010035007951\n:03003600CD5000aa\n:020039003E2364\n:02003b00D302ce\n:01003d007929\n:03003e00CD500082\n:03004100C30500f4\n:030044003A00205f\n:010047004F69\n:030048003A01205a\n:01004b009103\n:03004c003202203d\n:01004f00C9c7\n:020050000605a3\n:0100520005a8\n:03005300C2520096\n:010056003D6c\n:03005700C2500094\n:01005a00C9bc\n:0120000000df\n:0120010000de\n:0120020000dd\n:0120030000dc\n:0120040000db\n:00000001FF';
            setSettingsDependingOnProgram(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp19':
            linkerFile.value = ':020000003E00c0\n:020002000600f6\n:03000400211500c3\n:020007000E0Ddc\n:010009007E78\n:01000a008055\n:01000b00478d\n:01000c0023b0\n:01000d000Dc5\n:03000e00C2090004\n:010011007876\n:02001200D30019\n:010014007675\n:0100150001e9\n:0100160002e7\n:0100170001e7\n:0100180002e5\n:0100190001e5\n:01001a0001c4\n:01001b0001c3\n:01001c0001c2\n:01001d0002c0\n:01001e0002bf\n:01001f0001bf\n:0100200002dd\n:0100210001dd\n:00000001FF';
            setSettingsDependingOnProgram(true,false,false,true,'0000','0001','0002','2000');
            break;
        default:
            linkerFile.value = '';
            break;
    }
}

//update of the classes 
const updateIoClasses = () => {
    //IO-map
    if(ioMapped.checked){
        IO1.ioMapped_boolean, IO2.ioMapped_boolean, IO3.ioMapped_boolean = true;
    }
    else {
        IO1.ioMapped_boolean, IO2.ioMapped_boolean, IO3.ioMapped_boolean = false;
    }

    //IO address and in-/output
    if(io1In.checked){
        IO1.in_boolean = true;
        try{
            io1_arrow.classList.remove('ioArrowOUT');
        }catch{}
    }
    else {
        IO1.in_boolean = false;
        io1_arrow.classList.add('ioArrowOUT');
    }

    if(io2In.checked){
        IO2.in_boolean = true;
        try{
            io2_arrow.classList.remove('ioArrowOUT');
        }catch{}
    }
    else {
        IO2.in_boolean = false;
        io2_arrow.classList.add('ioArrowOUT');
    }

    if(io3In.checked){
        IO3.in_boolean = true;
        try{
            io3_arrow.classList.remove('ioArrowOUT');
        }catch{}
    }
    else {
        IO3.in_boolean = false;
        io3_arrow.classList.add('ioArrowOUT');
    }
    IO1.address_dec = convertHexToNumber(io1Address.value);
    IO2.address_dec = convertHexToNumber(io2Address.value);
    IO3.address_dec = convertHexToNumber(io3Address.value);
}

const saveSettings = () => {
    if (checkSettings()) {
        updateIoClasses();
        stopBtn(); //init
        ROM.update();
        RAM.reset();
        updateRedRectangle(0);
        toggleSettings();
        errorWindow.classList.remove('toggleGrid');
    }
    
}


// *****************************EventListeners*****************************/

programSelect.addEventListener('input', updateProgram);

ioMapped.addEventListener('change', updateIoClasses);

ramAddress.addEventListener('input', changeRamAddress);

io1In.addEventListener('change', updateIoClasses);
io1Out.addEventListener('change', updateIoClasses);

io2In.addEventListener('change', updateIoClasses);
io2Out.addEventListener('change', updateIoClasses);

io3In.addEventListener('change', updateIoClasses);
io3Out.addEventListener('change', updateIoClasses);


// *****************************errorWindow*****************************
const errorWindow = document.getElementById('errorWindow');
const errorMessage = document.getElementById('errorMessage');
const checkSettings = () => {
    if((convertHexToNumber(io1Address.value) === convertHexToNumber(io2Address.value)) && (IO1In.checked === IO2In.checked)){
        errorMessage.textContent =  'IO1 und IO2 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.';
        errorWindow.classList.add('toggleGrid');
        return false;
    }else if((convertHexToNumber(io1Address.value) === convertHexToNumber(io3Address.value)) && (IO1In.checked === IO3In.checked)){
        errorMessage.textContent =  'IO1 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.';
        errorWindow.classList.add('toggleGrid');
        return false;
    }else if((convertHexToNumber(io2Address.value) === convertHexToNumber(io3Address.value)) && (IO2In.checked === IO3In.checked)){
        errorMessage.textContent =  'IO2 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.';
        errorWindow.classList.add('toggleGrid');
        return false;
    }
    if(document.getElementById('radioMemoryMap').checked){ //memory-mapped
        if(convertHexToNumber(io1Address.value) < convertHexToNumber('2000')){
            errorMessage.textContent =  `Die Adresse ${io1Address.value}h von IO1 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToNumber(io2Address.value) < convertHexToNumber('2000')){
            errorMessage.textContent =  `Die Adresse ${io2Address.value}h von IO2 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToNumber(io3Address.value) < convertHexToNumber('2000')){
            errorMessage.textContent =  `Die Adresse ${io3Address.value}h von IO3 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        }

        if(convertHexToNumber(io1Address.value) >= RAM.startAddressRam_dec && convertHexToNumber(io1Address.value) < (RAM.startAddressRam_dec+ 8192)){
            errorMessage.textContent =  `Die Adresse ${io1Address.value}h von IO1 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToNumber(io2Address.value) >= RAM.startAddressRam_dec && convertHexToNumber(io2Address.value) < (RAM.startAddressRam_dec+ 8192)){
            errorMessage.textContent =  `Die Adresse ${io2Address.value}h von IO2 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToNumber(io3Address.value) >= RAM.startAddressRam_dec && convertHexToNumber(io3Address.value) < (RAM.startAddressRam_dec+ 8192)){
            errorMessage.textContent =  `Die Adresse ${io3Address.value}h von IO3 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        }
    }
    return true;
};



/*********************************** bus system and path logic ************************************/
class Point{
    constructor(index,x,y,labelString, parent,childArray){
        this.index = index;
        this.x = x;
        this.y = y;
        this.label = labelString;
        this.parent = parent;
        this.children = childArray;
    }

    getParent(){
        return this.parent;
    }

    getSmallerChild(){
        if(this.children.length === 0)
            return;
        return this.children[0];
    }
    getGreaterChild(){
        if(this.children.length === 0)
            return;
        else
            return this.children[this.children.length -1];
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
    aluOut  = new Point(20,27,10,'ALUOUT',19,[]),
    point21 = new Point(21,34,14,'',18,[22]),
    ir      = new Point(22,32,14,'IR',21,[]),
    point23 = new Point(23,13,4,'',12,[24,25]),
    a	    = new Point(24,13,6,'A',23,[51]),
    point25 = new Point(25,10,4,'',23,[26]),
    point26 = new Point(26,10,15,'',25,[27]),
    point27 = new Point(27,14,15,'',26,[28,33]),
    ix      = new Point(28,14,14,'IX',27,[29]),
    hl      = new Point(29,14,12,'HL',28,[30]),
    point30 = new Point(30,14,10,'',29,[31,32]),
    b       = new Point(31,13,10,'B',30,[]),
    c       = new Point(32,15,10,'C',30,[]),
    sp      = new Point(33,14,16,'SP',27,[34]),
    pc      = new Point(34,14,18,'PC',33,[35]),
    zr      = new Point(35,14,20,'ZR',34,[36]),
    point36 = new Point(36,14,24,'DEC_UPDATE',35,[37,38]),
    rom2    = new Point(37,10,24,'ROM2',36,[]),
    point38 = new Point(38,28,24,'',36,[39,40]),
    dec     = new Point(39,28,26,'DEC',38,[]),
    ram2    = new Point(40,32,24,'RAM2',38,[]),
    hl_lo   = new Point(41,16,12,'HL_lo',29,[]),
    ix_lo   = new Point(42,16,14,'IX_lo',28,[]),
    sp_lo   = new Point(43,16,16,'SP_lo',33,[]),
    pc_lo   = new Point(44,16,18,'PC_lo',34,[]),
    zr_lo   = new Point(45,16,20,'ZR_lo',35,[]),
    hl_hi   = new Point(46,14,12,'HL_hi',29,[]),
    ix_hi   = new Point(47,14,14,'IX_hi',28,[]),
    sp_hi   = new Point(48,14,16,'SP_hi',33,[]),
    pc_hi   = new Point(49,14,18,'PC_hi',34,[]),
    zr_hi   = new Point(50,14,20,'ZR_hi',35,[]),
    flags   = new Point(51,15,6,'FLAGS',24,[]),
];

//returns the index/position of a fixPoint in the fixPoint-array
const getPointIndex = (pointID_string) => {
     for(let i=0; i<fixPoints.length;i++){
         if(fixPoints[i].label === pointID_string)
            return i;
     }
     return -1;
}

//returns the indices from Zero(ROM1) to the passed point index. 
const getIndexArrayZeroToPoint = (pointIndex_dec) => {
    let atoZero = [];

    while(true){
        if(pointIndex_dec === 0){
            atoZero.push(0);
            return atoZero.reverse();
        }else{
            atoZero.push(pointIndex_dec);
            pointIndex_dec = fixPoints[pointIndex_dec].getParent(); //Only parent indices are added to array
        }
    }
}

//merges zeroToA_array and zeroToB_array to AtoB_array
const getIndexArrayAtoB = (zeroToA_array, zeroToB_array) => {
    let smallerArray = (zeroToA_array < zeroToB_array ? zeroToA_array.length : zeroToB_array.length);
    let AtoB = [];
    let buffer = 0;

    //find smallest common index and save in buffer;
    for(let i=0; i<smallerArray; i++){
        if(zeroToA_array[i] === zeroToB_array[i]){
            buffer = zeroToA_array[i];
        }
    }
    
    //reverse indexArray zeroToA
    let aToZero_array = zeroToA_array.reverse();

    //add index to AtoB-array as long as the index is smaller than buffer
    for (let i = 0; i < aToZero_array.length; i++) {
        if(aToZero_array[i] > buffer)
            AtoB.push(aToZero_array[i]);        
    }

    //add index to AtoB-array when index is equal or greater to buffer
    for (let i = 0; i < zeroToB_array.length; i++) {
        if(zeroToB_array[i] >= buffer)
            AtoB.push(zeroToB_array[i]);        
    }

    return AtoB;
}

// rom- and ram-Elements are not fixPoints. Therefore they need to be handled separately.
// The following three functions return a point-array
const romElementToROM1 = (romElementID_string) => {
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

const ramElementToRAM1 = (ramElementID_string) => {
    let toRAM1 = [];
    let ramElement = document.getElementById(ramElementID_string);
    let rEx = ramElement.style.left.replace('%','');
    let rEy = ramElement.style.top.replace('%','');
    rEx = Math.round(Number(rEx) *46/100);
    rEy = Math.round(Number(rEy)*32/100);

    let romBetweenPoint = new Point(-1,rEx,2,'',0,[]);
    let romPoint = new Point(-1,rEx,rEy,'',0,[]);

    toRAM1.push(romPoint);
    toRAM1.push(romBetweenPoint);
    return toRAM1;
}

const RAM2ToRamElement = (ramElementID_string) => {    
    let toRamElement = [];
    const ramElement = document.getElementById(ramElementID_string);
    let rEx = ramElement.style.left.replace('%','');
    let rEy = ramElement.style.top.replace('%','');
    rEx = Math.round(Number(rEx) *46/100);
    rEy = Math.round(Number(rEy)*32/100);

    let ramBetweenPoint = new Point(-1,rEx,2,'',0,[]);
    let ramPoint = new Point(-1,rEx,rEy,'',0,[]);

    toRamElement.push(ramBetweenPoint);
    toRamElement.push(ramPoint);
    return toRamElement;
}

//returns the fixPoints to pass during the movement
const getPointsAtoB = (fixPointLabel_A_string, fixPointLabel_B_string) => {
    let pointsAtoB = [];

    //The bus-system does not include rom- or ram-Elements.
    if(fixPointLabel_A_string.includes('romElement')){
        pointsAtoB = getPointsAtoB('ROM1',fixPointLabel_B_string);
        pointsAtoB = romElementToROM1(fixPointLabel_A_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if(fixPointLabel_A_string.includes('ramElement')){
        pointsAtoB = getPointsAtoB('RAM1',fixPointLabel_B_string);
        pointsAtoB = ramElementToRAM1(fixPointLabel_A_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if(fixPointLabel_B_string.includes('ramElement')){
        pointsAtoB = getPointsAtoB(fixPointLabel_A_string,'RAM1');
        pointsAtoB = pointsAtoB.concat(RAM2ToRamElement(fixPointLabel_B_string));
        return pointsAtoB;
    }

    pointsAtoB = getIndexArrayAtoB(getIndexArrayZeroToPoint(getPointIndex(fixPointLabel_A_string)),
                                   getIndexArrayZeroToPoint(getPointIndex(fixPointLabel_B_string)));

    //convert Index-Array to Point-Array
    for (let i = 0; i < pointsAtoB.length; i++) {
        pointsAtoB[i] = fixPoints[pointsAtoB[i]];        
    }
    return pointsAtoB;
}



/*********************************** red rectangle ************************************/
const create_RedRectangle = () => {
    let redRectangle = document.getElementById('romElement0').cloneNode(true);
    redRectangle.classList.add("borderBox");
    redRectangle.id = "redRectangle";
    redRectangle.style.borderColor = "#FF1930";
    redRectangle.style.background = "#FCDEE1";
    redRectangle.style.color = "Black";
    grid.appendChild(redRectangle);
    return redRectangle;
}
const redRectangle = create_RedRectangle();

const updateRedRectangle = (PC_dec) =>{
    redRectangle.style.display = '';
    if(PC_dec < 224){
        //should always be on the position the PC is pointing at
        let xPos = PC_dec%8 +2;
        let yPos = Math.floor(PC_dec/8) + 2;
        redRectangle.textContent = convertNumberToHex_2digits(ROM.dec_array[PC_dec]);
        redRectangle.style.left = String(100/46*(xPos)) + "%";
        redRectangle.style.top = String(100/32*(yPos)) + "%";
        redRectangle.style.width = String(100/46*1) + "%";
        redRectangle.style.height = String(100/32*1) + "%";
    }
    else if(PC_dec < 8192) {
        redRectangle.textContent = convertNumberToHex_2digits(ROM.dec_array[PC_dec]);
        redRectangle.style.left = String(100/46*4) + "%";
        redRectangle.style.top = String(100/32*30) + "%";
        redRectangle.style.width = String(100/46*2) + "%";
        redRectangle.style.height = String(100/32*2) + "%";
    }
    else if(PC_dec >= RAM.startAddressRam_dec && PC_dec < RAM.startAddressRam_dec+112){
        PC_dec = PC_dec - Math.floor(PC_dec/8192)*8192;

        let xPos = PC_dec%8 +36;
        let yPos = Math.floor(PC_dec/8) + 2;
        redRectangle.textContent = convertNumberToHex_2digits(RAM.dec_array[PC_dec]);
        redRectangle.style.left = String(100/46*(xPos)) + "%";
        redRectangle.style.top = String(100/32*(yPos)) + "%";
        redRectangle.style.width = String(100/46*1) + "%";
        redRectangle.style.height = String(100/32*1) + "%";
    }
    else if(PC_dec >= RAM.startAddressRam_dec+112 && PC_dec < RAM.startAddressRam_dec+8080){
        PC_dec = PC_dec - Math.floor(PC_dec/8192)*8192;
        redRectangle.textContent = convertNumberToHex_2digits(RAM.dec_array[PC_dec]);

        redRectangle.style.left = String(100/46*40) + "%";
        redRectangle.style.top = String(100/32*16) + "%";
        redRectangle.style.width = String(100/46*2) + "%";
        redRectangle.style.height = String(100/32*2) + "%";
    }
    else if(PC_dec >= RAM.startAddressRam_dec+8080 && PC_dec < RAM.startAddressRam_dec+8192){
        PC_dec = PC_dec - Math.floor(PC_dec/8192)*8192;
        console.log(PC_dec)

        let xPos = PC_dec%8 +36;
        let yPos = Math.floor((PC_dec-7952)/8) + 2;
        redRectangle.textContent = convertNumberToHex_2digits(RAM.dec_array[PC_dec]);
        redRectangle.style.left = String(100/46*(xPos)) + "%";
        redRectangle.style.top = String(100/32*(yPos)) + "%";
        redRectangle.style.width = String(100/46*1) + "%";
        redRectangle.style.height = String(100/32*1) + "%";
    }
    else{
        redRectangle.style.display = 'none';
    }
}


/******************************************************* ANIMATION IMPLEMENTATION ********************************************************* */
/****************************************************************************************************************************************** */

/******************** basic functions ********************/

//Sleep functions for pausing Animation for a certain time
const sleepForMs = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

//throws 'Stop pressed' error
const sleep = async (milliseconds) => {
    count = milliseconds;
    while(true){
        if(count < 10){
            return true;
        }
        else{
            await sleepForMs(10);
            await checkPlayPressed();
            
            count -= 10;
        }
    }
}

const sleepForIDLETIME = () => sleep(IDLETIME);

const sleepForNOANIMATIONIDLETIME = () => sleep(NOANIMATIONIDLETIME);


// function checks if play/pause/stop is pressed
const checkPlayPressed = async() => {
    //if pause is pressed user will be caught in this loop till pressing play or stop
    while(true) {
        if(playStatus.play)
            return true;
        if(playStatus.stop)
            throw Error('Stop Pressed');
        
        console.log('waiting for user input'); 
        await sleepForMs(100);
    }
}

//checks if completeExecution is true
const check_completeExecution = () => {
    //if playStatus.completeExe is not true, pause program when demanded. 
    if(!playStatus.completeExe){
        //after the completion of an animation, check if program should be paused
        if(playStatus.noAnim || playStatus.oneCommand){  
            change_stepDescription('Prozessor angehalten');
            stepNumber.textContent = '0';
            playStatus.setPause();
            setButtonPressed();
        }
    }
}

//adds the next command to the runningProgram_array
const pushNextCommand = () => {
    for (let i = 0; i < mc8_commands_array.length; i++) {
        if(mc8_commands_array[i].machineCommand_dec === IR.dec)
            runningProgram.push(mc8_commands_array[i].animationFunction);
    }
    
    runningProgram.push(get_next_command);
    return;
}

//returns a register class, depending on the passed name
const getRegisterByName = (register_string) => {
    if(register_string === 'IO1')
        return IO1;
    else if(register_string === 'IO2')
        return IO2;
    else if(register_string === 'IO3')
        return IO3;  
    else if(register_string === 'A')
        return A;  
    else if(register_string === 'B')
        return B;  
    else if(register_string === 'C')
        return C;
    else if(register_string === 'IR')
        return IR;
    else if(register_string === 'ALU1')
        return ALU1;
    else if(register_string === 'ALU2')
        return ALU2;
    else if(register_string === 'ALUOUT')
        return ALUOUT;
    else if(register_string === 'HL')
        return HL;
    else if(register_string === 'IX')
        return IX;
    else if(register_string === 'SP')
        return SP;
    else if(register_string === 'PC')
        return PC;
    else if(register_string === 'ZR')
        return ZR;
    else if(register_string === 'HL_lo')
        return HL;
    else if(register_string === 'HL_hi')
        return HL;
    else if(register_string === 'IX_lo')
        return IX;
    else if(register_string === 'IX_hi')
        return IX;
    else if(register_string === 'ZR_lo')
        return ZR;
    else if(register_string === 'ZR_hi')
        return ZR;
    else if(register_string === 'SP_lo')
        return SP;
    else if(register_string === 'SP_hi')
        return SP;
    else if(register_string === 'PC_lo')
        return PC;
    else if(register_string === 'PC_hi')
        return PC;
    else if(register_string === 'FLAGS')
        return FLAGS;
}

/********************************* instant changes/update changes *********************************/
//displays the description of the current Animation
const change_stepDescription = (StringDescription) => stepDescription.textContent = StringDescription;

//increases the step number by 1
const increaseStepNumber = () => stepNumber.textContent = String(Number(stepNumber.textContent)+1);

//displays the the assembler notation. If the register IR contains a command which is not valid, the function returns false.
const change_assemblerCommand = () =>{
    for(i=0; i<mc8_commands_array.length; i++){
        if(mc8_commands_array[i].machineCommand_dec === IR.dec){
            assemblerCommand.textContent = mc8_commands_array[i].assembler_notation_string;
            return true;
        }
    }
    assemblerCommand.textContent = 'Befehl unbekannt';
    return false;
}
        
/********************************************************* simple animations ************************************************************** */
/****************************************************************************************************************************************** */

//adds a yellow background to the passed DOM_Element
const add_yellow_background_for_IDLETIME = async(variable_DOM) => {
    await checkPlayPressed();
    
    //checking if an animation is required
    if(!playStatus.noAnim){
        variable_DOM.classList.add('yellowBg');
        variable_DOM.style.color = '#222222';

        try{
            await sleepForIDLETIME();
        }
        finally {
            variable_DOM.classList.remove('yellowBg');
            variable_DOM.style.color = '';
        }   
    }else{
        await sleepForNOANIMATIONIDLETIME();
    }
}

//animation of all arrows
const addArrow = async(register_string) => {
    if(!await checkPlayPressed()){
        return false;
    }
    if(!playStatus.noAnim){
        if(register_string === 'PC'){
            registerArrow.classList.add('PC_arrow');
            try{
                await sleepForIDLETIME();
            }
            finally{
                registerArrow.classList.remove('PC_arrow');
            }
        }
        
        else if(register_string === 'ZR'){
            registerArrow.classList.add('ZR_arrow');
            try{
                await sleepForIDLETIME();
            }
            finally{
                registerArrow.classList.remove('ZR_arrow');
            }
        }
        else if(register_string === 'HL'){
            registerArrow.classList.add('HL_arrow');
            try{
                await sleepForIDLETIME();
            }
            finally{
                registerArrow.classList.remove('HL_arrow');
            }
        }
        else if(register_string === 'IX'){
            registerArrow.classList.add('IX_arrow');
            try{
                await sleepForIDLETIME();
            }
            finally{
                registerArrow.classList.remove('IX_arrow');
            }
        }
        
        else if(register_string === 'SP'){
            registerArrow.classList.add('SP_arrow');
            try{
                await sleepForIDLETIME();
            }
            finally{
                registerArrow.classList.remove('SP_arrow');
            }
        }

        else if(register_string === 'IR'){
            irArrow.classList.add('ir_arrow');
            try{
                await sleepForIDLETIME();
            }
            finally{
                irArrow.classList.remove('ir_arrow');
            }
        }
        else if(register_string === 'FLAGS'){
            flagsArrow.classList.add('flags_arrow');
            try{
                await sleepForIDLETIME();
            }
            finally{
                flagsArrow.classList.remove('flags_arrow');
            }
        }
        else if(register_string === 'cFlag'){
            cFlag_arrow.classList.add('cFlag_arrow');
            FLAGS.c_DOM.classList.add('yellowBg', 'borderBox');
            try{
                await sleepForIDLETIME();
            }
            finally{
                cFlag_arrow.classList.remove('cFlag_arrow');
                FLAGS.c_DOM.classList.remove('yellowBg', 'borderBox');
            }
        }
        else if(register_string === 'jumpZ'){
            jump_arrow.classList.add('jump_arrow');
            FLAGS.z_DOM.classList.add('yellowBg', 'borderBox');
            try{
                await sleepForIDLETIME();
            }
            finally{
                jump_arrow.classList.remove('jump_arrow');
                FLAGS.z_DOM.classList.remove('yellowBg', 'borderBox');
            }
        }
        else if(register_string === 'jumpC'){
            jump_arrow.classList.add('jump_arrow');
            FLAGS.c_DOM.classList.add('yellowBg', 'borderBox');
            try{
                await sleepForIDLETIME();
            }
            finally{
                jump_arrow.classList.remove('jump_arrow');
                FLAGS.c_DOM.classList.remove('yellowBg', 'borderBox');
            }
        }
        else if(register_string === 'jumpS'){
            jump_arrow.classList.add('jump_arrow');
            FLAGS.s_DOM.classList.add('yellowBg', 'borderBox');
            try{
                await sleepForIDLETIME();
            }
            finally{
                jump_arrow.classList.remove('jump_arrow');
                FLAGS.s_DOM.classList.remove('yellowBg', 'borderBox');
            }
        }
        else if(register_string === 'jumpP'){
            jump_arrow.classList.add('jump_arrow');
            FLAGS.p_DOM.classList.add('yellowBg', 'borderBox');
            try{
                await sleepForIDLETIME();
            }
            finally{
                jump_arrow.classList.remove('jump_arrow');
                FLAGS.p_DOM.classList.remove('yellowBg', 'borderBox');
            }
        }
    } 
    return true;
}


//animation of updating the description
const description_update = async(description_string) => {
    await checkPlayPressed();

    change_stepDescription(description_string);
    increaseStepNumber();
    await add_yellow_background_for_IDLETIME(stepNumberBackground);
}

//animates the update of the assembler command, if the command is unknown the function throws an error and the execution gets terminated
const assemblerCommand_update = async() => {
    await checkPlayPressed();
    await add_yellow_background_for_IDLETIME(IR.DOM);
    await addArrow('IR');
    if(!change_assemblerCommand()){
        throw Error('Unknown command');
    }
    if(!playStatus.noAnim)
        await sleepForIDLETIME();
}

//increases PC by one and animates it
const updatePC = async() => {
    await checkPlayPressed()

    PC.update(PC.dec + 1);
    updateRedRectangle(PC.dec);
    await add_yellow_background_for_IDLETIME(PC.DOM);
}

//updates and animates register/io with the passed value
const updateRegister_hex = async(registerName_string, value_dec) => {
    await checkPlayPressed();

    if(registerName_string.includes('hi')){
       await updateRegister_hex4_hi(getRegisterByName(registerName_string), value_dec);
    }
    else if(registerName_string.includes('lo')){
        await updateRegister_hex4_lo(getRegisterByName(registerName_string), value_dec);
    }
    else{
        //update register
        reg = getRegisterByName(registerName_string);
        reg.update(value_dec);

        //animate register update
        await add_yellow_background_for_IDLETIME(reg.DOM);
    }
}

const updateRegister_hex4_hi = async(register_class, hex2_dec) => {
    await checkPlayPressed();

    //update register
    register_class.update_hi(hex2_dec);

    //animate register update
    if(!playStatus.noAnim){
        yellowBgElement.style.top = register_class.DOM.offsetTop + 'px';
        yellowBgElement.style.left = String(100/46*14) + '%';
        yellowBgElement.classList.add('toggleGrid');
        try{
            await sleepForIDLETIME();
        }
        finally{
            yellowBgElement.classList.remove('toggleGrid');
        }
    }
}

const updateRegister_hex4_lo = async(register_class, hex2_dec) => {
    await checkPlayPressed();

    //update register
    register_class.update_lo(hex2_dec);

    //animate register update if Animation is required
    if(!playStatus.noAnim){
        yellowBgElement.style.top = register_class.DOM.offsetTop + 'px';
        yellowBgElement.style.left = String(100/46*16) + '%';
        yellowBgElement.classList.add('toggleGrid');
        try{
            await sleepForIDLETIME();
        }
        finally{
            yellowBgElement.classList.remove('toggleGrid');
        }
    }
}


/******************************************************** complex animations ************************************************************** */
/****************************************************************************************************************************************** */


/************************************Moving Animations**************************************/

//calculates the coordinates between the fixPoints.
//At Speed 1, the movingObject updates every single coordinate
//At Speed 2, the movingObject updates every second coordinate...
//max Speed = 12 (update only fixPoints)
const calcIntermediatePositions = (path, interPointsQuantity=12) => {
    let xPositions = [];
    let yPositions = [];
    let bufferX = [];
    let bufferY = [];
    let posDiff = 0;
    const reciprocal = 1/interPointsQuantity;
    
    //iterate through path
    for (let j = 0; j < path.length-1; j++) {
        
        //If path position is different to the next path position, calculate position difference
        //and add intermediate Points, depending on the position difference and direction.
        if(path[j].y !== path[j+1].y){
            posDiff = Math.abs((path[j+1].y-path[j].y));

            for (let i = 0; i < interPointsQuantity*posDiff; i++) {
                if((path[j+1].y>path[j].y))
                    yPositions.push(path[j].y + reciprocal*(i+1));
                else
                    yPositions.push(path[j].y - reciprocal*(i+1));

                xPositions.push(path[j].x);
            }
        }
        if(path[j].x !== path[j+1].x){
            posDiff = Math.abs((path[j+1].x-path[j].x));

            for (let i = 0; i < interPointsQuantity*posDiff; i++) {
                if((path[j+1].x>path[j].x))
                    xPositions.push(path[j].x + reciprocal*(i+1));
                else
                    xPositions.push(path[j].x - reciprocal*(i+1));

                yPositions.push(path[j].y);
            }
        }
    }

    //create 2-dimensional array, which contains 12 coordinates per index
    for (let i = 0, k = -1; i < xPositions.length; i++) {
        if(i % interPointsQuantity === 0){
            k++;
            bufferX[k] = [];
            bufferY[k] = [];
        }
        bufferX[k].push(xPositions[i]); 
        bufferY[k].push(yPositions[i]);       
    }

    return [bufferX, bufferY];
}

//updates the position of the passed DOM_Object
const updatePosition = (movingObject, x, y) => {
    movingObject.style.top = String(100/32*y) +"%";
    movingObject.style.left = String(100/46*x) +"%";
}

//moves the movingObject to the starting position.
//updates the textContent, toggles visibility and adjusts the size
const updateMovingObj = (aPath, hexValue_string) => {
    updatePosition(movingObject,aPath[0].x,aPath[0].y);
    movingObject.textContent = hexValue_string;
    movingObject.classList.add('toggleGrid');

    if(aPath[0].label === 'PC'|| aPath[0].label === 'ZR' ||aPath[0].label === 'IX' || aPath[0].label ==='HL' || aPath[0].label === 'SP')
        movingObject.classList.add('rectangle4x2');
    else{
        try{
            movingObject.classList.remove('rectangle4x2');
        }catch{}
    }
    return movingObject;
}

const createGreyElement = (i, xCoordinate,yCoordinate) =>{
    ele = document.createElement('div');
    ele.style.position = 'absolute';
    ele.style.left = String(100/46*(xCoordinate[i]+0.5)) + '%';
    ele.style.top = String(100/32*(yCoordinate[i]+0.5)) +'%';
    ele.style.height = String(100/32*1) + '%';
    ele.style.width = String(100/46*1) + '%';
    ele.classList.add('greyBg' ,'rounded');
    return ele;
}

//animation without a movingObject
const createPaintedPath = async(path,fixPointLabel_A_string, fixPointLabel_B_string, startElement_DOM) => {
    let pathElements = [];
    const coords = calcIntermediatePositions(path,2);
    const xCoordinate = coords[0].flat(2);
    const yCoordinate = coords[1].flat(2);
   
    //fixPoints of PC,ZR,... are too far to the left due to the size of 4x2 --> Painted path has to be moved right by 1
    if(fixPointLabel_A_string === 'PC' || fixPointLabel_A_string === 'ZR' || fixPointLabel_A_string === 'HL' || fixPointLabel_A_string === 'SP' || fixPointLabel_A_string === 'IX'){
        for (let i = 0; i < xCoordinate.length; i++) {
            xCoordinate[i] += 1;
        }
        if(fixPointLabel_B_string === 'ROM2'){
            xCoordinate.push(xCoordinate[xCoordinate.length-1]-1);
            yCoordinate.push(yCoordinate[yCoordinate.length-1]);
        } else {
            xCoordinate.push(xCoordinate[xCoordinate.length-1]-1);
            yCoordinate.push(yCoordinate[yCoordinate.length-1]);
        }
    }

    //create all PathElements
    for (let i = xCoordinate.length-1; i >=0 ; i--) {
        ele = createGreyElement(i, xCoordinate, yCoordinate);
        pathElements.push(ele);
    }

    //create last PathElement (hex-number)
    let reg = document.createElement('h2');
    reg.style.position = 'absolute';
    reg.style.left = String(100/46*(xCoordinate[xCoordinate.length-1])) + '%';
    reg.style.top = String(100/32*(yCoordinate[xCoordinate.length-1])) +'%';
    reg.textContent = startElement_DOM.textContent;
    reg.style.color = "#222222";
    reg.classList.add('yellowBg', 'borderBox', 'square2x2', 'rounded', );
    if(fixPointLabel_A_string === 'PC' || fixPointLabel_A_string === 'ZR' || fixPointLabel_A_string === 'HL' || fixPointLabel_A_string === 'SP' || fixPointLabel_A_string === 'IX')
        reg.classList.add('rectangle4x2');
    
    pathElements.push(reg);

    //add Elements to grid
    for (let i = 0; i < pathElements.length; i++) {
        grid.appendChild(pathElements[i]);
    }

    //animate for certain time
    try{
        await sleep(2000/ANIMATION_SPEED);
    }
    catch(e) {
        throw Error('Stop pressed');
    }
    finally {
        //remove 
        for (let i = 0; i < pathElements.length; i++) {
            pathElements[i].remove();
        }
        startElement_DOM.classList.remove('toggleGrid');
    }
}

//animates the movement from on fixPoint to another one
const transfer = async(fixPointLabel_A_string, fixPointLabel_B_string, value_dec = 0) => {
    await checkPlayPressed();
    
    //only execute when Animation is required
    if(!playStatus.noAnim){  
        const path = getPointsAtoB(fixPointLabel_A_string, fixPointLabel_B_string);
        let inCPU = false;

        //convert value_dec to hex_4digits if required
        if(value_dec > 255 || fixPointLabel_B_string === 'ROM2' || fixPointLabel_B_string === 'RAM2' || fixPointLabel_B_string === 'ZR'|| fixPointLabel_B_string === 'PC'|| fixPointLabel_B_string === 'IX'|| fixPointLabel_B_string === 'HL'|| fixPointLabel_B_string === 'SP')
            value_dec = convertNumberToHex_4digits(value_dec);
        else
            value_dec = convertNumberToHex_2digits(value_dec);
        
        //update the moving object
        updateMovingObj(path,value_dec);
        const movingObjectCoordinates = calcIntermediatePositions(path, 12);

        //xCoordinate is a 2-dimensional-array which contains 12 coordinates per index
        //[Array(12), ..., Array(12)]
        const xCoordinate = movingObjectCoordinates[0];
        const yCoordinate = movingObjectCoordinates[1];

        //check if starting point is inside CPU
        if(yCoordinate[0][0] < 24 && yCoordinate[0][0]>3 && xCoordinate[0][0] > 9 && xCoordinate[0][0]){
            inCPU = true;
        }

        //fast Animation
        if(playStatus.rocketSpeed){
            DECODER.updateDOM();
            await createPaintedPath(path,fixPointLabel_A_string, fixPointLabel_B_string, movingObject);
            if(!DECODER.ramAccess && !DECODER.ioAccess){
                DECODER.resetDOM();
            }
        }
        //slow Animation
        else{
            //iterate through Coordinates
            for (let i = 0; i < movingObjectCoordinates[0].length; i++) {  
                
                //if singleStep is pressed during the animation, remove movingObject and jump out of function
                if(playStatus.noAnim){
                    movingObject.classList.remove('toggleGrid');
                    return true;
                }
                
                //display decoder
                if(inCPU && (yCoordinate[i][0] > 23 || yCoordinate[i][0] < 3)){
                    inCPU = false;
                    DECODER.updateDOM();
                    
                }
                if(!inCPU && (yCoordinate[i][0] < 23 && yCoordinate[i][0] > 3)){
                    inCPU = true;
                    if(!DECODER.ramAccess && !DECODER.ioAccess)
                        DECODER.resetDOM();
                }

                //update position of the movingObject depending on the speed
                await conditionalPositionUpdate(xCoordinate[i], yCoordinate[i], ANIMATION_SPEED, movingObject);
            }
        }
        //remove object when transfer was successful 
        movingObject.classList.remove('toggleGrid');
    }
    //noAnim
    else {
        DECODER.updateDOM();
        await sleepForNOANIMATIONIDLETIME();
        if(!DECODER.ramAccess && !DECODER.ioAccess){
            DECODER.resetDOM();
        }
            
    }
}

//updates the position of the movingObject depending on the speed(values: 1,2,3,4,6,12) => 12/values is always an integer
//e.g.  if the speed is 12 the position is only updated once(last coordinate of x12array)
//      if the speed is 3 the position is updated with every third coordinate,... 
const conditionalPositionUpdate = async(xCoordinate_x12array, yCoordinate_x12array, speed_dec, movingObject_DOM) => {
    for (let j = 0; j < xCoordinate_x12array.length/speed_dec; j++) {
        updatePosition(movingObject_DOM, xCoordinate_x12array[j*speed_dec], yCoordinate_x12array[j*speed_dec]);
        
        //animate for certain time before entering next iteration
        try{
            await sleep(1000/FRAMES);
        }
        catch (e) {
            //remove movingObject if 
            movingObject_DOM.classList.remove('toggleGrid');
            throw Error('Stop pressed');
        }
    }
    return true;
}  
   
/************************************ALU animation**************************************/

//set text content of movingAluElements and display them
const setMovingAluElements = (twoMovingAluElements_boolean) => {
    movingAlu1.textContent = ALU1.DOM.textContent;
    movingAlu2.textContent = ALU2.DOM.textContent;    
    movingAlu1.classList.add('toggleGrid');
    if(twoMovingAluElements_boolean)
        movingAlu2.classList.add('toggleGrid');
}

//reset position of movingAluElements
const resetMovingAluElements = () => {
    try{
        movingAlu1.classList.remove('toggleGrid');
        movingAlu2.classList.remove('toggleGrid');
    } catch (e) {}
    movingAlu1.style.top = String(100/32*6) +"%";
    movingAlu1.style.left = String(100/46*24) +"%";

    movingAlu2.style.top = String(100/32*6) +"%";
    movingAlu2.style.left = String(100/46*30) +"%";
}
resetMovingAluElements();

//animation of ALU-usage
const aluAnimation = async(aluOUT_dec, twoMovingAluElements_boolean, cFlag_boolean, saveToRegister_string=false) => {
    if(!playStatus.noAnim){
        const xCoordinateAlu1 = [24];
        const xCoordinateAlu2 = [30];
        const yCoordinate =  [6];
        for (let j = 0; j < 30; j++) {
            xCoordinateAlu1.push(xCoordinateAlu1[j]+0.1);
            xCoordinateAlu2.push(xCoordinateAlu2[j]-0.1);
            yCoordinate.push(yCoordinate[j]+1/7.5);
        }

        setMovingAluElements(twoMovingAluElements_boolean);
        ALU1.DOM.textContent = '';
        ALU2.DOM.textContent = '';
        if(cFlag_boolean)
            await addArrow('cFlag');
        try{
            await sleepForIDLETIME();
            
            for (let i = 0; i < xCoordinateAlu1.length; i++) {
                updatePosition(movingAlu1, xCoordinateAlu1[i],yCoordinate[i]);
                updatePosition(movingAlu2, xCoordinateAlu2[i],yCoordinate[i]);
                await sleep(1000/FRAMES);  
            }
            resetMovingAluElements();
            await updateRegister_hex('ALUOUT', aluOUT_dec);
        }
        finally{
            resetMovingAluElements();
        }
        ALUOUT.DOM.classList.add('yellowBg');
    }
    else{ //noAnim
        await updateRegister_hex('ALUOUT', aluOUT_dec);
        ALU1.DOM.textContent = '';
        ALU2.DOM.textContent = '';
    }
    
    try {
        await description_update('Setze die Flags');
        await setFlagsAnimation();
        if(saveToRegister_string)
            await description_update('Speichere das Ergebnis');
    } 
    finally{
        ALUOUT.DOM.classList.remove('yellowBg');
        ALUOUT.DOM.textContent = '';
    }
    if(saveToRegister_string){
        await transfer('ALUOUT', saveToRegister_string, aluOUT_dec);
        await updateRegister_hex(saveToRegister_string, aluOUT_dec);
    }    
}

const hlBcAnimation = async(aluOUT_dec, stepOne_boolean) => {
    if(!playStatus.noAnim){
        const xCoordinateAlu1 = [24];
        const xCoordinateAlu2 = [30];
        const yCoordinate =  [6];
        for (let j = 0; j < 30; j++) {
            xCoordinateAlu1.push(xCoordinateAlu1[j]+0.1);
            xCoordinateAlu2.push(xCoordinateAlu2[j]-0.1);
            yCoordinate.push(yCoordinate[j]+1/7.5);
        }

        setMovingAluElements(true);
        ALU1.DOM.textContent = '';
        ALU2.DOM.textContent = '';
        if(!stepOne_boolean)
            await addArrow('cFlag');
        try{
            await sleepForIDLETIME();
            
            for (let i = 0; i < xCoordinateAlu1.length; i++) {
                updatePosition(movingAlu1, xCoordinateAlu1[i],yCoordinate[i]);
                updatePosition(movingAlu2, xCoordinateAlu2[i],yCoordinate[i]);
                await sleep(1000/FRAMES);  
            }
            resetMovingAluElements();
            await updateRegister_hex('ALUOUT', aluOUT_dec);
        }
        finally{
            resetMovingAluElements();
        }
        ALUOUT.DOM.classList.add('yellowBg');
    }
    else{ //noAnim
        await updateRegister_hex('ALUOUT', aluOUT_dec);
        ALU1.DOM.textContent = '';
        ALU2.DOM.textContent = '';
    }
    
    if(stepOne_boolean){
        try {
            await description_update('Setze Carry-Flag');
            FLAGS.z_dec = '-';
            FLAGS.s_dec = '-';
            FLAGS.p_dec = '-';
            await setFlagsAnimation();
            await description_update('Speichere das Ergebnis in L');
        } 
        finally{
            ALUOUT.DOM.classList.remove('yellowBg');
            ALUOUT.DOM.textContent = '';
        }
        await transfer('ALUOUT', 'HL_lo', aluOUT_dec);
        await updateRegister_hex('HL_lo', aluOUT_dec);
    }
    else{
        try {
            await description_update('Setze Carry-Flag');
            FLAGS.z_dec = '-';
            FLAGS.s_dec = '-';
            FLAGS.p_dec = '-';
            await setFlagsAnimation();
            await description_update('Speichere das Ergebnis in H');
        } 
        finally{
            ALUOUT.DOM.classList.remove('yellowBg');
            ALUOUT.DOM.textContent = '';
        }
        await transfer('ALUOUT', 'HL_hi', aluOUT_dec);
        await updateRegister_hex('HL_hi', aluOUT_dec);
    }
}

//animation of setting flags
const setFlagsAnimation = async() => {
    if (!playStatus.noAnim) {
        await addArrow('FLAGS');
        movingFlags.children[0].textContent = FLAGS.c_dec;
        movingFlags.children[1].textContent = FLAGS.z_dec;
        movingFlags.children[2].textContent = FLAGS.p_dec;
        movingFlags.children[3].textContent = FLAGS.s_dec;
        movingFlags.classList.add('toggleGrid');
        try{
            await sleepForIDLETIME();
            for (let i = 0; i < 21; i++) {
                movingFlags.style.top = String(100/32*(8-i/20)) + '%';
                await sleep(1000/FRAMES);  
            }
            await sleepForIDLETIME();
        }
        finally{
            movingFlags.classList.remove('toggleGrid');
            movingFlags.style.top = String(100/32*8) + '%';
        }
    }
    FLAGS.updateDOM();
}

const checkJumpAnimation = async(flag_string) => {
    switch (flag_string) {
        case 'zFlag':
            await addArrow('jumpZ');
            break;
        
        case 'cFlag':
            await addArrow('jumpC');
            break;

        case 'sFlag':
            await addArrow('jumpS');
            break;

        case 'pFlag':
            await addArrow('jumpP');
            break;
    
        default:
            break;
    }
}

const checkCorrectInput = (input_string) => {
    const allowedChar = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    let check = true;

    input_string = input_string.toUpperCase();
    if(input_string.length > 2)
        return false;
    for (let i = 0; i < input_string.length; i++) {
        for (let j = 0; j < allowedChar.length; j++) {
            if(input_string[i] === allowedChar[j]){
                check = true;
                break;
            }
            else{
                check = false;
            }
        }
        if(!check)
            return false;
    }
    return true;
}

//animation of IO-input
const changeIO = async(IOName_string) =>{
    let IO_input_window_DOM = 0;
    let IO_input_DOM = 0;
    let check = true;
    let playStatusBuffer = playStatus.getStatus();
    switch (IOName_string) {
        case 'IO1':
            IO_input_window_DOM = IO1_input_window;
            IO_input_DOM = IO1_input;
            break;
        case 'IO2':
            IO_input_window_DOM = IO2_input_window;
            IO_input_DOM = IO2_input;
            break;

        case 'IO3':
            IO_input_window_DOM = IO3_input_window;
            IO_input_DOM = IO3_input;
            break;
    
        default:
            throw Error('Unknown IO');
    }
    IO_input_window_DOM.classList.add('toggleGrid');
    try{
        while(check){
            
            pause();
            
            await checkPlayPressed();
            
            if(IO_input_DOM.value === '')
                IO_input_DOM.value = 'FF';
            if(checkCorrectInput(IO_input_DOM.value)){
                check = false;
            }
            else{
                if (IOName_string === 'IO1') {
                    document.getElementById('io1Input_info').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                }
                else if (IOName_string === 'IO2') {
                    document.getElementById('io2Input_info').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                }
                else if (IOName_string === 'IO3') {
                    document.getElementById('io3Input_info').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                }
            }
        }
    }
    finally{
        IO_input_window_DOM.classList.remove('toggleGrid');
        document.getElementById('io1Input_info').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        document.getElementById('io2Input_info').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        document.getElementById('io3Input_info').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
    }

    if(playStatusBuffer === 'completeExe')
        runCompleteExecution();
    else if(playStatusBuffer === 'rocketSpeed')
        rocketSpeed_on();
    else if(playStatusBuffer === 'noAnim')
        runNextSingleStep();
    
    await updateRegister_hex(IOName_string,convertHexToNumber(IO_input_DOM.value));
    IO_input_DOM.value = '';    
}

//reads a byte from the ROM or RAM. The addressRegister 
const readFromMemoryInRegister = async(addressRegister_x4_string, targetRegister_x2_string) =>{
    //get the address
    let address_dec = getRegisterByName(addressRegister_x4_string).dec;

    //update decoder without displaying  
    DECODER.update(1,0,0,1,address_dec);
    
    await addArrow(addressRegister_x4_string);
    
    //determine ROM or RAM
    if(address_dec < 8192){
        await transfer(addressRegister_x4_string, 'ROM2', address_dec);
        await transfer(ROM.getElementId(address_dec.dec),targetRegister_x2_string, ROM.getValue(address_dec));
        await updateRegister_hex(targetRegister_x2_string, ROM.getValue(address_dec));
    }
    else if (address_dec >= RAM.startAddressRam_dec && address_dec < RAM.startAddressRam_dec+RAM.size_dec){
        await transfer(addressRegister_x4_string, 'RAM2', address_dec);
        await transfer(RAM.getRamElementId(address_dec),targetRegister_x2_string, RAM.getValue(address_dec));
        await updateRegister_hex(targetRegister_x2_string,RAM.getValue(address_dec));
    } 
    //Neither ROM or RAM  
    else{
        //The address of the addressRegister is unknown.
        //the following code wont be executed completely, because the decoder will interrupt execution
        await transfer(addressRegister_x4_string, 'RAM2', address_dec);
    }
    DECODER.resetDOM();
}

const writeToMemoryFromRegister = async(addressRegister_x4_string, DataRegister_x2_string) => {
    //get address
    let address_dec = getRegisterByName(addressRegister_x4_string).dec;

    //get data
    let register_x2_class = getRegisterByName(DataRegister_x2_string);
    let data_dec = register_x2_class.dec;
    if(DataRegister_x2_string.includes('hi'))
        data_dec = register_x2_class.hi_dec;
    if(DataRegister_x2_string.includes('lo'))
        data_dec = register_x2_class.lo_dec;

    //update decoder, without displaying it
    DECODER.update(0,1,0,1,address_dec);

    await addArrow(addressRegister_x4_string);

    //determine ROM or RAM
    if(address_dec < 8192){
        //wont be executed completely, because the decoder will interrupt execution 
        await transfer(addressRegister_x4_string, 'ROM2', address_dec);
    }
    else if (address_dec >= RAM.startAddressRam_dec && address_dec< RAM.startAddressRam_dec+RAM.size_dec){
        await transfer(addressRegister_x4_string, 'RAM2', address_dec);
        if(!playStatus.noAnim)
            document.getElementById(RAM.getRamElementId(address_dec)).classList.add('yellowBg', 'borderBox');
        try{
            await transfer(DataRegister_x2_string, RAM.getRamElementId(address_dec), data_dec);
        } catch (e) {
            document.getElementById(RAM.getRamElementId(address_dec)).classList.remove('yellowBg', 'borderBox');
            throw e;
        }

    }
    //Neither ROM or RAM
    else{
        //wont be executed completely, because the decoder will interrupt execution 
        await transfer(addressRegister_x4_string, 'RAM2', address_dec);
    }
    RAM.update(address_dec,data_dec);
    try{
        await add_yellow_background_for_IDLETIME(document.getElementById(RAM.getRamElementId(address_dec)));

    }
    finally{
        document.getElementById(RAM.getRamElementId(address_dec)).classList.remove('borderBox');
        DECODER.resetDOM();
    }
}

const readFromIo = async() =>{
    
    DECODER.update(1,0,1,0,ZR.lo_dec);
    await transfer('ZR', 'DEC_UPDATE', ZR.lo_dec);
    if(ZR.lo_dec === IO1.address_dec){
        await changeIO('IO1');
        await transfer('IO1', 'A', IO1.dec);
        await updateRegister_hex('A', IO1.dec);
    }
    else if(ZR.lo_dec === IO2.address_dec){
        await changeIO('IO2');
        await transfer('IO2', 'A', IO2.dec);
        await updateRegister_hex('A', IO2.dec);
    }
    else if(ZR.lo_dec === IO3.address_dec){
        await changeIO('IO3');
        await transfer('IO3', 'A', IO3.dec);
        await updateRegister_hex('A', IO3.dec);
    }
    DECODER.resetDOM();
}

const writeToIo = async() =>{
    
    DECODER.update(0,1,1,0,ZR.lo_dec);
    await transfer('ZR', 'DEC_UPDATE', ZR.lo_dec);
    if(ZR.lo_dec === IO1.address_dec){
        await transfer('A', 'IO1', A.dec);
        await updateRegister_hex('IO1', A.dec);
    }
    else if(ZR.lo_dec === IO2.address_dec){
        await transfer('A', 'IO2', A.dec);
        await updateRegister_hex('IO2', A.dec);
    }
    else if(ZR.lo_dec === IO3.address_dec){
        await transfer('A', 'IO3', A.dec);
        await updateRegister_hex('IO3', A.dec);
    }
    DECODER.resetDOM();
}

//composition of animations which occurs often
const increasePC = async() => {
    await description_update('Erhöhe Programmzähler um 1');
    await addArrow('PC');
    await updatePC();
}

const loadOperands = async(register1_string, register2_string) => {
    const reg1_class = getRegisterByName(register1_string);
    const reg2_class = getRegisterByName(register2_string);

    await description_update('Hole den 1. Operanden'); 
    await transfer(register1_string,'ALU1',reg1_class.dec);
    await updateRegister_hex('ALU1', reg1_class.dec);
    await description_update('Hole den 2. Operanden');
    await transfer(register2_string, 'ALU2',reg2_class.dec);
    await updateRegister_hex('ALU2', reg2_class.dec);

}

const loadAddressBytesInZr = async() => {
    await description_update('Hole das niederwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Hole das höherwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_hi');
    await increasePC();
}


/********************************** command animations ****************************** */

const get_next_command = async() => {
    stepNumber.textContent = '0';
    assemblerCommand.textContent = '';
    IR.DOM.textContent = '';

    await description_update('Hole den nächsten Befehl');
    await readFromMemoryInRegister('PC', 'IR');
    await increasePC();
    await description_update('Erkenne den Befehl');
    await assemblerCommand_update();
    pushNextCommand();
    return true;

}

const nop = async() => {
    if(playStatus.noAnim)
        await sleepForNOANIMATIONIDLETIME();
    else
        await sleepForIDLETIME();
    check_completeExecution();
}

const halt = async() => {
    await description_update('Prozessor angehalten');
    pause();
    check_completeExecution();
}

const movAdat_8 = async() => {
    await description_update('Hole den Parameter');
    await readFromMemoryInRegister('PC', 'A');
    await increasePC();
    check_completeExecution();
    return true;
    
}

const movBdat_8 = async() => {
    await description_update('Hole den Parameter');
    await readFromMemoryInRegister('PC', 'B');
    await increasePC();
    check_completeExecution();
    return true;
}

const movCdat_8 = async() => {
    await description_update('Hole den Parameter');
    await readFromMemoryInRegister('PC', 'C');
    await increasePC();
    check_completeExecution();
    return true;
}

const twoByteIX = async() => {
    await description_update('Hole das 2. Byte des Befehls');
    await readFromMemoryInRegister('PC', 'IR');
    await increasePC();
    await description_update('Erkenne den Befehl');
    await add_yellow_background_for_IDLETIME(IR.DOM);
    await addArrow('IR');
    

    if(IR.dec === 0b00100001){
        assemblerCommand.textContent = 'MOV IX, dat_16';
        if(!playStatus.noAnim)
            await sleepForIDLETIME();
        await description_update('Hole das niederwertige Byte');
        await readFromMemoryInRegister('PC', 'IX_lo');
        await increasePC();
        await description_update('Hole das höherwertige Byte');
        await readFromMemoryInRegister('PC', 'IX_hi');
        await increasePC();
    }
    else if(IR.dec === 0b00101010){
        assemblerCommand.textContent = 'MOV IX, label';
        await description_update('Hole das niederwertige Adressbyte');
        await readFromMemoryInRegister('PC', 'ZR_lo');
        await increasePC();
        await description_update('Hole das höherwertige Adressbyte');
        await readFromMemoryInRegister('PC', 'ZR_hi');
        await increasePC();
        await description_update('Hole das niederwertige Byte');
        await readFromMemoryInRegister('ZR', 'IX_lo');
        await description_update('Erhöhe die Adresse um 1');
        await addArrow('ZR');
        await updateRegister_hex('ZR', ZR.dec+1);
        await description_update('Hole das höherwertige Byte');
        await readFromMemoryInRegister('ZR', 'IX_hi');
    }
    else if(IR.dec === 0b00100010 ){
        assemblerCommand.textContent = 'MOV label, IX';
        await description_update('Hole das niederwertige Adressbyte');
        await readFromMemoryInRegister('PC', 'ZR_lo');
        await increasePC();
        await description_update('Hole das höherwertige Adressbyte');
        await readFromMemoryInRegister('PC', 'ZR_hi');
        await increasePC();
        await description_update('Schreibe das niederwertige Byte');
        await writeToMemoryFromRegister('ZR', 'IX_lo');
        await description_update('Erhöhe die Adresse um 1');
        await addArrow('ZR');
        await updateRegister_hex('ZR', ZR.dec+1);
        await description_update('Schreibe das höherwertige Byte');
        await writeToMemoryFromRegister('ZR', 'IX_hi');

    }
    else if(IR.dec === 0b00100011){
        assemblerCommand.textContent = 'INC IX';
        await description_update('Erhöhe die Adresse um 1');
        await addArrow('IX');
        await updateRegister_hex('IX', IX.dec+1);
    }
    else if(IR.dec === 0b00101011){
        assemblerCommand.textContent = 'DEC IX';
        await description_update('Verringere die Adresse um 1');
        await addArrow('IX');
        await updateRegister_hex('IX', IX.dec-1);
    }
    else if(IR.dec === 0b11101001){
        assemblerCommand.textContent = 'JP [IX]';
         
    }
    
    check_completeExecution();
    return true;
}

const movHLdat_16 = async() => {
    await description_update('Hole das niederwertige Byte');
    await readFromMemoryInRegister('PC', 'HL_lo');
    await increasePC();
    await description_update('Hole das höherwertige Byte');
    await readFromMemoryInRegister('PC', 'HL_hi');
    await increasePC();
    check_completeExecution();
}

const movSPdat_16 = async() => {
    await description_update('Hole das niederwertige Byte');
    await readFromMemoryInRegister('PC', 'SP_lo');
    await increasePC();
    await description_update('Hole das höherwertige Byte');
    await readFromMemoryInRegister('PC', 'SP_hi');
    await increasePC();
    check_completeExecution();
}

const movAB = async() => {
    await description_update('Kopiere die Daten');
    await transfer('B', 'A', B.dec);
    await updateRegister_hex('A', B.dec);
    check_completeExecution();
}

const movAC = async() => {
    await description_update('Kopiere die Daten');
    await transfer('C', 'A', C.dec);
    await updateRegister_hex('A', C.dec);
    check_completeExecution();
}

const movBA = async() => {
    await description_update('Kopiere die Daten');
    await transfer('A', 'B', A.dec);
    await updateRegister_hex('B', A.dec);
    check_completeExecution();
}

const movBC = async() => {
    await description_update('Kopiere die Daten');
    await transfer('C', 'B', C.dec);
    await updateRegister_hex('B', C.dec);
    check_completeExecution();
}

const movCA = async() => {
    await description_update('Kopiere die Daten');
    await transfer('A', 'C', A.dec);
    await updateRegister_hex('C', A.dec);
    check_completeExecution();
}

const movCB = async() => {
    await description_update('Kopiere die Daten');
    await transfer('B', 'C', B.dec);
    await updateRegister_hex('C', B.dec);
    check_completeExecution();
} 

const movALabel = async() => {
    await description_update('Hole das niederwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Hole das höherwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_hi');
    await increasePC();
    await description_update('Hole die Daten');
    await readFromMemoryInRegister('ZR', 'A');
    check_completeExecution();
}

const movLabelA = async() => {
    await description_update('Hole das niederwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Hole das höherwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_hi');
    await increasePC();
    await description_update('Schreibe die Daten');
    await writeToMemoryFromRegister('ZR', 'A');
    check_completeExecution();
}

const movHlLabel = async() => {
    await description_update('Hole das niederwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Hole das höherwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_hi');
    await increasePC();
    await description_update('Hole das niederwertige Byte');
    await readFromMemoryInRegister('ZR', 'HL_lo');

    await description_update('Erhöhe die Adresse um 1');
    await addArrow('ZR');
    await updateRegister_hex('ZR', ZR.dec+1);
    await description_update('Hole das höherwertige Byte');
    await readFromMemoryInRegister('ZR', 'HL_hi');
    check_completeExecution();
}

const movLabelHl = async() => {
    await description_update('Hole das niederwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Hole das höherwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_hi');
    await increasePC();
    await description_update('Schreibe das niederwertige Byte');
    await writeToMemoryFromRegister('ZR', 'HL_lo');

    await description_update('Erhöhe die Adresse um 1');
    await addArrow('ZR');
    await updateRegister_hex('ZR', ZR.dec+1);
    await description_update('Schreibe das höherwertige Byte');
    await writeToMemoryFromRegister('ZR', 'HL_hi');
    check_completeExecution();
}

const movAHl = async() => {
    await description_update('Hole die Daten');
    await readFromMemoryInRegister('HL', 'A');
    check_completeExecution();
}

const movHlA = async() => {
    await description_update('Schreibe die Daten');
    await writeToMemoryFromRegister('HL', 'A');
    check_completeExecution();
}

const push = async() => {
    await description_update('Erhöhe den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec-1);
    await description_update('Schreibe den Akku');
    await writeToMemoryFromRegister('SP', 'A');
    await description_update('Erhöhe den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec-1);
    await description_update('Schreibe die Flags');
    await writeToMemoryFromRegister('SP', 'FLAGS');
    check_completeExecution();
}

const pop = async() => {
    await description_update('Hole die Flags');
    await readFromMemoryInRegister('SP', 'FLAGS');
    await description_update('Verringer den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec+1);
    await description_update('Hole den Akku');
    await readFromMemoryInRegister('SP', 'A');
    await description_update('Verringer den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec+1);
    check_completeExecution();
}

const inA = async() => {
    await description_update('Hole das Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Hole die Daten');
    await readFromIo();
    check_completeExecution();
}

const outA = async() => {
    await description_update('Hole das Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Schreibe die Daten');
    await writeToIo();
    check_completeExecution();
}

const incA = async() => {
    await description_update('Hole den Operanden');
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Erhöhe den Operanden um 1');
    const result = incBinary(A.dec);
    await aluAnimation(result,false,false, 'A');
    check_completeExecution();
}

const incB = async() => {
    await description_update('Hole den Operanden');
    await transfer('B','ALU1',B.dec);
    await updateRegister_hex('ALU1', B.dec);
    await description_update('Erhöhe den Operanden um 1');
    const result = incBinary(B.dec);
    await aluAnimation(result,false,false, 'B');
    check_completeExecution();
}

const incC = async() => {
    await description_update('Hole den Operanden');
    await transfer('C','ALU1',C.dec);
    await updateRegister_hex('ALU1', C.dec);
    await description_update('Erhöhe den Operanden um 1');
    const result = incBinary(C.dec);
    await aluAnimation(result,false,false, 'C');
    check_completeExecution();
}

const incHl = async() =>{
    await description_update('Erhöhe die Adresse um 1');
    await addArrow('HL');
    await updateRegister_hex('HL', HL.dec+1);
    check_completeExecution();
}
//incIX see twoByteIx

const decA = async() => {
    await description_update('Hole den Operanden');
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Verringere den Operanden um 1');
    const result = decBinary(A.dec);
    await aluAnimation(result,false,false, 'A');
    check_completeExecution();
}

const decB = async() => {
    await description_update('Hole den Operanden');
    await transfer('B','ALU1',B.dec);
    await updateRegister_hex('ALU1', B.dec);
    await description_update('Verringere den Operanden um 1');
    const result = decBinary(B.dec);
    await aluAnimation(result,false,false, 'B');
    check_completeExecution();
}

const decC = async() => {
    await description_update('Hole den Operanden');
    await transfer('C','ALU1',C.dec);
    await updateRegister_hex('ALU1', C.dec);
    await description_update('Verringere den Operanden um 1');
    const result = decBinary(C.dec);
    await aluAnimation(result,false,false, 'C');
    check_completeExecution();
}

const decHl = async() => {
    await description_update('Verringere die Adresse um 1');
    await addArrow('HL');
    await updateRegister_hex('HL', HL.dec-1);
    check_completeExecution();
}

const addA = async() => {
    await loadOperands('A','A');
    await description_update('Addiere die Operanden');

    const result = addBinary(A.dec, A.dec, false);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const addB = async() => {
    await loadOperands('A','B');
    await description_update('Addiere die Operanden');

    const result = addBinary(A.dec, B.dec, false);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const addC = async() => {
    await loadOperands('A','C');
    await description_update('Addiere die Operanden');

    const result = addBinary(A.dec, C.dec, false);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const addDat_8 = async() => {
    await description_update('Hole den 1. Operator'); 
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Hole den 2. Operator');
    await readFromMemoryInRegister('PC','ALU2');
    await increasePC();
    await description_update('Addiere die Operanden');

    const result = addBinary(A.dec, ALU2.dec, false);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const addHlBc = async() => {
    await description_update('Hole das L-Register (HL_LO');
    await transfer('HL_lo','ALU1',HL.lo_dec);
    await updateRegister_hex('ALU1', HL.lo_dec);
    await description_update('Hole das C-Register');
    await transfer('C','ALU2',C.dec);
    await updateRegister_hex('ALU2', C.dec);
    await description_update('Addiere die Operanden');

    let result = addBinary(HL.lo_dec,C.dec,false);
    await hlBcAnimation(result,true);

    await description_update('Hole das H-Register (HL_HI');
    await transfer('HL_hi','ALU1',HL.hi_dec);
    await updateRegister_hex('ALU1', HL.hi_dec);
    await description_update('Hole das B-Register');
    await transfer('B','ALU2',B.dec);
    await updateRegister_hex('ALU2', B.dec);
    await description_update('Addiere die Operanden');
    result = addBinary(HL.hi_dec,B.dec+FLAGS.c_dec, false);
    await hlBcAnimation(result,false);

    check_completeExecution();
}

const subA = async() => {
    await loadOperands('A','A');
    await description_update('Subtrahiere die Operanden');

    const result = addBinary(A.dec, A.dec, true);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const subB = async() => {
    await loadOperands('A','B');
    await description_update('Subtrahiere die Operanden');

    const result = addBinary(A.dec, B.dec, true);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const subC = async() => {
    await loadOperands('A','C');
    await description_update('Subtrahiere die Operanden');

    const result = addBinary(A.dec, C.dec, true);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const subDat_8 = async() => {
    await description_update('Hole den 1. Operator'); 
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Hole den 2. Operator');
    await readFromMemoryInRegister('PC', 'ALU2');
    await increasePC();
    await description_update('Subtrahiere die Operanden');

    const result = addBinary(A.dec, ALU2.dec, true);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const andA = async() => {
    await loadOperands('A','A');
    await description_update('OP1 AND OP2');

    const result = andBinary(A.dec, A.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const andB = async() => {
    await loadOperands('A','B');
    await description_update('OP1 AND OP2');

    const result = andBinary(A.dec, B.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const andC = async() => {
    await loadOperands('A','C');
    await description_update('OP1 AND OP2');

    const result = andBinary(A.dec, C.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const andDat_8 = async() => {
    await description_update('Hole den 1. Operanden'); 
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Hole den 2. Operanden');
    await readFromMemoryInRegister('PC' ,'ALU2');
    await increasePC()
    await description_update('OP1 AND OP2');

    const result = andBinary(A.dec, ALU2.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const orA = async() => {
    await loadOperands('A','A');
    await description_update('OP1 OR OP2');

    const result = orBinary(ALU1.dec, ALU2.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const orB = async() => {
    await loadOperands('A','B');
    await description_update('OP1 OR OP2');

    const result = orBinary(ALU1.dec, ALU2.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const orC = async() => {
    await loadOperands('A','C');
    await description_update('OP1 OR OP2');

    const result = orBinary(ALU1.dec, ALU2.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const orDat_8 = async() => {
    await description_update('Hole den 1. Operanden'); 
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Hole den 2. Operanden');
    await readFromMemoryInRegister('PC' , 'ALU2');
    await increasePC();
    await description_update('OP1 OR OP2');

    const result = orBinary(ALU1.dec, ALU2.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const xorA = async() => {
    await loadOperands('A','A');
    await description_update('OP1 XOR OP2');

    const result = xorBinary(A.dec, A.dec);
    await aluAnimation(result,true,false , 'A');
    check_completeExecution();
}

const xorB = async() => {
    await loadOperands('A','B');
    await description_update('OP1 XOR OP2');

    const result = xorBinary(A.dec, B.dec);
    await aluAnimation(result,true,false , 'A');
    check_completeExecution();
}

const xorC = async() => {
    await loadOperands('A','C');
    await description_update('OP1 XOR OP2');

    const result = xorBinary(A.dec, C.dec);
    await aluAnimation(result,true,false , 'A');
    check_completeExecution();
}

const xorDat_8 = async() => {
    await description_update('Hole den 1. Operanden'); 
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Hole den 2. Operanden');
    await readFromMemoryInRegister('PC' , 'ALU2');
    await increasePC();
    await description_update('OP1 OR OP2');

    const result = xorBinary(ALU1.dec, ALU2.dec);
    await aluAnimation(result,true,false, 'A');
    check_completeExecution();
}

const twoByteShift = async() => {
    await description_update('Hole das 2. Byte des Befehls');
    await readFromMemoryInRegister('PC', 'IR');
    await increasePC();
    await description_update('Erkenne den Befehl');
    await add_yellow_background_for_IDLETIME(IR.DOM);
    

    if(IR.dec === 0b00100111){
        await addArrow('IR');
        assemblerCommand.textContent = 'SHL';
        if(!playStatus.noAnim)
            await sleepForIDLETIME();
        await description_update('Hole den Operanden');
        await transfer('A','ALU1',A.dec);
        await updateRegister_hex('ALU1', A.dec);
        await description_update('Schiebe Operanden nach links');
        const result = shlBinary(A.dec);
        await aluAnimation(result, false,false, 'A');
    }
    else if(IR.dec === 0b00111111){
        await addArrow('IR');
        assemblerCommand.textContent = 'SHR';
        if(!playStatus.noAnim)
            await sleepForIDLETIME();
        await description_update('Hole den Operanden');
        await transfer('A','ALU1',A.dec);
        await updateRegister_hex('ALU1', A.dec);
        await description_update('Schiebe Operanden nach rechts');
        const result = shrBinary(A.dec);
        await aluAnimation(result, false,false, 'A');
    }
    check_completeExecution();
}

const rcl = async() => {
    await description_update('Hole den Operanden');
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Rotiere Operand mit Carry-Flag nach links');
    const result = rclBinary(A.dec);
    await aluAnimation(result,false,true, 'A');
    check_completeExecution();
}

const rol = async() => {
    await description_update('Hole den Operanden');
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Rotiere Operand ohne Carry-Flag nach links');
    const result = rolBinary(A.dec);
    await aluAnimation(result,false,false, 'A');
    check_completeExecution();
}

const rcr = async() => {
    await description_update('Hole den Operanden');
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Rotiere Operand mit Carry-Flag nach rechts');
    const result = rcrBinary(A.dec);
    await aluAnimation(result,false,true, 'A');
    check_completeExecution();
}

const ror = async() => {
    await description_update('Hole den Operanden');
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Rotiere Operand ohne Carry-Flag nach rechts');
    const result = rorBinary(A.dec);
    await aluAnimation(result,false,false, 'A');
    check_completeExecution();
}

const cpA = async() => {
    await loadOperands('A','A');
    await description_update('Vergleiche die Operanden');

    const result = addBinary(A.dec, A.dec, true);
    await aluAnimation(result,true,false, false);
    check_completeExecution();
}

const cpB = async() => {
    await loadOperands('A','B');
    await description_update('Vergleiche die Operanden');

    const result = addBinary(A.dec, B.dec, true);
    await aluAnimation(result,true,false, false);
    check_completeExecution();
}

const cpC = async() => {
    await loadOperands('A','C');
    await description_update('Vergleiche die Operanden');

    const result = addBinary(A.dec, C.dec, true);
    await aluAnimation(result,true,false, false);
    check_completeExecution();
}

const cpDat_8 = async() => {
    await description_update('Hole den 1. Operanden'); 
    await transfer('A','ALU1',A.dec);
    await updateRegister_hex('ALU1', A.dec);
    await description_update('Hole den 2. Operanden');
    await readFromMemoryInRegister('PC' , 'ALU2');
    await increasePC();
    await description_update('Vergleiche die Operanden');

    const result = addBinary(A.dec, ALU2.dec, true);
    await aluAnimation(result,true,false, false);
    check_completeExecution();
}

const jpnzLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('zFlag');

    //jump
    if(FLAGS.z_dec === 0){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
        
    }
    check_completeExecution();
}

const jpzLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('zFlag');

    //jump
    if(FLAGS.z_dec === 1){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
    }
    check_completeExecution();
}

const jpncLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('cFlag');

    //jump
    if(FLAGS.c_dec === 0){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
    }
    check_completeExecution();
}

const jpcLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('cFlag');

    //jump
    if(FLAGS.c_dec === 1){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
    }
    check_completeExecution();
}

const jpnoLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('pFlag');

    //jump
    if(FLAGS.p_dec === 0){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
    }
    check_completeExecution();
}

const jpoLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('pFlag');

    //jump
    if(FLAGS.p_dec === 1){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
    }
    check_completeExecution();
}

const jpnsLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('sFlag');

    //jump
    if(FLAGS.s_dec === 0){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
    }
    check_completeExecution();
}

const jpsLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Prüfe die Sprungbedingung');
    await checkJumpAnimation('sFlag');

    //jump
    if(FLAGS.s_dec === 1){
        await description_update('Lade den Programmzähler');
        await addArrow('ZR');
        await transfer('ZR', 'PC', ZR.dec);
        updateRedRectangle(ZR.dec);
        await updateRegister_hex('PC', ZR.dec);
    }
    check_completeExecution();
}

const jpLabel = async() => {
    await loadAddressBytesInZr();
    await description_update('Lade den Programmzähler');
    await addArrow('ZR');
    await transfer('ZR', 'PC', ZR.dec);
    updateRedRectangle(ZR.dec);
    await updateRegister_hex('PC', ZR.dec);
    check_completeExecution();
}

const callLabel = async() => {
    await description_update('Hole das niederwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_lo');
    await increasePC();
    await description_update('Hole das höherwertige Adressbyte');
    await readFromMemoryInRegister('PC', 'ZR_hi');
    await increasePC();
    await description_update('Erhöhe den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec-1);
    await description_update('Schreibe das HI-Byte des PC');
    await writeToMemoryFromRegister('SP','PC_hi');
    await description_update('Erhöhe den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec-1);
    await description_update('Schreibe das LO-Byte des PC');
    await writeToMemoryFromRegister('SP','PC_lo');
    await description_update('Lade den Programmzähler');
    await addArrow('ZR');
    await transfer('ZR', 'PC', ZR.dec);
    await updateRegister_hex('PC', ZR.dec);
    check_completeExecution();
}

const ret = async() => {
    await description_update('Hole das niederwertige Adressbyte');
    await readFromMemoryInRegister('SP', 'ZR_lo');
    await description_update('Verringere den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec+1);
    await description_update('Hole das höherwertige Adressbyte');
    await readFromMemoryInRegister('SP', 'ZR_hi');
    await description_update('Verringere den Stackpointer um 1');
    await addArrow('SP');
    await updateRegister_hex('SP', SP.dec+1);
    await description_update('Lade den Programmzähler');
    await addArrow('ZR');
    await transfer('ZR', 'PC', ZR.dec);
    await updateRegister_hex('PC', ZR.dec);
    check_completeExecution();
}





let runningProgram = [get_next_command];

const run_program = async(currentTime) => {
    let i = 0;
    while(true){
        if(runningProgram[i] === undefined){
            return false;
        }
        try{
            await checkPlayPressed();
            await runningProgram[i]();
        }
        catch(e){
            if(!playStatus.stop){
                playStatus.setPause();
            }
                
            setButtonPressed();
            console.log('In catch:');
            console.error(e);
            return false;
        }
        i++;
    }
}

const init = () => {
    runningProgram = [get_next_command];

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
    FLAGS.updateDec(0,0,0,0);
    FLAGS.updateDOM();
    DECODER.resetDOM();
    DECODER.error = false;
    ALUOUT.DOM.textContent = '';
    ALU1.DOM.textContent = '';
    ALU2.DOM.textContent = '';

    try{
        movingObject.classList.remove('toggleGrid');
    }catch{}
    try{
        movingObject.classList.remove('toggleGrid');
    }catch{}

    stepNumber.textContent = '0';
    stepDescription.textContent = 'Prozessor angehalten';
    assemblerCommand.textContent = '';
    decDisplay.textContent = '';
    
    updateRedRectangle(convertHexToNumber(PC.dec));
}

/********************************** button functions ****************************** */
const play_DOM = document.getElementById('play');
const pause_DOM = document.getElementById('pause');
const stop_DOM = document.getElementById('stop');
const slow_DOM = document.getElementById('slow');
const fast_DOM = document.getElementById('fast');
const oneCommand_DOM = document.getElementById('oneCommand');
const singleStep_DOM = document.getElementById('singleStep');
const fullCommand_DOM = document.getElementById('fullCommand');

const setButtonPressed = () =>{

    if(playStatus.play){
        play_DOM.classList.add('buttonPressed');
    }else{
        try{
            play_DOM.classList.remove('buttonPressed');
        }catch{}
    }
    if(playStatus.pause){
        pause_DOM.classList.add('buttonPressed');
    }else{
        try{
            pause_DOM.classList.remove('buttonPressed');
        }catch{}
    }
    if(playStatus.stop){
        stop_DOM.classList.add('buttonPressed');
    }else{
        try{
            stop_DOM.classList.remove('buttonPressed');
        }catch{}
    }
    if(playStatus.rocketSpeed){
        fast_DOM.classList.add('buttonPressed');
        try{
            slow_DOM.classList.remove('buttonPressed');
        }catch{}
    }else{
        slow_DOM.classList.add('buttonPressed');
        try{
            fast_DOM.classList.remove('buttonPressed');
        }catch{}
    }
    if(playStatus.oneCommand){
        oneCommand_DOM.classList.add('buttonPressed');
    }else{
        try{
            oneCommand_DOM.classList.remove('buttonPressed');
        }catch{}
    }   
    if(playStatus.completeExe){
        fullCommand_DOM.classList.add('buttonPressed');
    }else{
        try{
            fullCommand_DOM.classList.remove('buttonPressed');
        }catch{}
    }
    if(playStatus.noAnim && !playStatus.completeExe){
        singleStep_DOM.classList.add('buttonPressed');
    }else{
        try{
            singleStep_DOM.classList.remove('buttonPressed');
        }catch{}
    }
}
setButtonPressed();
function play(){

    if(playStatus.stop){ //only when stop is pressed(init), the program will be started anew  
        playStatus.setPlay();
        run_program();
    }
    playStatus.setPlay();
    setButtonPressed();
    
}
function pause(){
    if(!playStatus.stop)
        playStatus.setPause();
    setButtonPressed();
}
function stopBtn(){
    playStatus.setStop();
    setButtonPressed();
    init();
}

function increaseSpeed(){
    if(ANIMATION_SPEED < 12){
        ANIMATION_SPEED += 1;
        IDLETIME -= 50;
        NOANIMATIONIDLETIME -= 5;
    }
    if(ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 6;
    if(ANIMATION_SPEED === 7)
        ANIMATION_SPEED = 12;
}

function decreaseSpeed(){
    if(ANIMATION_SPEED > 1){
        ANIMATION_SPEED -= 1;
        IDLETIME += 50;
        NOANIMATIONIDLETIME += 5;
    }
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
    setButtonPressed();
}

const snailSpeed_on = () => {
    playStatus.setSnailSpeed();
    setButtonPressed();
}
const runOneCommand = () => {
    if(playStatus.oneCommand){
        playStatus.oneCommand = false;
        setButtonPressed();      
    }else{
        playStatus.setOneCommand();
        setButtonPressed();
        // play();
    }
}
const runNextSingleStep = () => {
    playStatus.setNoAnimation();    
    setButtonPressed();
    play();
}

const runCompleteExecution = () => {
    playStatus.setCompleteExecution();
    setButtonPressed();
    play();
}

const toggleSettings = () => {
    settings.classList.toggle('toggleDisplay');
}
toggleSettings();

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

const openAssembler = () => {
    window.open('https://simonrusswurm.github.io/ASIM_Simulator/', '_blank');
}

const openInfo = () => {
    document.getElementById('info_hover').classList.toggle('toggleGrid');
}

/******************************* mc8_commands *********************************** */
//overflowflag = 1, parityflag = 2;
const mc8_commands_array = [
    
    movAdat_8_command   = new mc8_command('MOV A, dat_8', 0b00111110, 2, [0,0,0,0], movAdat_8),
    movBdat_8_command   = new mc8_command('MOV B, dat_8', 0b00000110, 2, [0,0,0,0], movBdat_8),
    movCdat_8_command   = new mc8_command('MOV C, dat_8', 0b00001110, 2, [0,0,0,0], movCdat_8),    

    twoByteIX_command   = new mc8_command('2-Byte Befehl', 0b11011101, 4, [0,0,0,0], twoByteIX),
    movHLdat_16_command = new mc8_command('MOV HL, dat_16', 0b00100001, 3, [0,0,0,0], movHLdat_16),
    movSPdat_16_command = new mc8_command('MOV SP, dat_16', 0b00110001, 3, [0,0,0,0], movSPdat_16),

    movAB_command   	= new mc8_command('MOV A, B', 0b01111000, 1, [0,0,0,0], movAB),
    movAC_command   	= new mc8_command('MOV A, C', 0b01111001, 1, [0,0,0,0], movAC),
    movBA_command   	= new mc8_command('MOV B, A', 0b01000111, 1, [0,0,0,0], movBA),
    movBC_command   	= new mc8_command('MOV B, C', 0b01000001, 1, [0,0,0,0], movBC),
    movCA_command   	= new mc8_command('MOV C, A', 0b01001111, 1, [0,0,0,0], movCA),
    movCB_command   	= new mc8_command('MOV C, B', 0b01001000, 1, [0,0,0,0], movCB),

    movALabel_command   = new mc8_command('MOV A, label', 0b00111010, 3, [0,0,0,0], movALabel),
    movLabelA_command   = new mc8_command('MOV label, A', 0b00110010, 3, [0,0,0,0], movLabelA),
    movHlLabel_command  = new mc8_command('MOV HL, label', 0b00101010, 3, [0,0,0,0], movHlLabel),
    movLabelHl_command  = new mc8_command('MOV label, HL', 0b00100010, 3, [0,0,0,0], movLabelHl),
    movAHl_command      = new mc8_command('MOV A, [HL]', 0b01111110, 1, [0,0,0,0], movAHl),
    movHlA_command      = new mc8_command('MOV [HL], A', 0b01110111, 1, [0,0,0,0], movHlA),

    push_command        = new mc8_command('PUSH', 0b11110101, 1, [0,0,0,0], push),
    pop_command         = new mc8_command('POP', 0b11110001, 1, [0,0,0,0], pop),
    inAport_command     = new mc8_command('IN A, port', 0b11011011, 2, [0,0,0,0], inA),
    outPortA_command    = new mc8_command('OUT port, A', 0b11010011, 2, [0,0,0,0], outA),

    incA_command        = new mc8_command('INC A', 0b00111100, 1, [0,1,1,1], incA),
    incB_command        = new mc8_command('INC B', 0b00000100, 1, [0,1,1,1], incB),
    incC_command        = new mc8_command('INC C', 0b00001100, 1, [0,1,1,1], incC),
    incHl_command       = new mc8_command('INC HL', 0b00100011, 1, [0,0,0,0], incHl),

    decA_command        = new mc8_command('DEC A', 0b00111101, 1, [0,1,1,1], decA),
    decB_command        = new mc8_command('DEC B', 0b00000101, 1, [0,1,1,1], decB),
    decC_command        = new mc8_command('DEC C', 0b00001101, 1, [0,1,1,1], decC),
    decHL_command       = new mc8_command('DEC HL', 0b00101011, 1, [0,0,0,0], decHl),

    addA_command        = new mc8_command('ADD A', 0b10000111, 1, [1,1,1,1], addA),
    addB_command        = new mc8_command('ADD B', 0b10000000, 1, [1,1,1,1], addB),
    addC_command        = new mc8_command('ADD C', 0b10000001, 1, [1,1,1,1], addC),
    addDat_8_command    = new mc8_command('ADD dat_8', 0b11000110, 2, [1,1,1,1], addDat_8),
    addHlBc_command     = new mc8_command('ADD HL, BC', 0b00001001, 1, [1,0,0,0], addHlBc),

    subA_command        = new mc8_command('SUB A', 0b10010111, 1, [1,1,1,1], subA),
    subB_command        = new mc8_command('SUB B', 0b10010000, 1, [1,1,1,1], subB),
    subC_command        = new mc8_command('SUB C', 0b10010001, 1, [1,1,1,1], subC),
    subDat_8_command    = new mc8_command('SUB dat_8', 0b11010110, 2, [1,1,1,1], subDat_8),     

    andA_command        = new mc8_command('AND A', 0b10100111, 1, [1,1,2,1], andA),
    andB_command        = new mc8_command('AND B', 0b10100000, 1, [1,1,2,1], andB),
    andC_command        = new mc8_command('AND C', 0b10100001, 1, [1,1,2,1], andC),
    andDat_8_command    = new mc8_command('AND dat_8', 0b11100110, 2, [1,1,2,1], andDat_8),
    
    orA_command         = new mc8_command('OR A', 0b10110111, 1, [1,1,2,1], orA),
    orB_command         = new mc8_command('OR B', 0b10110000, 1, [1,1,2,1], orB),
    orC_command         = new mc8_command('OR C', 0b10110001, 1, [1,1,2,1], orC),
    orDat_8_command     = new mc8_command('OR dat_8', 0b11110110, 2, [1,1,2,1], orDat_8),

    xorA_command        = new mc8_command('XOR A', 0b10101111, 1, [1,1,2,1], xorA),
    xorB_command        = new mc8_command('XOR B', 0b10101000, 1, [1,1,2,1], xorB),
    xorC_command        = new mc8_command('XOR C', 0b10101001, 1, [1,1,2,1], xorC),
    xorDat_8_command    = new mc8_command('XOR dat_8', 0b11101110, 2, [1,1,2,1], xorDat_8),

    twoByteShift_command= new mc8_command('2-Byte-Befehl', 0b11001011, 2, [1,1,2,1], twoByteShift),

    rcl_command         = new mc8_command('RCL', 0b00010111, 1, [1,0,0,0], rcl),
    rol_command         = new mc8_command('ROL', 0b00000111, 1, [1,0,0,0], rol),
    rcr_command         = new mc8_command('RCR', 0b00011111, 1, [1,0,0,0], rcr),
    ror_command         = new mc8_command('ROR', 0b00001111, 1, [1,0,0,0], ror),

    cpA_command         = new mc8_command('CP A', 0b10111111, 1, [1,1,1,1], cpA),
    cpB_command         = new mc8_command('CP B', 0b10111000, 1, [1,1,1,1], cpB),
    cpC_command         = new mc8_command('CP C', 0b10111001, 1, [1,1,1,1], cpC),
    cpDat_8_command     = new mc8_command('CP dat_8', 0b11111110 , 2, [1,1,1,1], cpDat_8),
    
    jpnzLabel_command   = new mc8_command('JPNZ label', 0b11000010, 3, [0,0,0,0], jpnzLabel),
    jpzLabel_command    = new mc8_command('JPZ label', 0b11001010, 3, [0,0,0,0], jpzLabel),

    jpncLabel_command   = new mc8_command('JPNC label', 0b11010010, 3, [0,0,0,0], jpncLabel),
    jpcLabel_command    = new mc8_command('JPC label', 0b11011010, 3, [0,0,0,0], jpcLabel),

    jpnoLabel_command   = new mc8_command('JPNO label', 0b11100010, 3, [0,0,0,0], jpnoLabel),
    jpoLabel_command    = new mc8_command('JPO label', 0b11101010, 3, [0,0,0,0], jpoLabel),

    jpnsLabel_command   = new mc8_command('JPNS label', 0b11110010, 3, [0,0,0,0], jpnsLabel),
    jpsLabel_command    = new mc8_command('JPS label', 0b11111010, 3, [0,0,0,0], jpsLabel),

    jpLabel_command     = new mc8_command('JP label', 0b11000011, 3, [0,0,0,0], jpLabel),

    callLabel_command   = new mc8_command('CALL label', 0b11001101, 3, [0,0,0,0], callLabel),
    ret_command         = new mc8_command('RET', 0b11001001, 3, [0,0,0,0], ret),

    nop_command         = new mc8_command('NOP', 0b00000000, 1, [0,0,0,0], nop),
    halt_command        = new mc8_command('HALT', 0b01110110, 1, [0,0,0,0], halt),


   


];
