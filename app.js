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
		this.dec_array = this.init_dec();
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
        	if(buf_string.length === 1) //if number is smaller than 10 -->Bsp(0F) 
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
		this.dec = 0;
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
let IO_DEC = document.getElementById('IO');
let settings = document.getElementById('settings');
let linkerFile = document.getElementById('linkerFile');
let commandSelect = document.getElementById('commandSelect');

const io1Adress = document.getElementById('io1Adress');
const io2Adress = document.getElementById('io2Adress');
const io3Adress = document.getElementById('io3Adress');

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
    document.getElementById('io1Adress_hex').textContent = io1Adress.value + 'h';
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

const a_h1 = document.getElementById('a');
a_h1.addEventListener('mouseover', function() {
    document.getElementById('a_dec').textContent = 'Decimal: ' + A.dec;
    document.getElementById('a_bin').textContent =  'Binär: ' + convertNumberToBinaery_2digits(A.dec);
    document.getElementById('a_hover').classList.toggle('toggleGrid');
});
a_h1.addEventListener('mouseleave', function() {
    document.getElementById('a_hover').classList.toggle('toggleGrid');
});

const b_h1 = document.getElementById('b');
b_h1.addEventListener('mouseover', function() {
    document.getElementById('b_dec').textContent = 'Decimal: ' + B.dec;
    document.getElementById('b_bin').textContent =  'Binär: ' + convertNumberToBinaery_2digits(B.dec);
    document.getElementById('b_hover').classList.toggle('toggleGrid');
});
b_h1.addEventListener('mouseleave', function() {
    document.getElementById('b_hover').classList.toggle('toggleGrid');
});

const c_h1 = document.getElementById('c');
c_h1.addEventListener('mouseover', function() {
    document.getElementById('c_dec').textContent = 'Decimal: ' + C.dec;
    document.getElementById('c_bin').textContent =  'Binär: ' + convertNumberToBinaery_2digits(C.dec);
    document.getElementById('c_hover').classList.toggle('toggleGrid');
});
c_h1.addEventListener('mouseleave', function() {
    document.getElementById('c_hover').classList.toggle('toggleGrid');
});

const hl_h1 = document.getElementById('hl');
hl_h1.addEventListener('mouseover', function() {
    document.getElementById('hl_dec').textContent = 'Decimal: ' + HL.dec;
    document.getElementById('hl_hover').classList.toggle('toggleGrid');
});
hl_h1.addEventListener('mouseleave', function() {
    document.getElementById('hl_hover').classList.toggle('toggleGrid');
});

const ix_h1 = document.getElementById('ix');
ix_h1.addEventListener('mouseover', function() {
    document.getElementById('ix_dec').textContent = 'Decimal: ' + IX.dec;
    document.getElementById('ix_hover').classList.toggle('toggleGrid');
});
ix_h1.addEventListener('mouseleave', function() {
    document.getElementById('ix_hover').classList.toggle('toggleGrid');
});

const sp_h1 = document.getElementById('sp');
sp_h1.addEventListener('mouseover', function() {
    document.getElementById('sp_dec').textContent = 'Decimal: ' + SP.dec;
    document.getElementById('sp_hover').classList.toggle('toggleGrid');
});
sp_h1.addEventListener('mouseleave', function() {
    document.getElementById('sp_hover').classList.toggle('toggleGrid');
});

const pc_h1 = document.getElementById('pc');
pc_h1.addEventListener('mouseover', function() {
    document.getElementById('pc_dec').textContent = 'Decimal: ' + PC.dec;
    document.getElementById('pc_hover').classList.toggle('toggleGrid');
});
pc_h1.addEventListener('mouseleave', function() {
    document.getElementById('pc_hover').classList.toggle('toggleGrid');
});

const zr_h1 = document.getElementById('zr');
zr_h1.addEventListener('mouseover', function() {
    document.getElementById('zr_dec').textContent = 'Decimal: ' + ZR.dec;
    document.getElementById('zr_hover').classList.toggle('toggleGrid');
});
zr_h1.addEventListener('mouseleave', function() {
    document.getElementById('zr_hover').classList.toggle('toggleGrid');
});

