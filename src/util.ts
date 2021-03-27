import { Player } from "./player";


export function selectAny(items:any){
    return items[Math.floor(Math.random() * items.length)];
}

export interface Ball{
    isValidDelivery:boolean;
    batsman:Player;
    runs:number;
    extra:{
        wide:boolean;
        noBall:boolean;
    };
    wicket:{
        bold:boolean;
        stumping:boolean;
        catchOut:boolean;
        runOut:boolean;
    }
}