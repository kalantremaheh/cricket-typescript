import { selectAny } from "./util";

export class Player{
    battingDetails:{
        run:number,
        ballPlayed:number,
        counter:{
            0:number,
            1:number,
            2:number,
            3:number,
            4:number,
            6:number,
        }
        wicketTakenBy: Player
    }

    ballingDetails:{
        wicket:number,
        over:number,
        run:number,
        miden:number
    };
    isOut:boolean;
    isOnStrike:boolean;
    isBatting:boolean;

    constructor(
        public name:String,
        public type: 'bat'|'ball',
        public battingStrength: (string|number)[] = [],
        public ballingStrength: string[] = []
    ){
        this.battingDetails = {
            run:0,
            ballPlayed:0,
            counter:{
                0:0,
                1:0,
                2:0,
                3:0,
                4:0,
                6:0,
            },
            wicketTakenBy:null
        }

        this.ballingDetails = {
            wicket:0,
            over:0,
            run:0,
            miden:0
        }

        this.isOut = false;
        this.isOnStrike = false;
        this.isBatting = false;

    }

    play(){
        return selectAny(this.battingStrength);
    }

    out(baller: Player){
        console.log(`-----------${this.name} is out by baller ${baller.name}--------`);
        this.battingDetails.ballPlayed += 1;
        this.battingDetails.wicketTakenBy = baller;
        this.isBatting = false;
        this.isOnStrike = false;
        this.isOut = true;
    }

    addCounter(run){
        this.battingDetails.counter[run] +=1;
        this.battingDetails.ballPlayed +=1;
        this.battingDetails.run += run;
    }

    addBallingCounter(regularBall: boolean =true,wicket: boolean =false){
        if(wicket){
            this.ballingDetails.wicket +=1;
        }
    }
}