import { Over } from "./over";
import { Player } from "./player";


export class Team {
    score: number;
    wickets: number;
    overs: Over[];
    battingPlayers: Player[];
    baller: Player;
    extraRuns: number;

    constructor(public name: String, public players: Player[]) {
        this.score = 0;
        this.wickets = 0;
        this.overs = [];
        this.battingPlayers = new Array<Player>(2);
        this.baller = null;
        this.extraRuns = 0;
    }

    setBatsman(): void {
        let isWicket = false;
        this.battingPlayers = this.battingPlayers.filter((player: Player) => {
            if (player.isOut) {
                isWicket = true;
                this.wickets += 1;
            }
            return !player.isOut;
        });

        for (let index = 0; this.players.length; index++) {
            if (!this.players[index].isOut && !this.players[index].isBatting) {
                if (isWicket) {
                    this.players[index].isOnStrike = true;
                    console.log(`New batsman ${this.players[index].name} is on strick`);
                }
                this.players[index].isBatting = true;
                this.battingPlayers.push(this.players[index])
            }
            if (this.battingPlayers.length == 2) {
                break;
            }
        }
    }


    setBaller(overNumber: number): Player {
        let baller = this.players.filter(
            (players: Player) => players.type == 'ball'
        )

        let index = overNumber % baller.length;
        return this.baller = baller[index];


    }

    changeStrike() {
        if (this.battingPlayers.length !== 2) {
            this.setBatsman();
        }
        if (this.overs.length == 0) {
            this.battingPlayers[0].isOnStrike = true;
        } else {
            if (this.battingPlayers[0].isOnStrike) {
                this.battingPlayers[0].isOnStrike = false;
                if (this.wickets < 10) {
                    this.battingPlayers[1].isOnStrike = true;
                }
            } else {
                this.battingPlayers[0].isOnStrike = true;
                if (this.wickets < 10) {
                    this.battingPlayers[1].isOnStrike = false;
                }
            }
        }

    }

    getOnStrikeBatsman(): Player{
        return this.battingPlayers.find((player:Player) => player.isOnStrike);
    }

    printBattingCard(){
        console.log("team batting card");
        let summary = [];
        for(let i =0;i<this.players.length;i++){
            summary.push({
                Batsman: this.players[i].name,
                run: this.players[i].battingDetails.run,
                balls: this.players[i].battingDetails.ballPlayed,
                4: this.players[i].battingDetails.counter["4"],
                6: this.players[i].battingDetails.counter["6"],
            })
        }
        console.log(`${this.name} batting card:`);
        console.table(summary);
        this.printTeamScore();
    }

    printTeamScore(){
        console.log(`${this.name} Score: ${this.score} run with ${this.wickets} wicket lost in ${this.overs.length} overs`);
    }

    printBallingCard(){
        let summary =[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].type === "ball"){
                summary.push({
                    Baller: this.players[i].name,
                    ...this.players[i].ballingDetails,
                });
            }
        }
        console.log(`${this.name} balling card : `);
        console.table(summary);
    }
}