'use client'

import { useState } from "react";
import categoriesSanitizer from "../helper/categoriesSanitizer.helper";
import { arrayCrafter } from "../helper/arrayFiller.dev.helper";

const controllerHook = () => {

    const [ textInput , setTextInputUncrafted ] = useState<string>(
        (false)
        ? arrayCrafter(1000).join(',')
        : ''
    );
    const [ categories , setCategoriesUncrafted ] = useState<string[]>([]);

    const setTextInput = (value:string) => {
        const filter = (value:string) => 
            value.split('').filter(x => RegExp(/^[a-zA-Z0-9, ]+$/).test(x)).join('');
        setTextInputUncrafted(filter(value));
    };

    const getSubmitBundle = () => categoriesSanitizer([ ...categories , ...textInput.split(',') ]);
    const inputIsSubmitable = ():boolean => {
        const valueToSubmit = getSubmitBundle();
        return ( JSON.stringify(valueToSubmit) == JSON.stringify(categories) ) ? false : true ;
    };
    const deleteCategories = (term:string|'PURGE') => {

        if(term == 'PURGE'){ setCategoriesUncrafted([]) };

        if(
                term.length == 1
            &&  term.toUpperCase() == term
        ){
            setCategoriesUncrafted( categories => categories.filter(x => x.substring(0,1) !== term) )
            return ;
        }

        if( term.length > 1 ){
            setCategoriesUncrafted( categories => categories.filter(x => x.toLowerCase() !== term.toLowerCase()) );
            return ;
        }

    }

    const submit = () => {
        if(!inputIsSubmitable()){return};
        setCategoriesUncrafted(getSubmitBundle());
        setTextInputUncrafted('');
    };

    return({
        textInput , setTextInput , inputIsSubmitable ,
        categories , deleteCategories ,
        submit
    })

}

export default controllerHook