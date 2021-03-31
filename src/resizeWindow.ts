/**
 * The aspect ratio is defined with 50/32.
 */

const containerMC8_div: HTMLElement = document.getElementById('containerMC8_div')!;
const masterStyle_style: HTMLElement = document.getElementById('masterStyle_style')!;
const sectionsCountWidth = 50;
const sectionsCountHeight = 32;
const aspectRatio = sectionsCountWidth/sectionsCountHeight;
let lastRatio_number: number = Math.round(window.innerWidth / window.innerHeight * 100) / 100;

const getFontSizeStyle = (widthOrHight:number, multiplier: number):string => {

    return `p{font-size: ${widthOrHight / 100 * 1.2 * multiplier}px;}
    h1{font-size: ${widthOrHight / 100 * 1.4 * multiplier}px;}
    h2{font-size: ${widthOrHight / 100 * 3 * multiplier}px; letter-spacing: ${widthOrHight / 100 * 0.037 * multiplier}px;}
    h3{font-size: ${widthOrHight / 100 * 1 * multiplier}px;}
    h4{font-size: ${widthOrHight / 100 * 2.5 * multiplier}px;}
    .textareaFontSize{font-size: ${widthOrHight / 100 * 1.3 * multiplier}px;}
    .inputFontSize{font-size: ${widthOrHight / 100 * 3 * multiplier}px;}
    input.romElement{font-size: ${widthOrHight / 100 * 1.2 * multiplier}px;}`;
}
const getBorderRadiusStyle = (widthOrHight:number, multiplier: number):string => {
    const borderRadius = widthOrHight / 100 * 0.7 * multiplier;
    
    return `.borderBox{border-width: ${widthOrHight / 100 * 0.01 * multiplier}px;}
    .rounded{ border-radius: ${borderRadius}px;}
    .topLeft{border-top-left-radius: ${borderRadius}px;}
    .topRight{border-top-right-radius: ${borderRadius}px;}
    .bottomLeft{border-bottom-left-radius: ${borderRadius}px;}
    .bottomRight{border-bottom-right-radius: ${borderRadius}px;}
    .lightRounded{border-radius: ${borderRadius/2}px;}`;
}

export const resizeWindow = (firstTimeResizing_boolean: boolean): void => {
    const iH: number = window.innerHeight;
    const iW: number = window.innerWidth;
    const currentRatio: number = Math.round(iH / iW * 100) / 100;
    /**
     * The function only resizes the application when the screenRatio changes and the screen is larger than a certain width/hight.
    */
    if(!firstTimeResizing_boolean){
        if(currentRatio === lastRatio_number) return
        if(iH < 200) return
        if(iW < 400) return
    }

    lastRatio_number = currentRatio;

    /**
     * If the application fills the entire width of the screen, the size of the application must be calculated
     * using the width. And vice versa.
     */
    if (iH * sectionsCountWidth / sectionsCountHeight > iW) {
        containerMC8_div.style.width = `${iW}px`;
        containerMC8_div.style.height = `${iW/aspectRatio}px`;

        masterStyle_style.innerHTML = getFontSizeStyle(iW, 1) + getBorderRadiusStyle(iW, 1);
    } else {
        containerMC8_div.style.width = `${iH*aspectRatio}px`;
        containerMC8_div.style.height = `${iH}px`;
        
        masterStyle_style.innerHTML = getFontSizeStyle(iH, aspectRatio) + getBorderRadiusStyle(iH, aspectRatio);
    }

}