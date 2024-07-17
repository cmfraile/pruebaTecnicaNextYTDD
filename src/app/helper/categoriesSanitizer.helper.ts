const rangeValues = {min:3,max:25};

const haveMoreThan3Characters = (value:string) => new RegExp(`^(?=.*[a-zA-Z]).{${rangeValues.min},}$`).test(value);
const rangeOfCharacters = (value:string) => new RegExp(`^(?!.{${rangeValues.max},}$).{${rangeValues.min},}$`).test(value);
const haveCoincidences = (value:string,index:number,array:string[]) =>
    array.map(x => x.toLowerCase()).indexOf(value.toLowerCase()) === index

const transforms = (value:string) =>
    `${value.substring(0,1).toUpperCase()}${value.substring(1,value.length).toLowerCase()}`.trim()

const valueFilters = (value:string) => (
    haveMoreThan3Characters(value) &&
    rangeOfCharacters(value)
) ? true : false ;

const valueIndexArrayFilters = (value:string,index:number,array:string[]) => (
    haveCoincidences(value,index,array)
) ? true : false ;

const categoriesSanitizer = (array:string[]) => 
    array
    .map(transforms)
    .filter(valueFilters)
    .filter(valueIndexArrayFilters)
    .sort()

export default categoriesSanitizer