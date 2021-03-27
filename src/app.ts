import { Match } from "./match";
import { Player } from "./player";
import { Team } from "./team";



const battingStrength = [
    1,
    1,
    0,
    1,
    1,
    1,
    2,
    4,
    6,
    6,
    4,
    0,
    1,
    3,
    2,
    'catch',
    'bold',
    'runout',
    'stumping'
];

const ballingStrength = [
    'r',
    'r',
    'r',
    'r',
    'r',
    'r',
    'r',
    'r',
    'r',
    'r',
    'r',
    'r',
    'wd',
    'nd'
]

const indianPlayer = [
    'I1',
    'I2',
    'I3',
    'I4',
    'I5',
    'I6',
    'I7',
    'I8',
    'I9',
    'I10',
    'I11',
];

const englandPlayer = [
    'E1',
    'E2',
    'E3',
    'E4',
    'E5',
    'E6',
    'E7',
    'E8',
    'E9',
    'E10',
    'E11',
];



function createPlayers(playerNames: string[]): Player[] {
    if (playerNames.length !== 11) {
        throw new Error("Players should be 11");
    }
    const players = [];

    for (let index = 0; index < playerNames.length; index++) {
        if (index < 6) {
            players.push(
                new Player(playerNames[index], 'bat', battingStrength, ballingStrength)
            );
        } else {
            players.push(
                new Player(playerNames[index], 'ball', battingStrength, ballingStrength)
            );
        }
    }
    return players;
}

const indianPlayers = createPlayers(indianPlayer);
const englandPlayers = createPlayers(englandPlayer);

const india = new Team("india",indianPlayers);
const england = new Team("england",englandPlayers);
const over = 2;
const match = new Match(india,england,over);

const tossWinnerTeam = match.toss();
match.start().then(()=>{
    match.printMatchResult();
})

