'use client'

import TermList from "./components/termList/TermList";
import TextInput from "./components/TextInput";
import controllerHook from "./hooks/controllerHook.hook";

const Main = () => {

  const {

      textInput , setTextInput , inputIsSubmitable ,
      categories , deleteCategories ,
      submit

  } = controllerHook() ;

  return (
    <div className='container'><div className="row"><div className="col">
      <TextInput  amount={categories.length}
                  value={textInput}
                  onChange={setTextInput}
                  isSubmitable={inputIsSubmitable}
                  onSubmit={submit}
                  deleteCallback={() => deleteCategories('PURGE')}/>
    </div></div>
    <div className="row"><div className="col">
      <TermList categories={categories} deleteCategories={deleteCategories}/>
    </div></div>
    </div>
  )

}

export default Main;