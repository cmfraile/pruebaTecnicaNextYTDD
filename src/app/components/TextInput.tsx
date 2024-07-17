'use client'

import { ChangeEvent, CSSProperties } from "react";

import inputForm from '../styles/input.module.css';

interface textInputProps {
    amount:number ,
    value:string , onChange:(value:string) => void ,
    isSubmitable:() => boolean , onSubmit:() => void,
    deleteCallback:() => void
};

const TextInput = ({
    amount ,
    value,onChange:onChangeUncrafted,
    isSubmitable , onSubmit ,
    deleteCallback
}:textInputProps) => {

    const opacity = '0.3';
    const isSubmitableUI = ():CSSProperties => {
        return isSubmitable()
        ? { backgroundColor:`rgba(0,255,0,${opacity})`}
        : { backgroundColor:`rgba(255,0,0,${opacity})`}
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>) => { 
        e.preventDefault() ; onChangeUncrafted(e.target.value)
    };

    return(
        <form   className={`${inputForm.inputForm}`}
                action={onSubmit}>
            <input
                className={`form-control m-3`}
                style={isSubmitableUI()}
                value={value}
                onChange={onChange}
                type="text"/>
            <button
                type='button'
                disabled={amount == 0}
                onClick={deleteCallback}
                className={`btn btn-danger`}>{amount}</button>
        </form>
    )

}

export default TextInput