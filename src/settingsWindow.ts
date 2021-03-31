import { calculateChecksum, checkValidHex, convertHexToNumber } from "./numberManipulations";
import {RAM,ROM,IO1,IO2,IO3, programStatus, reset} from './index';


const getHtmlElement = (id_string: string) => document.getElementById(id_string)!;


const containerSettings_div: any = getHtmlElement('containerSettings_div');
const programSelection_select: any = getHtmlElement('programSelection_select');
const linkerFile_textarea: any = getHtmlElement('linkerFile_textarea');
const radioIoMapped_input: any = getHtmlElement('radioIoMapped_input');
const radioMemoryMap_input: any = getHtmlElement('radioMemoryMap_input');

const io1Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io1Address_textarea');
const io2Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io2Address_textarea');
const io3Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io3Address_textarea');

const io1InputRadio_input: any = getHtmlElement('io1InputRadio_input');
const io2InputRadio_input: any = getHtmlElement('io2InputRadio_input');
const io3InputRadio_input: any = getHtmlElement('io3InputRadio_input');

const io1OutputRadio_input: any = getHtmlElement('io1OutputRadio_input');
const io2OutputRadio_input: any = getHtmlElement('io2OutputRadio_input');
const io3OutputRadio_input: any = getHtmlElement('io3OutputRadio_input');

const io1Arrow_div: any = getHtmlElement('io1Arrow_div');
const io2Arrow_div: any = getHtmlElement('io2Arrow_div');
const io3Arrow_div: any = getHtmlElement('io3Arrow_div');

const ramAddress_select: any = getHtmlElement('ramAddress_select');
const breakpointsCheckbox_input: any = getHtmlElement('breakpointsCheckbox_input');
const breakpointsCheckbox_div: any = getHtmlElement('breakpointsCheckbox_div');

const errorWindow_div = getHtmlElement('errorWindow_div');
const errorMessage_textarea = getHtmlElement('errorMessage_textarea');



