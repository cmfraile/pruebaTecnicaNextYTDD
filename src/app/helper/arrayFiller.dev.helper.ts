import { useEffect } from "react";
import { random } from "underscore";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const termCrafter = ():string => {
    let term = '';
    for(let y = 1 ; y <= 10 ; y++){ term = `${term}${alphabet[random(0,20)]}` };
    return term;
};

export const arrayCrafter = (amountOfTerms:number) => {
    const array = [];
    for(let i = 1 ; i <= amountOfTerms ; i++){ array.push(termCrafter()) }
    return array
};

