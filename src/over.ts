import { Player } from "./player";
import { Team } from "./team";
import { Ball, selectAny } from "./util"
export class Over {
    maiden: boolean;
    details: Ball[];
    constructor(public baller: Player) {
        this.details = [];
        this.maiden = true;
    }

    getBalls() {
        return this.details.filter((ball) => ball.isValidDelivery).length;
    }

    private createBall(batsman: Player): Ball {
        return {
            isValidDelivery: true,
            batsman: batsman,
            runs: 0,
            extra: {
                wide: false,
                noBall: false
            },
            wicket: {
                bold: false,
                stumping: false,
                runOut: false,
                catchOut: false
            }

        }
    }

    deliverBallNew(batsman: Player, battingTeam: Team) {
        let ball = this.createBall(batsman);
    
        const result = batsman.play();
        const deliveryType = selectAny(this.baller.ballingStrength);
        console.log(`${this.baller.name} has balled a ${deliveryType} delivery.`);
    
        switch (deliveryType) {
          case "r":
            let isWicket = false;
            if (
              result === "runout" ||
              result === "catch" ||
              result === "bold" ||
              result === "stumping"
            ) {
              batsman.out(this.baller);
              isWicket = true;
              ball.wicket[result] = true;
              console.log(`${batsman.name} is out here by ${result}.`);
              battingTeam.setBatsman();
            } else {
              ball.runs = result;
              if (ball.runs === 1 || ball.runs === 3) {
                battingTeam.changeStrike();
              }
              console.log(`${batsman.name} has scored ${result} runs.`);
              batsman.addCounter(ball.runs);
              battingTeam.score += ball.runs;
              this.baller.ballingDetails.run += ball.runs;
              this.maiden = false;
            }
            this.baller.addBallingCounter(true, isWicket);
            break;
          case "wd":
            ball.isValidDelivery = false;
            ball.extra.wide = true;
            battingTeam.score += 1;
            this.baller.ballingDetails.run += 1;
            this.maiden = false;
            // TODO count teams extra runs
            break;
          case "nb":
            ball.isValidDelivery = false;
            ball.extra.noBall = true;
            this.baller.ballingDetails.run += 1;
            battingTeam.score += 1;
            this.maiden = false;
            if (result === "catch" || result === "bold") {
              batsman.addCounter(0);
              ball.wicket[result] = true;
            } else if (result === "runout" || result === "stumping") {
              ball.wicket[result] = true;
              batsman.out(selectAny([this.baller]));
              battingTeam.setBatsman();
              this.baller.addBallingCounter(false, true);
            } else {
              ball.runs = result;
              console.log(`${batsman.name} has scored ${result} runs on no ball.`);
              batsman.addCounter(ball.runs);
              battingTeam.score += ball.runs;
              this.baller.ballingDetails.run += ball.runs;
            }
        }
    
        this.details.push(ball);
      }

    deliverBall(batsman: Player, battingTeam: Team) {
        let ball = this.createBall(batsman);

        let result = batsman.play();
        let deliveryType = selectAny(this.baller.ballingStrength);
        console.log(`${this.baller.name} has ball a ${deliveryType} delivery`);

        switch (deliveryType) {
            case "r":
                let isWicket = false;
                if (result === 'runout' || result === 'catch' || result === 'bold' || result === 'stumping') {
                    batsman.out(this.baller);
                    isWicket = true;
                    ball.wicket[result] = true;
                    console.log(`${batsman.name} is out here by ${result}`);
                    battingTeam.setBatsman();

                   
             
                } else {
                    ball.runs = result;
                    if (ball.runs === 1 || ball.runs === 3) {
                        battingTeam.changeStrike();
                    }
                    console.log(`${batsman.name} has score ${result} runs.`);
                    batsman.addCounter(ball.runs);
                    battingTeam.score += ball.runs;
                    this.baller.ballingDetails.run += ball.runs;
                    this.maiden = false;
                }
                this.baller.addBallingCounter(true, isWicket);
                break;
            case "wd":
                ball.isValidDelivery = false;
                ball.extra.wide = true;
                battingTeam.score += 1;
                this.baller.ballingDetails.run += 1;
                this.maiden = false;
                break;
            case "nb":
                ball.isValidDelivery =false;
                ball.extra.noBall = true;
                battingTeam.score += 1;
                this.baller.ballingDetails.run += 1;
                this.maiden = false;
                
                if(result === "catch" || result == "bold"){
                    batsman.addCounter(0);
                    ball.wicket[result] = true;
                }else if(result === "runout" || result === "stumping"){
                    ball.wicket[result] =true;
                    batsman.out(selectAny([this.baller]));
                    battingTeam.setBatsman();
                    this.baller.addBallingCounter(false,true)
                }else{
                    ball.runs = result;
                    console.log(`${batsman.name} has scored ${result} runs on no ball.`);
                    batsman.addCounter(ball.runs);
                    battingTeam.score += ball.runs;
                    this.baller.ballingDetails.run += ball.runs;
                }
        }
        this.details.push(ball);
    }

    isCompleted(){
        return this.details.filter((ball) => ball.isValidDelivery).length === 6;
    }
}