const checkLinkerFile = (errorMessage_string: string, count_number: number): Array < any > => {
    const intelHexArray = linkerFile_textarea.value.split('\n');
    let noError = true;
    let recordLength = 0;

    for (let i = 0; i < intelHexArray.length; i++) {
        const record = intelHexArray[i].trim();
        if (record === '')
            continue;

        //check if line starts with :
        if (noError) {
            if (record[0] !== ':') {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}:\nJede Zeile muss mit einem : beginnen.\n\n`;
                count_number++;
                noError = false;
            }
        }

        //check if line includes whitespace
        if (noError) {
            if (record.includes(' ')) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}:\nEs dürfen keine Leerzeichen in einem Record vorhanden sein.\n\n`;
                count_number++;
                noError = false;
            }
        }

        //check record length
        if (noError) {
            if (!checkValidHex(record[1] + record[2])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordlänge ${record[1]+record[2]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            if (noError) {
                recordLength = convertHexToNumber(record[1] + record[2]);
                if (record.length < 1 + 2 + 4 + 2 + recordLength * 2 + 2) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordlänge ${record[1]+record[2]} stimmt nicht mit der Länge des Datensatzes überein.\n\n`;
                    count_number++;
                    noError = false;
                }
            }
        }
        //check record address
        if (noError) {
            if (!checkValidHex(record[3] + record[4] + record[5] + record[6])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordadresse ${record[3]+record[4]+record[5]+record[6]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            //TODO: check if bigger than 1999h ??
        }
        //check record type
        if (noError) {
            if (!checkValidHex(record[7] + record[8])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordtyp ${record[7]+record[8]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            //check if type is a data-record
            if (noError) {
                if (recordLength === 0 && convertHexToNumber(record[7] + record[8]) === 0) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordlänge ${record[1]+record[2]} muss für einen Daten-Recordtyp größer als null sein.\n\n`;
                    count_number++;
                    noError = false;
                }
            }
            if (noError) {
                if (convertHexToNumber(record[7] + record[8]) > 1) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Unbekannter Recordtyp ${record[7]+record[8]}.
                    \n\n`;
                    count_number++;
                    noError = false;
                }
            }
        }
        //check data
        if (noError) {
            recordLength = convertHexToNumber(record[1] + record[2]);
            for (let j = 0; j < recordLength * 2; j = j + 2) {
                if (!checkValidHex(record[9 + j] + record[10 + j])) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Datenbyte ${record[9+j]+record[10+j]} ist keine gültige HEX-Zahl.\n\n`;
                    count_number++;
                    noError = false;
                }
            }
        }
        //check checksum
        if (noError) {
            if (!checkValidHex(record[9 + recordLength * 2] + record[10 + recordLength * 2])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Checkumme ${record[9+recordLength*2]+record[10+recordLength*2]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            //TODO: check with new mc8assembler
            else if (calculateChecksum(record) !== '00') {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Checkumme ${record[9+recordLength*2]+record[10+recordLength*2]} ist nicht korrekt. Richtige Checksumme: ${calculateChecksum(record.slice(0, -2))}\n\n`
                noError = false;
            }
        }
    }
    return [errorMessage_string, count_number];
}
//checks if IOs and Ram were set correctly
const checkSettings = (): boolean => {
    let errorMessage_string = '';
    let count = 1;
    const buf = checkLinkerFile(errorMessage_string, count);
    errorMessage_string = buf[0];
    count = buf[1];


    if (io1Address_textarea.value === '')
        io1Address_textarea.value = '0000';
    if (io2Address_textarea.value === '')
        io2Address_textarea.value = '0000';
    if (io3Address_textarea.value === '')
        io3Address_textarea.value = '0000';

    //check if inputs are valid hex-numbers
    if (!checkValidHex(io1Address_textarea.value)) {
        errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 ist keine gültige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.
        \n\n`;
        count++;
    }
    if (!checkValidHex(io2Address_textarea.value)) {
        errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 ist keine gültige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.
        \n\n`;
        count++;
    }
    if (!checkValidHex(io3Address_textarea.value)) {
        errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 ist keine gültige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.
        \n\n`;
        count++;
    }

    //check if inputs reside on same address and are both inputs/outputs
    if ((convertHexToNumber(io1Address_textarea.value) === convertHexToNumber(io2Address_textarea.value)) && (io1InputRadio_input.checked === io2InputRadio_input.checked)) {
        errorMessage_string += `${count}) IO1 und IO2 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n`;
        count++;
    }
    if ((convertHexToNumber(io1Address_textarea.value) === convertHexToNumber(io3Address_textarea.value)) && (io1InputRadio_input.checked === io3InputRadio_input.checked)) {
        errorMessage_string += `${count}) IO1 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n`;
        count++;
    }
    if ((convertHexToNumber(io2Address_textarea.value) === convertHexToNumber(io3Address_textarea.value)) && (io2InputRadio_input.checked === io3InputRadio_input.checked)) {
        errorMessage_string += `${count}) IO2 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n`;
        count++;
    }


    if (radioIoMapped_input.checked) {
        //if io-mapped: check if inputs are to big
        if (convertHexToNumber(io1Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 ist zu groß. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 ist zu groß. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 ist zu groß. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n`;
            count++;
        }
    } else {
        //if memory-mapped: check if inputs are to big
        if (convertHexToNumber(io1Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 ist zu groß. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 ist zu groß. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 ist zu groß. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n`;
            count++;
        }

        //check if inputs reside on ram/rom address
        if (convertHexToNumber(io1Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n`;
            count++;
        }
        if (convertHexToNumber(io1Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io1Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io2Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io3Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            count++;
        }
    }

    if (errorMessage_string === '')
        return true;

    errorWindow_div.classList.add('displayGrid');
    errorMessage_textarea.textContent = errorMessage_string;
    return false;
};

const changeRamAddressOnDOM = (hex1_string: string, hex2_string: string): void => {
    const pEle = document.getElementsByClassName('RamAddressLabel');
    const str = ['0', '1', '2', '3', '4', '5', '6', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    RAM.startAddressRam_number = convertHexToNumber(hex1_string + '00');
    for (let i = 0; i < pEle.length; i++) {
        if (i < 7) {
            pEle[i].textContent = hex1_string + str[i] + 'x';
        } else if (i === 7) {

        } else {
            pEle[i].textContent = hex2_string + str[i - 1] + 'x';
        }
    }
}

const changeRamAddress = () => {
    switch (ramAddress_select.value) {
        case '2000':
            changeRamAddressOnDOM('20', '3F');
            break;
        case '4000':
            changeRamAddressOnDOM('40', '5F');
            break;
        case '6000':
            changeRamAddressOnDOM('60', '7F');
            break;
        case '8000':
            changeRamAddressOnDOM('80', '9F');
            break;
        case 'A000':
            changeRamAddressOnDOM('A0', 'BF');
            break;
        case 'C000':
            changeRamAddressOnDOM('C0', 'DF');
            break;
        case 'E000':
            changeRamAddressOnDOM('E0', 'FF');
            break;
        default:
            break;
    }
}

const setSettingsDependingOnProgram = (ioMapped_boolean: boolean, io1IN_boolean: boolean, io2IN_boolean: boolean, io3IN_boolean: boolean, io1AddressHex_string: string, io2AddressHex_string: string, io3AddressHex_string: string, ramStartingAddressHex_string: string): void => {

    if (ioMapped_boolean) {
        radioIoMapped_input.checked = true;
    } else {
        radioMemoryMap_input.checked = true;
    }
    if (io1IN_boolean) {
        io1InputRadio_input.checked = true;
        io1Arrow_div.classList.remove('ioArrowOUT');
    } else {
        io1OutputRadio_input.checked = true;
        io1Arrow_div.classList.add('ioArrowOUT');
    }
    if (io2IN_boolean) {
        io2InputRadio_input.checked = true;
        io2Arrow_div.classList.remove('ioArrowOUT');
    } else {
        io2OutputRadio_input.checked = true;
        io2Arrow_div.classList.add('ioArrowOUT');
    }
    if (io3IN_boolean) {
        io3InputRadio_input.checked = true;
        io3Arrow_div.classList.remove('ioArrowOUT');
    } else {
        io3OutputRadio_input.checked = true;
        io3Arrow_div.classList.add('ioArrowOUT');
    }

    io1Address_textarea.value = io1AddressHex_string;
    io2Address_textarea.value = io2AddressHex_string;
    io3Address_textarea.value = io3AddressHex_string;
    ramAddress_select.value = ramStartingAddressHex_string;

    //change textContent of the custom selection
    for (let i = 0; i < ramAddress_select.children.length; i++) {
        if (ramAddress_select.children[i].value === ramStartingAddressHex_string) {
            ramSelection_p.textContent = ramAddress_select.children[i].textContent;
        }
    }
    changeRamAddress();
}

const updateProgram = (): void => {
    switch (programSelection_select.value) {
        case 'own':
            linkerFile_textarea.value = 'Fügen Sie hier den Inhalt der vom Linker erzeugten .OBJ-Datei ein.\n(im Intel-HEX-Format)';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp1':
            linkerFile_textarea.value = ':0100000000ff\n:0100010000fe\n:0100020000fd\n:0100030000fc\n:0100040000fb\n:0100050000fa\n:0100060000f9\n:0100070000f8\n:0100080000f7\n:0100090000f6\n:01000a0000f5\n:01000b0000f4\n:01000c0000f3\n:01000d0000f2\n:01000e0000f1\n:01000f0000f0\n:0100100000ef\n:0100110000ee\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp2':
            linkerFile_textarea.value = ':010000003Cc3\n:010001003Cc2\n:010002003Cc1\n:0100030004f8\n:0100040004f7\n:010005000Cee\n:0100060023d6\n:010007008771\n:010008008770\n:010009008076\n:01000a008075\n:01000b008173\n:01000c008172\n:01000d003Db5\n:01000e003Db4\n:01000f0005eb\n:010010000De2\n:01001100905e\n:01001200905d\n:01001300915b\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp3':
            linkerFile_textarea.value = ':020000003E11af\n:020002000622d4\n:020004000E33b9\n:030006002155443d\n:01000900787e\n:01000a0041b4\n:01000b004Fa5\n:02000c003E664e\n:01000e0047aa\n:02000f003E773a\n:010011004F9f\n:020012003E8826\n:010014007675\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp4':
            linkerFile_textarea.value = ':04000000DD212211cb\n:02000400DD23fa\n:02000600DD23f8\n:02000800DD2Bee\n:03000a002144335b\n:01000d0023cf\n:01000e0023ce\n:03000f00310300ba\n:010012007677\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp5':
            linkerFile_textarea.value = ':020000003E11af\n:030002003200E0e9\n:0300050021332282\n:030008002201E0f2\n:04000b00DD2155445a\n:04000f00DD2203E00b\n:010013003Cb0\n:0100140023c8\n:02001500DD23e9\n:0100170047a1\n:030018003A00E0cb\n:03001b002A03E0d5\n:04001e00DD2A01E0f6\n:01e00000001f\n:01e00100001e\n:01e00200001d\n:01e00300001c\n:01e00400001b\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp6':
            linkerFile_textarea.value = ':020000003E12ae\n:030002002150E0aa\n:0100050047b3\n:03000600324FE096\n:01000900876f\n:01000a004Fa6\n:03000b003250E090\n:01000e00876a\n:01000f007779\n:030010003A4FE084\n:0100130047a5\n:030014003A50E07f\n:010017004F99\n:010018007E69\n:010019007670\n:01e04f0000d0\n:01e0500000cf\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp7':
            linkerFile_textarea.value = ':0300000031FFFFce\n:020003003EEEcf\n:020005000622d1\n:020007000E8861\n:010009008076\n:01000a00F500\n:01000b009163\n:01000c0047ac\n:01000d00F101\n:01000e008071\n:01000f00F5fb\n:01001000915e\n:0100110047a7\n:01001200F1fc\n:010013007676\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp8':
            linkerFile_textarea.value = ':020000003E0Cb4\n:0100020047b6\n:020003003EC0fd\n:010005004Fab\n:01000600A059\n:030007003200E0e4\n:01000a00797c\n:01000b00B044\n:03000c003201E0de\n:02000f003E179a\n:0100110047a7\n:020012003E713d\n:01001400A843\n:0100150047a3\n:02001600CB27f6\n:02001800CB27f4\n:02001a00CB27f2\n:01001c00786b\n:01001d0007db\n:01001e0007da\n:01001f0007d9\n:010020007867\n:0100210017c7\n:0100220017c6\n:0100230017c5\n:010024007665\n:01e00000001f\n:01e00100001e\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp9':
            linkerFile_textarea.value = ':020000003E20a0\n:020002000610e6\n:020004000E30bc\n:01000600BF3a\n:03000700CA0B0021\n:01000a003Cb9\n:01000b00B83c\n:03000c00F21000ef\n:01000f003Cb4\n:01001000B936\n:03001100FA1500dd\n:010014003Caf\n:010015008169\n:010016008762\n:03001700DA2300e9\n:01001a00875e\n:03001b00DA2300e5\n:01001e00875a\n:03001f00DA2300e1\n:010022008756\n:03002300C3000017\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp10':
            linkerFile_textarea.value = ':0300000031FFFFce\n:0300030021700069\n:010006007E7b\n:02000700D30321\n:0100090047af\n:01000a0023d2\n:02000b00DB0117\n:01000d004Fa3\n:01000e00B839\n:03000f00C2060026\n:010012007677\n:01007000008f\n:01007100107e\n:01007200206d\n:01007300305c\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, false, '01', '03', '05', 'E000');
            break;
        case 'bsp11':
            linkerFile_textarea.value = ':0300000031FFFFce\n:030003003A00A020\n:0100060047b2\n:03000700CD4000e9\n:03000a003A00A019\n:01000d00B83a\n:03000e00CA030022\n:020040003E037d\n:010042003D80\n:03004300C24200b6\n:01004600C9f0\n:01a00000005f\n:01a00100005e\n:00000001FF';
            setSettingsDependingOnProgram(false, true, false, true, 'A000', 'A001', 'A002', 'E000');
            break;
        case 'bsp12':
            linkerFile_textarea.value = ':0300000031FFFFce\n:020003000E7776\n:02000500DB011d\n:01000700B93f\n:03000800CA1A0011\n:03000b00D214000c\n:03000e00CD3200f0\n:03001100C3170012\n:03001400CD3B00e1\n:03001700C305001e\n:03001a00CD4400d2\n:03001d00C3170006\n:020032003E008e\n:02003400D303f4\n:020036003E99f1\n:02003800D305ee\n:01003a00C9fc\n:02003b003E0085\n:02003d00D305e9\n:02003f003E99e8\n:02004100D303e7\n:01004300C9f3\n:020044003E007c\n:02004600D305e0\n:020048003E0078\n:02004a00D303de\n:01004c00C9ea\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, false, '01', '03', '05', 'E000');
            break;
        case 'bsp13':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:02000300DB0020\n:0100050047b3\n:02000600DB011c\n:03000800CD100018\n:02000b00D3021e\n:03000d00C303002a\n:020010000E04dc\n:02001200CB27fa\n:010014000Dde\n:03001500C2120014\n:020018000E04d4\n:02001a00CB27f2\n:03001c00D22000ef\n:01001f008060\n:010020000Dd2\n:03002100C21A0000\n:01002400C912\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp14':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:02000300DB0020\n:020005000600f3\n:03000700CD0E001b\n:01000a00787d\n:02000b00D3021e\n:01000d00767c\n:01000e00F5fc\n:01000f003Db3\n:03001000CA16000d\n:03001300CD0E000f\n:01001600F1f8\n:010017008068\n:0100180047a0\n:01001900C91d\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp15':
            linkerFile_textarea.value = ':02000000DB0023\n:0300020032D007f2\n:02000500DB011d\n:0300070032D107ec\n:03000a00CDD60749\n:03000d003AD307dc\n:02001000D30219\n:03001200C3000028\n:0107d0000028\n:0107d1000027\n:0107d2000026\n:0107d3000025\n:0107d4000024\n:0107d5000023\n:0307d6003AD0070f\n:0107d90047d8\n:0307da003AD1070a\n:0107dd00809b\n:0307de0032D3070c\n:0107e100C94e\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp16':
            linkerFile_textarea.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007003A1600a6\n:01000a0047ae\n:03000b00211700ba\n:01000e007E73\n:02000f00D3021a\n:0100110023cb\n:0100120005e8\n:03001300C20E001a\n:0100160004e5\n:0100170007e1\n:010018000Dda\n:010019000Fd7\n:01001a00766f\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp17':
            linkerFile_textarea.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007002A1A00b2\n:01000a007E77\n:01000b0047ad\n:03000c002A1B00ac\n:01000f007E72\n:02001000D30219\n:0100120023ca\n:0100130005e7\n:03001400C20F0018\n:03001700C3000023\n:01001a0009dc\n:01001b0001e3\n:01001c0003e0\n:01001d0005dd\n:01001e0007da\n:01001f000Bd5\n:010020000Dd2\n:0100210011cd\n:0100220013ca\n:0100230017c5\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp18':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:020003000E02eb\n:02000500DB001e\n:03000700320020a4\n:01000a00797c\n:03000b00CD5000d5\n:02000e00DB0015\n:030010003201209a\n:03001300CD4400d9\n:030016003A02208b\n:02001900FE00e7\n:03001b00CA3100e7\n:02001e003EABf7\n:02002000D30209\n:010022007964\n:03002300CD5000bd\n:020026003E0199\n:02002800D30201\n:01002a00795c\n:03002b00CD5000b5\n:03002e00C3050007\n:020031003E7619\n:02003300D302f6\n:010035007951\n:03003600CD5000aa\n:020039003E2364\n:02003b00D302ee\n:01003d007949\n:03003e00CD5000a2\n:03004100C30500f4\n:030044003A00205f\n:010047004F69\n:030048003A01205a\n:01004b009123\n:03004c003202205d\n:01004f00C9e7\n:020050000605a3\n:0100520005a8\n:03005300C2520096\n:010056003D6c\n:03005700C2500094\n:01005a00C9dc\n:0120000000df\n:0120010000de\n:0120020000dd\n:0120030000dc\n:0120040000db\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp19':
            linkerFile_textarea.value = ':020000003E00c0\n:020002000600f6\n:03000400211500c3\n:020007000E0Ddc\n:010009007E78\n:01000a008075\n:01000b0047ad\n:01000c0023d0\n:01000d000De5\n:03000e00C2090024\n:010011007876\n:02001200D30019\n:010014007675\n:0100150001e9\n:0100160002e7\n:0100170001e7\n:0100180002e5\n:0100190001e5\n:01001a0001e4\n:01001b0001e3\n:01001c0001e2\n:01001d0002e0\n:01001e0002df\n:01001f0001df\n:0100200002dd\n:0100210001dd\n:00000001FF';
            setSettingsDependingOnProgram(true, false, false, true, '00', '01', '02', '2000');
            break;
        default:
            linkerFile_textarea.value = '';
            break;
    }
}

const updateIoClasses = (): void => {
    if (radioIoMapped_input.checked) {
        IO1.ioMapped_boolean = true;
        IO2.ioMapped_boolean = true;
        IO3.ioMapped_boolean = true;
        io1Address_textarea.maxLength = 2;
        io2Address_textarea.maxLength = 2;
        io3Address_textarea.maxLength = 2;
    } else {
        IO1.ioMapped_boolean = false;
        IO2.ioMapped_boolean = false;
        IO3.ioMapped_boolean = false;
        io1Address_textarea.maxLength = 4;
        io2Address_textarea.maxLength = 4;
        io3Address_textarea.maxLength = 4;
    }

    if (io1InputRadio_input.checked) {
        IO1.in_boolean = true;
        io1Arrow_div.classList.remove('ioArrowOUT');
    } else {
        IO1.in_boolean = false;
        io1Arrow_div.classList.add('ioArrowOUT');
    }

    if (io2InputRadio_input.checked) {
        IO2.in_boolean = true;
        io2Arrow_div.classList.remove('ioArrowOUT');
    } else {
        IO2.in_boolean = false;
        io2Arrow_div.classList.add('ioArrowOUT');
    }

    if (io3InputRadio_input.checked) {
        IO3.in_boolean = true;
        io3Arrow_div.classList.remove('ioArrowOUT');
    } else {
        IO3.in_boolean = false;
        io3Arrow_div.classList.add('ioArrowOUT');
    }

    IO1.address_number = convertHexToNumber(io1Address_textarea.value);
    IO2.address_number = convertHexToNumber(io2Address_textarea.value);
    IO3.address_number = convertHexToNumber(io3Address_textarea.value);
}

export const saveSettings = () => {
    if (checkSettings()) {
        updateIoClasses();
        reset(); //init
        ROM.update();
        RAM.reset();
        containerSettings_div.classList.remove('toggleDisplay');
        errorWindow_div.classList.remove('displayGrid');
        programStatus.settingsOpened = false;
    }
}

/**
 * Custom select to work on all browsers without any differences
 */
const ramSelect_div: HTMLElement = getHtmlElement('ramSelect_div');
const ramSelection_p: HTMLElement = getHtmlElement('ramSelection_p');
const ramSelectOptions_div: HTMLElement = getHtmlElement('ramSelectOptions_div');

const programSelection_div: HTMLElement = getHtmlElement('programSelection_div');
const programSelection_p: HTMLElement = getHtmlElement('programSelection_p');
const programSelectionOptions_div: HTMLElement = getHtmlElement('programSelectionOptions_div');

const ramOptions = ramSelectOptions_div.children;
const programOptions = programSelectionOptions_div.children;

ramSelect_div.addEventListener('click', function () {
    ramSelectOptions_div.classList.add('displayGrid');
});

programSelection_div.addEventListener('click', function () {
    programSelectionOptions_div.classList.add('displayGrid');
});

document.addEventListener('mouseup', function () {
    ramSelectOptions_div.classList.remove('displayGrid');
    programSelectionOptions_div.classList.remove('displayGrid');
});


for (let i = 0; i < ramOptions.length; i++) {
    ramOptions[i].addEventListener('click', function () {
        ramAddress_select.value = ramAddress_select.children[i].value;
        changeRamAddress();
        ramSelection_p.textContent = ramOptions[i].textContent;
        ramSelectOptions_div.classList.remove('displayGrid');
    });
}

for (let i = 0; i < programOptions.length; i++) {
    programOptions[i].addEventListener('click', function () {
        programSelection_select.value = programSelection_select.children[i].value;
        updateProgram();
        programSelection_p.textContent = programOptions[i].textContent;
        programSelectionOptions_div.classList.remove('displayGrid');
    });
}

/**
 * EventListeners for IO radio buttons
 */
radioIoMapped_input.addEventListener('change', updateIoClasses);
radioMemoryMap_input.addEventListener('change', updateIoClasses);

io1InputRadio_input.addEventListener('change', updateIoClasses);
io1OutputRadio_input.addEventListener('change', updateIoClasses);

io2InputRadio_input.addEventListener('change', updateIoClasses);
io2OutputRadio_input.addEventListener('change', updateIoClasses);

io3InputRadio_input.addEventListener('change', updateIoClasses);
io3OutputRadio_input.addEventListener('change', updateIoClasses);

breakpointsCheckbox_div.addEventListener('click', function () {
    breakpointsCheckbox_div.classList.toggle('breakpointsMark');
    if (breakpointsCheckbox_input.checked)
        breakpointsCheckbox_input.checked = false;
    else
        breakpointsCheckbox_input.checked = true;
});