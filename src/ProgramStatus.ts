class ProgramStatus {
    play: boolean;
    pause: boolean;
    reset: boolean;

    singleSteps: boolean;
    animationType_1: boolean;
    animationType_2: boolean;
    noAnimation: boolean;
    
    settingsOpened: boolean;
    fullscreenOn: boolean;    
    ioInputDisplayed: boolean;
    romIsEdited: boolean;

    constructor() {
        this.play = false;
        this.pause = false;
        this.reset = true;

        this.singleSteps = false;
        this.animationType_1 = true;
        this.animationType_2 = false;
        this.noAnimation = false;

        this.settingsOpened = true;
        this.fullscreenOn = false;
        this.ioInputDisplayed = false;
        this.romIsEdited = false;
    }

    setPlay(): void {
        this.play = true;
        this.pause = false;
        this.reset = false;
    }

    setPause(): void {
        this.play = false;
        this.pause = true;
        this.reset = false;
    }

    setReset(): void {
        this.play = false;
        this.pause = false;
        this.reset = true;
    }

    setSingleSteps(): void {
        this.singleSteps = true;
    }

    resetSingleSteps(): void {
        this.singleSteps = false;
    }

    setNoAnimation(): void {
        this.animationType_1 = false;
        this.animationType_2 = false;
        this.noAnimation = true;
    }

    setAnimationType_1(): void {
        this.animationType_1 = true;
        this.animationType_2 = false;
        this.noAnimation = false;
    }

    setAnimationType_2(): void {
        this.animationType_1 = false;
        this.animationType_2 = true;
        this.noAnimation = false;
    }
}

export const programStatus = new ProgramStatus();