import { resolve } from "path";
import { Over } from "./over";
import { Team } from "./team";


export class Match {
    tossWinner: Team;
    isSecondInningStarted: boolean = false;
    matchFinished: boolean = false;

    constructor(
        public teamA: Team,
        public teamB: Team,
        public totalOver: number
    ) { }

    toss() {
        this.tossWinner = this.teamA
        console.log(`${this.tossWinner.name} has won toss and elected to bat first`);
        return this.tossWinner;
    }

    async start() {
        if (this.tossWinner.name == this.teamA.name) {
            console.log(`First inning starting.`);
            await this.startInning(this.teamA, this.teamB);
            this.teamA.printBattingCard();
            this.teamB.printBallingCard();
            console.log(`First inning complated.`);
            console.log(`${this.teamB.name} need ${this.teamA.score +1} runs to win in ${this.totalOver}`);

            await new Promise((resolve) =>{
                setTimeout(resolve,5000);
            })
    
            console.log(`Second inning Starting.`);
    
            this.isSecondInningStarted = true;
            await this.startInning(this.teamB,this.teamA);
            this.teamB.printBattingCard();
            this.teamA.printBallingCard();
            console.log(`Second inning complated.`);
        }else{
            console.log(`First inning starting.`);
            await this.startInning(this.teamB, this.teamA);
            this.teamB.printBattingCard();
            this.teamA.printBallingCard();
            console.log(`First inning complated.`);
            console.log(`${this.teamA.name} need ${this.teamB.score +1} runs to win in ${this.totalOver}`);

            await new Promise((resolve) =>{
                setTimeout(resolve,5000);
            })

            console.log(`Second inning Starting.`);
    
            this.isSecondInningStarted = true;
            await this.startInning(this.teamA,this.teamB);
            this.teamA.printBattingCard();
            this.teamB.printBallingCard();
            console.log(`Second inning complated.`);

        }

     
    }

    async startInning(battingTeam: Team, fieldingTeam: Team) {
        return new Promise(async (resolve) => {
            while (battingTeam.overs.length < this.totalOver && battingTeam.wickets < 10 && !this.matchFinished) {
                await this.startOver(battingTeam, fieldingTeam, battingTeam.overs.length + 1);
            }
            resolve("");
        })
    }


    bowlOver(battingTeam: Team, fieldingTeam: Team, over: Over) {
        return new Promise((resolve) => {
            if (this.isSecondInningStarted && battingTeam.score > this.tossWinner.score) {
                this.matchFinished = true;
                return resolve("");
            }

            console.log(`--------------BALL ${over.getBalls() + 1}-------------------`)

            console.log(`${battingTeam.getOnStrikeBatsman().name} is on strike.`);;

            over.deliverBall(battingTeam.getOnStrikeBatsman(), battingTeam);

            if (!over.isCompleted() && battingTeam.battingPlayers.length === 2 && !this.matchFinished) {
                setTimeout(async () => {
                    resolve(await this.bowlOver(battingTeam, fieldingTeam, over))
                }, 1000)
            } else {
                if (over.maiden) {
                    over.baller.ballingDetails.miden += 1;
                }
                over.baller.ballingDetails.over += 1;
                resolve("");
            }
        })

    }


    startOver(battingTeam: Team, fieldingTeam: Team, overNumber: number) {
        return new Promise(async (resolve) => {
            fieldingTeam.setBaller(overNumber);
            console.log(
                `${fieldingTeam.baller.name} is going to ball over: ${overNumber} `
            );

            battingTeam.setBatsman();
            battingTeam.changeStrike();


            console.log(`
                ${battingTeam.battingPlayers[0].name} and ${battingTeam.battingPlayers[1].name} are on crise`
            );

            const over = new Over(fieldingTeam.baller);
            battingTeam.overs.push(over);
            console.log("===============================================================");
            await this.bowlOver(battingTeam, fieldingTeam, over);
            // console.log("===============================================================");

            resolve("");
        })  
    }

    printMatchResult(){
        if(this.tossWinner.name === this.teamA.name){
            if(this.teamA.score > this.teamB.score){
                console.log(
                    `${this.teamA.name} has won the match by ${this.teamA.score - this.teamB.score} runs`
                    );
            }else{
                console.log(`${this.teamB.name} has won the match by ${10 - this.teamB.wickets} wickets`)
            }
        }else{
            if(this.teamB.score > this.teamA.score){
                console.log(
                    `${this.teamB.name} has won the match by ${this.teamB.score - this.teamA.score} runs`
                    );
            }else{
                console.log(`${this.teamA.name} has won the match by ${10 - this.teamA.wickets} wickets`)
            }
        }
    }
}