const ir_h1 = document.getElementById('ir');
ir_h1.addEventListener('mouseover', function() {
    document.getElementById('ir_bin').textContent =  'Binär: ' + convertNumberToBinaery_2digits(IR.dec);
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

const info = document.getElementById('info');
info.addEventListener('mouseover', function() {
    document.getElementById('info_hover').classList.toggle('toggleGrid');
});
info.addEventListener('mouseleave', function() {
    document.getElementById('info_hover').classList.toggle('toggleGrid');
});
 

/***************************************** settings functions *********************************/
commandSelect.addEventListener('input', function() {
    switch(commandSelect.value){
        case 'own':
            linkerFile.value = 'Fügen Sie hier den Inhalt der vom Linker erzeugten .OBJ-Datei ein.\n(im Intel-HEX-Format)';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'test':
            linkerFile.value = ':020000003E01BF\n:020002000602F4\n:020004003E03B9\n:020006000604EE\n:020008003E05B3\n:02000A000606E8\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp1':
            linkerFile.value = ':0100000000ff\n:0100010000fe\n:0100020000fd\n:0100030000fc\n:0100040000fb\n:0100050000fa\n:0100060000f9\n:0100070000f8\n:0100080000f7\n:0100090000f6\n:01000a0000d5\n:01000b0000d4\n:01000c0000d3\n:01000d0000d2\n:01000e0000d1\n:01000f0000d0\n:0100100000ef\n:0100110000ee\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp2':
            linkerFile.value = ':010000003Cc3\n:010001003Cc2\n:010002003Cc1\n:0100030004f8\n:0100040004f7\n:010005000Cee\n:0100060023d6\n:010007008771\n:010008008770\n:010009008076\n:01000a008055\n:01000b008153\n:01000c008152\n:01000d003D95\n:01000e003D94\n:01000f0005cb\n:010010000De2\n:01001100905e\n:01001200905d\n:01001300915b\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp3':
            linkerFile.value = ':020000003E11af\n:020002000622d4\n:020004000E33b9\n:030006002155443d\n:01000900787e\n:01000a004194\n:01000b004F85\n:02000c003E662e\n:01000e00478a\n:02000f003E771a\n:010011004F9f\n:020012003E8826\n:010014007675\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp4':
            linkerFile.value = ':04000000DD212211cb\n:02000400DD23fa\n:02000600DD23f8\n:02000800DD2Bee\n:03000a002144333b\n:01000d0023af\n:01000e0023ae\n:03000f003103009a\n:010012007677\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp5':
            linkerFile.value = ':020000003E11af\n:030002003200E0e9\n:0300050021332282\n:030008002201E0f2\n:04000b00DD2155443a\n:04000f00DD2203E0eb\n:010013003Cb0\n:0100140023c8\n:02001500DD23e9\n:0100170047a1\n:030018003A00E0cb\n:03001b002A03E0b5\n:04001e00DD2A01E0d6\n:01e00000001f\n:01e00100001e\n:01e00200001d\n:01e00300001c\n:01e00400001b\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp6':
            linkerFile.value = ':020000003E12ae\n:030002002150E0aa\n:0100050047b3\n:03000600324FE096\n:01000900876f\n:01000a004F86\n:03000b003250E070\n:01000e00874a\n:01000f007759\n:030010003A4FE084\n:0100130047a5\n:030014003A50E07f\n:010017004F99\n:010018007E69\n:010019007670\n:01e04f0000b0\n:01e0500000cf\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp7':
            linkerFile.value = ':0300000031FFFFce\n:020003003EEEcf\n:020005000622d1\n:020007000E8861\n:010009008076\n:01000a00F5e0\n:01000b009143\n:01000c00478c\n:01000d00F1e1\n:01000e008051\n:01000f00F5db\n:01001000915e\n:0100110047a7\n:01001200F1fc\n:010013007676\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp8':
            linkerFile.value = ':020000003E0Cb4\n:0100020047b6\n:020003003EC0fd\n:010005004Fab\n:01000600A059\n:030007003200E0e4\n:01000a00795c\n:01000b00B024\n:03000c003201E0be\n:02000f003E177a\n:0100110047a7\n:020012003E713d\n:01001400A843\n:0100150047a3\n:02001600CB27f6\n:02001800CB27f4\n:02001a00CB27d2\n:01001c00784b\n:01001d0007bb\n:01001e0007ba\n:01001f0007b9\n:010020007867\n:0100210017c7\n:0100220017c6\n:0100230017c5\n:010024007665\n:01e00000001f\n:01e00100001e\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','E000');
            break;
        case 'bsp9':
            linkerFile.value = ':020000003E20a0\n:020002000610e6\n:020004000E30bc\n:01000600BF3a\n:03000700CA0B0021\n:01000a003C99\n:01000b00B81c\n:03000c00F21000cf\n:01000f003C94\n:01001000B936\n:03001100FA1500dd\n:010014003Caf\n:010015008169\n:010016008762\n:03001700DA2300e9\n:01001a00873e\n:03001b00DA2300c5\n:01001e00873a\n:03001f00DA2300c1\n:010022008756\n:03002300C3000017\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,true,'0000','0001','0002','2000');
            break;
        case 'bsp10':
            linkerFile.value = ':0300000031FFFFce\n:0300030021700069\n:010006007E7b\n:02000700D30321\n:0100090047af\n:01000a0023b2\n:02000b00DB01f7\n:01000d004F83\n:01000e00B819\n:03000f00C2060006\n:010012007677\n:01007000008f\n:01007100107e\n:01007200206d\n:01007300305c\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,false,'0001','0003','0005','E000');
            break;
        case 'bsp11':
            linkerFile.value = ':0300000031FFFFce\n:030003003A00A020\n:0100060047b2\n:03000700CD4000e9\n:03000a003A00A0f9\n:01000d00B81a\n:03000e00CA030002\n:020040003E037d\n:010042003D80\n:03004300C24200b6\n:01004600C9f0\n:01a00000005f\n:01a00100005e\n:00000001FF';
            setSettingsDependingOnProgramm(false,true,false,true,'A000','A001','A002','E000');
            break;
        case 'bsp12':
            linkerFile.value = ':0300000031FFFFce\n:020003000E7776\n:02000500DB011d\n:01000700B93f\n:03000800CA1A0011\n:03000b00D21400ec\n:03000e00CD3200d0\n:03001100C3170012\n:03001400CD3B00e1\n:03001700C305001e\n:03001a00CD4400b2\n:03001d00C31700e6\n:020032003E008e\n:02003400D303f4\n:020036003E99f1\n:02003800D305ee\n:01003a00C9dc\n:02003b003E0065\n:02003d00D305c9\n:02003f003E99c8\n:02004100D303e7\n:01004300C9f3\n:020044003E007c\n:02004600D305e0\n:020048003E0078\n:02004a00D303be\n:01004c00C9ca\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,false,false,'0001','0003','0005','E000');
            break;
        case 'bsp13':
            linkerFile.value = ':0300000031FF3F8e\n:02000300DB0020\n:0100050047b3\n:02000600DB011c\n:03000800CD100018\n:02000b00D302fe\n:03000d00C303000a\n:020010000E04dc\n:02001200CB27fa\n:010014000Dde\n:03001500C2120014\n:020018000E04d4\n:02001a00CB27d2\n:03001c00D22000cf\n:01001f008040\n:010020000Dd2\n:03002100C21A0000\n:01002400C912\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp14':
            linkerFile.value = ':0300000031FF3F8e\n:02000300DB0020\n:020005000600f3\n:03000700CD0E001b\n:01000a00785d\n:02000b00D302fe\n:01000d00765c\n:01000e00F5dc\n:01000f003D93\n:03001000CA16000d\n:03001300CD0E000f\n:01001600F1f8\n:010017008068\n:0100180047a0\n:01001900C91d\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp15':
            linkerFile.value = ':02000000DB0023\n:0300020032D007f2\n:02000500DB011d\n:0300070032D107ec\n:03000a00CDD60729\n:03000d003AD307bc\n:02001000D30219\n:03001200C3000028\n:0107d0000028\n:0107d1000027\n:0107d2000026\n:0107d3000025\n:0107d4000024\n:0107d5000023\n:0307d6003AD0070f\n:0107d90047d8\n:0307da003AD107ea\n:0107dd00807b\n:0307de0032D307ec\n:0107e100C94e\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp16':
            linkerFile.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007003A1600a6\n:01000a00478e\n:03000b002117009a\n:01000e007E53\n:02000f00D302fa\n:0100110023cb\n:0100120005e8\n:03001300C20E001a\n:0100160004e5\n:0100170007e1\n:010018000Dda\n:010019000Fd7\n:01001a00764f\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp17':
            linkerFile.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007002A1A00b2\n:01000a007E57\n:01000b00478d\n:03000c002A1B008c\n:01000f007E52\n:02001000D30219\n:0100120023ca\n:0100130005e7\n:03001400C20F0018\n:03001700C3000023\n:01001a0009bc\n:01001b0001c3\n:01001c0003c0\n:01001d0005bd\n:01001e0007ba\n:01001f000Bb5\n:010020000Dd2\n:0100210011cd\n:0100220013ca\n:0100230017c5\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp18':
            linkerFile.value = ':0300000031FF3F8e\n:020003000E02eb\n:02000500DB001e\n:03000700320020a4\n:01000a00795c\n:03000b00CD5000b5\n:02000e00DB00f5\n:030010003201209a\n:03001300CD4400d9\n:030016003A02208b\n:02001900FE00e7\n:03001b00CA31007\n:02001e003EABd7\n:02002000D30209\n:010022007964\n:03002300CD5000bd\n:020026003E0199\n:02002800D30201\n:01002a00793c\n:03002b00CD500095\n:03002e00C30500e7\n:020031003E7619\n:02003300D302f6\n:010035007951\n:03003600CD5000aa\n:020039003E2364\n:02003b00D302ce\n:01003d007929\n:03003e00CD500082\n:03004100C30500f4\n:030044003A00205f\n:010047004F69\n:030048003A01205a\n:01004b009103\n:03004c003202203d\n:01004f00C9c7\n:020050000605a3\n:0100520005a8\n:03005300C2520096\n:010056003D6c\n:03005700C2500094\n:01005a00C9bc\n:0120000000df\n:0120010000de\n:0120020000dd\n:0120030000dc\n:0120040000db\n:00000001FF';
            setSettingsDependingOnProgramm(true,true,true,false,'0000','0001','0002','2000');
            break;
        case 'bsp19':
            linkerFile.value = ':020000003E00c0\n:020002000600f6\n:03000400211500c3\n:020007000E0Ddc\n:010009007E78\n:01000a008055\n:01000b00478d\n:01000c0023b0\n:01000d000Dc5\n:03000e00C2090004\n:010011007876\n:02001200D30019\n:010014007675\n:0100150001e9\n:0100160002e7\n:0100170001e7\n:0100180002e5\n:0100190001e5\n:01001a0001c4\n:01001b0001c3\n:01001c0001c2\n:01001d0002c0\n:01001e0002bf\n:01001f0001bf\n:0100200002dd\n:0100210001dd\n:00000001FF';
            setSettingsDependingOnProgramm(true,false,false,true,'0000','0001','0002','2000');
            break;
        default:
            linkerFile.value = '';
            break;

    }
})
const setIoInArrow = (arrowID_string) => {
    try{
        if(arrowID_string.includes(1)){
            document.getElementById('IO1In').checked = true;
        } else if(arrowID_string.includes(2)){
            document.getElementById('IO2In').checked = true;
        } else {
            document.getElementById('IO3In').checked = true;
        }
        document.getElementById(arrowID_string).classList.remove('ioArrowOUT');    
    }catch{}
}
const setIoOutArrow = (arrowID_string) => {
    document.getElementById(arrowID_string).classList.add('ioArrowOUT');
    if(arrowID_string.includes(1)){
        document.getElementById('IO1Out').checked = true;
    } else if(arrowID_string.includes(2)){
        document.getElementById('IO2Out').checked = true;
    } else {
        document.getElementById('IO3Out').checked = true;
    }
}

const setSettingsDependingOnProgramm = (IOmapped_boolean, io1IN_boolean, io2IN_boolean, io3IN_boolean, io1Adress_hex, io2Adress_hex, io3Adress_hex, RAMstartingAdress_hex) => {
    if(IOmapped_boolean){
        document.getElementById('radioIOmapped').checked = true;
    }
    else{
        document.getElementById('radioMemoryMap').checked = true;
    }
    if(io1IN_boolean){
        setIoInArrow('io1_arrow');
    } else {
        setIoOutArrow('io1_arrow');
    }
    if(io2IN_boolean){
        setIoInArrow('io2_arrow');
    } else {
        setIoOutArrow('io2_arrow');
    }
    if(io3IN_boolean){
        setIoInArrow('io3_arrow');
    } else {
        setIoOutArrow('io3_arrow');
    }
    io1Adress.value = io1Adress_hex;
    io2Adress.value = io2Adress_hex;
    io3Adress.value = io3Adress_hex;

    document.getElementById('adressRAM').value = RAMstartingAdress_hex;
    changeRamAdress();
}
let adressRAM = document.getElementById('adressRAM');
let startAdressRam_dec = 8192;
const changeRamAdress_DOM = (hex1_string, hex2_string) => {
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

const changeRamAdress = () => {
    switch (adressRAM.value) {
        case '2000':
            changeRamAdress_DOM('20', '3F');
            break;
        case '4000':
            changeRamAdress_DOM('40', '5F');
            break;
        case '6000':
            changeRamAdress_DOM('60', '7F');
            break;
        case '8000':
            changeRamAdress_DOM('80', '9F');
            break;
        case 'A000':
            changeRamAdress_DOM('A0', 'BF');  
            break;
        case 'C000':
            changeRamAdress_DOM('C0', 'DF');
            break;
        case 'E000':
            changeRamAdress_DOM('E0', 'FF');
            break;
        default:
            break;
    }
}
adressRAM.addEventListener('input', changeRamAdress);

// *****************************IO radioButton changes*****************************
const IO1In = document.getElementById('IO1In');
const IO1Out = document.getElementById('IO1Out');
const IO1_arrow = document.getElementById('io1_arrow');
IO1In.addEventListener('change', function(){
    try{
        IO1_arrow.classList.remove('ioArrowOUT');
    }catch{

    }
});
IO1Out.addEventListener('change', function(){
    IO1_arrow.classList.add('ioArrowOUT');
});

const IO2In = document.getElementById('IO2In');
const IO2Out = document.getElementById('IO2Out');
const IO2_arrow = document.getElementById('io2_arrow');
IO2In.addEventListener('input', function(){
    try{
        IO2_arrow.classList.remove('ioArrowOUT');
    }catch{

    }
});
IO2Out.addEventListener('input', function(){
    IO2_arrow.classList.add('ioArrowOUT');
});

const IO3In = document.getElementById('IO3In');
const IO3Out = document.getElementById('IO3Out');
const IO3_arrow = document.getElementById('io3_arrow');
IO3In.addEventListener('input', function(){
    try{
        IO3_arrow.classList.remove('ioArrowOUT');
    }catch{

    }
});
IO3Out.addEventListener('input', function(){
    IO3_arrow.classList.add('ioArrowOUT');
});
// *****************************errorWindow*****************************
const errorWindow = document.getElementById('errorWindow');
const errorMessage = document.getElementById('errorMessage');
const checkSettings = () => {
    if((convertHexToInt(io1Adress.value) === convertHexToInt(io2Adress.value)) && (IO1In.checked === IO2In.checked)){
        errorMessage.textContent =  'IO1 und IO2 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.';
        errorWindow.classList.add('toggleGrid');
        return false;
    }else if((convertHexToInt(io1Adress.value) === convertHexToInt(io3Adress.value)) && (IO1In.checked === IO3In.checked)){
        errorMessage.textContent =  'IO1 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.';
        errorWindow.classList.add('toggleGrid');
        return false;
    }else if((convertHexToInt(io2Adress.value) === convertHexToInt(io3Adress.value)) && (IO2In.checked === IO3In.checked)){
        errorMessage.textContent =  'IO2 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.';
        errorWindow.classList.add('toggleGrid');
        return false;
    }
    if(document.getElementById('radioMemoryMap').checked){ //meomory-mapped
        if(convertHexToInt(io1Adress.value) < convertHexToInt('2000')){
            errorMessage.textContent =  `Die Adresse ${io1Adress.value}h von IO1 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToInt(io2Adress.value) < convertHexToInt('2000')){
            errorMessage.textContent =  `Die Adresse ${io2Adress.value}h von IO2 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToInt(io3Adress.value) < convertHexToInt('2000')){
            errorMessage.textContent =  `Die Adresse ${io3Adress.value}h von IO3 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        }

        if(convertHexToInt(io1Adress.value) >= startAdressRam_dec && convertHexToInt(io1Adress.value) < (startAdressRam_dec+ 8192)){
            errorMessage.textContent =  `Die Adresse ${io1Adress.value}h von IO1 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToInt(io2Adress.value) >= startAdressRam_dec && convertHexToInt(io2Adress.value) < (startAdressRam_dec+ 8192)){
            errorMessage.textContent =  `Die Adresse ${io2Adress.value}h von IO2 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        } else if(convertHexToInt(io3Adress.value) >= startAdressRam_dec && convertHexToInt(io3Adress.value) < (startAdressRam_dec+ 8192)){
            errorMessage.textContent =  `Die Adresse ${io3Adress.value}h von IO3 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            errorWindow.classList.add('toggleGrid');
            return false;
        }
    }
    return true;
};
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

const convertNumberToBinaery_2digits = (number_dec) => {
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
    let check = false;
    while(true){
        if(playStatus.pause){
            check = true
            console.log('waiting for userinput');
            await Sleep(100);
        } else {
            return check;
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
            setButtonPressed();
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
                if(playStatus.noAnim){      //noAnim
                    movingObject.aDiv.remove();
                    movingObject = 0;
                    return true;
                }
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
        if(await pausePressed()){
            if(playStatus.play)
                await Sleep(150);
        }
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
            if(await pausePressed()){
                if(playStatus.play)
                    await Sleep(150);
            }
            registerArrow.classList.remove('PC_arrow');
        }
        else if(register_string === 'IR'){
            irArrow.classList.add('ir_arrow');
            await Sleep_Waittime();
            if(await pausePressed()){
                if(playStatus.play)
                    await Sleep(150);
            }
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

const dec_display = document.getElementById('dec_display');
const updateDEC = async(DECValue_string) => {
    switch (DECValue_string) {
        case 'readROM':
            WR.textContent = '1';
            RD.textContent = '0';
            M.textContent = '0';
            IO_DEC.textContent = '1';
            dec_display.textContent = 'Lese von Rom';
            break;
        
        case 'readRAM':
            WR.textContent = '1';
            RD.textContent = '0';
            M.textContent = '0';
            IO_DEC.textContent = '1';
            dec_display.textContent = 'Lese von Ram';
            break;

        case 'writeRAM':
            WR.textContent = '0';
            RD.textContent = '1';
            M.textContent = '0';
            IO_DEC.textContent = '1';
            dec_display.textContent = 'Schreibe auf Ram';
            break;
        
        case 'readIO1':
            WR.textContent = '1';
            RD.textContent = '0';
            M.textContent = '1';
            IO_DEC.textContent = '0';
            dec_display.textContent = 'Lese von IO1';
            break;

        case 'readIO2':
            WR.textContent = '1';
            RD.textContent = '0';
            M.textContent = '1';
            IO_DEC.textContent = '0';
            dec_display.textContent = 'Lese von IO2';
            break;

        case 'readIO3':
                WR.textContent = '1';
                RD.textContent = '0';
                M.textContent = '1';
                IO_DEC.textContent = '0';
                dec_display.textContent = 'Lese von IO3';
                break;
        
        case 'writeIO1':
            WR.textContent = '0';
            RD.textContent = '1';
            M.textContent = '1';
            IO_DEC.textContent = '0';
            dec_display.textContent = 'Schreibe auf IO1';
            break;
        
        case 'writeIO2':
            WR.textContent = '0';
            RD.textContent = '1';
            M.textContent = '1';
            IO_DEC.textContent = '0';
            dec_display.textContent = 'Schreibe auf IO2';
            break;

        case 'writeIO3':
            WR.textContent = '0';
            RD.textContent = '1';
            M.textContent = '1';
            IO_DEC.textContent = '0';
            dec_display.textContent = 'Schreibe auf IO3';
            break;
    
        default:
            WR.textContent = '0';
            RD.textContent = '0';
            M.textContent = '0';
            IO_DEC.textContent = '0';
            dec_display.textContent = '';
            break;
    }
}


/********************************** composite animations ****************************** */

const get_next_command = async() => {
    stepNumber.textContent = '0';
    assemblerCommand.textContent = '';
    const romEle = getRomElement();
    
    await description_update('Hole nächsten Befehl');
    await addArrow('PC');
    await updateDEC('readROM');
    await transfer('PC', 'ROM2');
    await transfer(romEle.id, "SW");
    await updateDEC();
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
    await updateDEC('readROM');
    await transfer('PC', 'ROM2');
    await transfer(romEle.id, 'A');
    await updateDEC();
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
    await updateDEC('readROM');
    await transfer('PC', 'ROM2');
    await transfer(romEle.id, 'B');
    await updateDEC();
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
        if(runningProgramm[i] === undefined){
            return false;
        }
        try{
            await runningProgramm[i]();
        }
        catch(e){
            if(!playStatus.stop)
                playStatus.setPause();
            setButtonPressed();
            console.log('In catch:');
            console.log(e);
            return false;
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
    IO_DEC.textContent = '0';

    stepNumber.textContent = '0';
    stepDescription.textContent = 'Prozessor angehalten';
    assemblerCommand.textContent = '';
    
    updateRedRectangle(convertHexToInt(PC.dec));
}

/********************************** button functions ****************************** */
const play_DOM = document.getElementById('play');
const pause_DOM = document.getElementById('pause');
const stop_DOM = document.getElementById('stop');
const slow_DOM = document.getElementById('slow');
const fast_DOM = document.getElementById('fast');
const singlestep_DOM = document.getElementById('singlestep');
const fullcomand_DOM = document.getElementById('fullcomand');

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
    if(playStatus.completeExe){
        fullcomand_DOM.classList.add('buttonPressed');
    }else{
        try{
            fullcomand_DOM.classList.remove('buttonPressed');
        }catch{}
    }
    if(playStatus.noAnim && !playStatus.completeExe){
        singlestep_DOM.classList.add('buttonPressed');
    }else{
        try{
            singlestep_DOM.classList.remove('buttonPressed');
        }catch{}
    } 
}
setButtonPressed();
function play(){

    if(playStatus.stop){ //only when stop is pressed(init), the programm will be started anew  
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
    setButtonPressed();
}

const snailSpeed_on = () => {
    playStatus.setSnailSpeed();
    setButtonPressed();
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
    if (checkSettings()) {
        stopBtn(); //init
        ROM.update();
        updateRedRectangle(0);
        toggleSettings();
        errorWindow.classList.remove('toggleGrid');
    }
    
}

const openAssembler = () => {
    window.open('https://simonrusswurm.github.io/ASIM_Simulator/', '_blank');
}

const openInfo = () => {
    
}

/******************************* mc8_commands *********************************** */
const mc8_commands_array = [
    movAdat_8_command = new mc8_command('MOV A, dat_8', 62, '3E', 2, [0,0,0,0], movAdat_8),
    movBdat_8_command = new mc8_command('MOV B, dat_8',  6, '06', 2, [0,0,0,0], movBdat_8)

];