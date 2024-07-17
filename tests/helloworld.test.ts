import { useState } from "react";
import { act, renderHook } from '@testing-library/react';

const helloHook = (initialState:string) => {
    const [ helloHook , setHelloHook ] = useState<string>(initialState);
    return ({helloHook,setHelloHook});
}

describe('Entorno de pruebas listo para usarse',() => {

    test('hola mundo',() => undefined);

    test('hola Hook',() => {

        const strings = {1:'hello',2:'bye'};
        const { result } = renderHook(() => helloHook(strings[1])) ; const getCurrent = () => result.current;

        expect( getCurrent().helloHook ).toBe(strings[1]);

        act(() => getCurrent().setHelloHook(strings[2]));
        expect( getCurrent().helloHook ).toBe(strings[2]);
    
    });

})