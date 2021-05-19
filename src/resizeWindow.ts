const containerMC8_div: HTMLElement = document.getElementById('containerMC8_div')!;
const masterStyle_style: HTMLElement = document.getElementById('masterStyle_style')!;
const sectionsCountWidth = 50;
const sectionsCountHeight = 32;
const aspectRatio = sectionsCountWidth/sectionsCountHeight;
let lastRatio_number: number = Math.round(window.innerWidth / window.innerHeight * 100) / 100;

export const resizeWindow = (firstTimeResizing: boolean): void => {
    
    if(isWindowToResize(firstTimeResizing))
        changeSizeOfApplicationContainer();
    return;

}

const isWindowToResize = (firstTimeResizing: boolean): boolean => {
    const iH: number = window.innerHeight;
    const iW: number = window.innerWidth;
    const currentRatio: number = Math.round(iH / iW * 100) / 100;

    if(firstTimeResizing) return true;
    if(currentRatio === lastRatio_number) return false;
    if(iH < 200) return false;
    if(iW < 400) return false;
    
    lastRatio_number = currentRatio;
    return true;
}

const changeSizeOfApplicationContainer = (): void => {
    const innerWindowHeight: number = window.innerHeight;
    const innerWindowWidth: number = window.innerWidth;

    if (calculateAppByWidth(innerWindowWidth, innerWindowHeight)){
        styleByWidth(innerWindowWidth);
    } else {
        styleByHeight(innerWindowHeight);
    }
}

const calculateAppByWidth = (windowWidth: number, windowHeight: number): boolean => windowWidth < windowHeight * aspectRatio;

const styleByWidth = (windowWidth: number): void => {
    containerMC8_div.style.width = `${windowWidth}px`;
    containerMC8_div.style.height = `${windowWidth/aspectRatio}px`;

    masterStyle_style.innerHTML = getFontSizeStyle(windowWidth, 1) + getBorderRadiusStyle(windowWidth, 1);
}

const styleByHeight = (windowHeight: number): void => {
    containerMC8_div.style.width = `${windowHeight*aspectRatio}px`;
    containerMC8_div.style.height = `${windowHeight}px`;
    
    masterStyle_style.innerHTML = getFontSizeStyle(windowHeight, aspectRatio) + getBorderRadiusStyle(windowHeight, aspectRatio);
}

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