class ProgramStatus {
    play: boolean;
    pause: boolean;
    reset: boolean;

    singleSteps: boolean;
    animationType_1: boolean;
    animationType_2: boolean;
    noAnimation: boolean;

    transferSpeed: number;
    idleTime: number;
    
    settingsOpened: boolean;
    fullscreenOn: boolean;    
    ioInput: boolean;
    romIsEdited: boolean;

    constructor() {
        this.play = false;
        this.pause = false;
        this.reset = true;

        this.singleSteps = false;
        this.animationType_1 = true;
        this.animationType_2 = false;
        this.noAnimation = false;
        this.transferSpeed = 3;
        this.idleTime = 500;

        this.settingsOpened = true;
        this.fullscreenOn = false;
        this.ioInput = false;
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

    updateAnimationSpeed(speedValue: number): void{
        if (speedValue === 5)
            speedValue = 6;
        if (speedValue === 6)
            speedValue = 12;

        this.transferSpeed = speedValue;
        this.idleTime = 500 - this.transferSpeed*30;
    }
}

export const programStatus = new ProgramStatus();