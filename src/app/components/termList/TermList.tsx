'use client'

import Term from "./Term";
import termList from '../../styles/termList.module.css';

interface termListProps { categories:string[] , deleteCategories:(term:string) => void };
const TermList = ({categories,deleteCategories}:termListProps) => {

    const firstLetter = (term:string) => term.substring(0,1).toUpperCase();
    const putAddIndexButton = (term:string,arrayUncrafted:string[]):boolean => {
        const array =   arrayUncrafted
                        .filter(x => firstLetter(x) == firstLetter(term));
        return (array[0] == term) ? true : false ;
    }

    const AddIndexButton = ({term}:{term:string}) => {
        const amount = () => categories.filter(x => (firstLetter(x) == firstLetter(term))).length
        return <button
                    type="button"
                    className={`btn btn-danger ${termList.indexAndDeleteButton}`}
                    onClick={() => deleteCategories(firstLetter(term))}
                >
                {firstLetter(term)} : {amount()}</button>
    }

    return (
        <div className={`${termList.termList} my-5`}>
            { categories.map((x,i,z) =>
                <>
                {(putAddIndexButton(x,z)) && <AddIndexButton key={`${x}${i}`} term={x}/>}
                <Term key={`${i}${x}`} term={x} deleteCallback={() => deleteCategories(x)}/>
                </>
                ) }
        </div>
    )

}

export default TermList ;