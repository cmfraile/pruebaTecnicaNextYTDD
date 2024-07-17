'use client'

import { useState } from "react";
import TermList from '../../styles/termList.module.css'

interface termProps { term:string , deleteCallback:() => void }
const Term = ({ term , deleteCallback }:termProps) => {

    const [ onMouse , setOnMouse ] = useState<boolean>(false);

    return  <button 
                type="button"

                onMouseOver={() => setOnMouse(true)} 
                onMouseLeave={() => setOnMouse(false)}
                onClick={deleteCallback}
                
                className={`btn btn-${(onMouse) ? 'danger' : 'primary'} ${TermList.termButton}`}>
                { term }
            </button>

}

export default Term