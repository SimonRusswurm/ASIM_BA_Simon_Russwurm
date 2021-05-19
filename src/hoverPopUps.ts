/**
 * Note that the order of the html elements in index.html is important!
 */
import { getHtmlElement } from "./utils";
import { mc8Components } from "./components/Mc8Components";
import { convertHexToNumber, convertNumberTo8DigitsBinaryString, convertNumberToComplementOnTwo, convertNumberToHex_2digits, convertNumberToHex_4digits } from "./numberManipulations";


 const allH1Elements_h1: any = Array.from(document.getElementsByTagName('h1'));
 const allH3Elements_h3: any = Array.from(document.getElementsByTagName('h3'));
 export const controlButtons_button: any = Array.from(document.querySelectorAll('.button'));
 const hoverElements_htmlElements: any = allH1Elements_h1.concat(allH3Elements_h3).concat(controlButtons_button);
 const hoverPopUps_htmlElements: any = document.getElementsByClassName('hoverElement');
 const io1Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io1Address_textarea');
 const io2Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io2Address_textarea');
 const io3Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io3Address_textarea');
 
 const updateHoverElements = (): void => {
     getHtmlElement('ramStartAddressHex_p').textContent = convertNumberToHex_4digits(mc8Components.RAM.startAddress) + 'h';
     getHtmlElement('ramStartAddressDec_p').textContent = String(mc8Components.RAM.startAddress);
     getHtmlElement('ramEndAddressHex_p').textContent = convertNumberToHex_4digits(mc8Components.RAM.startAddress + 8192 - 1) + 'h';
     getHtmlElement('ramEndAddressDec_p').textContent = String(mc8Components.RAM.startAddress + 8192 - 1);
 
     const checkedRadioIoMap_input: any = document.querySelector('input[name="radioIoMap"]:checked');
     getHtmlElement('io1Map_p').textContent = checkedRadioIoMap_input.value;
     getHtmlElement('io1AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io1Address_textarea.value)) + 'h';
     getHtmlElement('io1ValueDec_p').textContent = mc8Components.IO1.value + ' (' + convertNumberToComplementOnTwo(mc8Components.IO1.value) + ')';
     getHtmlElement('io1ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(mc8Components.IO1.value);
 
     getHtmlElement('io2Map_p').textContent = checkedRadioIoMap_input.value;
     getHtmlElement('io2AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io2Address_textarea.value)) + 'h';
     getHtmlElement('io2ValueDec_p').textContent = mc8Components.IO2.value + ' (' + convertNumberToComplementOnTwo(mc8Components.IO2.value) + ')';
     getHtmlElement('io2ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(mc8Components.IO2.value);
 
     getHtmlElement('io3Map_p').textContent = checkedRadioIoMap_input.value;
     getHtmlElement('io3AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io3Address_textarea.value)) + 'h';
     getHtmlElement('io3ValueDec_p').textContent = mc8Components.IO3.value + ' (' + convertNumberToComplementOnTwo(mc8Components.IO3.value) + ')';
     getHtmlElement('io3ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(mc8Components.IO3.value);
 
     getHtmlElement('aHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.A.value + ' (' + convertNumberToComplementOnTwo(mc8Components.A.value) + ')';
     getHtmlElement('aHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(mc8Components.A.value);
 
     getHtmlElement('bHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.B.value + ' (' + convertNumberToComplementOnTwo(mc8Components.B.value) + ')';
     getHtmlElement('bHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(mc8Components.B.value);
 
     getHtmlElement('cHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.C.value + ' (' + convertNumberToComplementOnTwo(mc8Components.C.value) + ')';
     getHtmlElement('cHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(mc8Components.C.value);
 
     getHtmlElement('hlHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.HL.value;
     getHtmlElement('ixHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.IX.value;
     getHtmlElement('spHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.SP.value;
     getHtmlElement('pcHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.PC.value;
     getHtmlElement('zrHoverValueDec_p').textContent = 'Dezimal: ' + mc8Components.ZR.value;
 
     getHtmlElement('irHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(mc8Components.CONTROL_UNIT.IR.value);
 }
 
for (let i = 0; i < hoverElements_htmlElements.length; i++) {
     hoverElements_htmlElements[i].addEventListener('mouseover', function () {
         updateHoverElements();
         hoverPopUps_htmlElements[i].classList.add('displayGrid');
     });
     hoverElements_htmlElements[i].addEventListener('mouseleave', function () {
         hoverPopUps_htmlElements[i].classList.remove('displayGrid');
     });
 }