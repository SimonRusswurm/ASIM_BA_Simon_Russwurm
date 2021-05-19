const getHtmlElement = (id: string) => document.getElementById(id)!;

class AnimationWindow {
    mc8_div: HTMLElement;
    sectionsCountWidth: number;
    sectionsCountHeight: number;     

    constructor(){
        this.mc8_div = getHtmlElement('mc8_div');
        this.sectionsCountWidth = 50;
        this.sectionsCountHeight = 32;
    }
}

export const animationWindow = new AnimationWindow();