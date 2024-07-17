import { renderHook , act } from "@testing-library/react";
import controllerHook from "@/app/hooks/controllerHook.hook";
import categoriesSanitizer from "@/app/helper/categoriesSanitizer.helper";

describe('controllerHook',() => {

    test('estado inicial',() => {

        const { result } = renderHook(controllerHook) ; const getCurrent = () => result.current ;
        expect( getCurrent().textInput ).toBe('');
        expect( getCurrent().categories ).toStrictEqual([]);

    });

    test('el setTextInput ( input onChange ) , solo permite carácteres alfanuméricos y comas',() => {

        const stringsToCheck = { 1:'Lorem>,Ipsum=,Dolor,123,%' , 2:'Lorem,Ipsum,Dolor,123,' };

        const { result } = renderHook(controllerHook) ; const getCurrent = () => result.current ;
        act(() => getCurrent().setTextInput(stringsToCheck[1]));
        expect( getCurrent().textInput ).toBe(stringsToCheck[2]);

    });

    describe('inputIsSubmitable',() => {

        const toAdd:string[] = ['lorem','ipsum','dolor','aemet'] ;

        test('Ejemplo positivo',() => {

            const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;
            const strings = { 1:toAdd.slice(0,3).join(',') , 2:toAdd[3] };

            act(() => getCurrent().setTextInput( strings[1] )) ; act(() => getCurrent().submit()) ;
            act(() => getCurrent().setTextInput( strings[2] )) ;

            expect( getCurrent().inputIsSubmitable() ).toBe(true);

        });

        test('ejemplo negativo',() => {

            const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;
            const strings = { 1:toAdd.slice(0,3).join(',') , 2:toAdd[2] };

            act(() => getCurrent().setTextInput( strings[1] )) ; act(() => getCurrent().submit()) ;
            act(() => getCurrent().setTextInput( strings[2] )) ; act(() => getCurrent().submit()) ;

            expect( getCurrent().inputIsSubmitable() ).toBe(false);

        });

    });

    describe('deleteCategories',() => {

        const toAdd:string[] = ['lorem','ipsum','dolor','aemet'] ;

        test('Ejemplo de borrado de término',() => {

            const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;
            act(() => getCurrent().setTextInput(toAdd.join(','))) ; act(() => getCurrent().submit());

            act(() => getCurrent().deleteCategories(toAdd[0])) ;
            expect(getCurrent().categories).toStrictEqual( categoriesSanitizer(toAdd.slice(1,4)) );

        });

        test('Ejemplo de borrado por inicial',() => {

            const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;
            act(() => getCurrent().setTextInput(toAdd.join(','))) ; act(() => getCurrent().submit());

            act(() => getCurrent().deleteCategories('A')) ;
            expect(getCurrent().categories).toStrictEqual( categoriesSanitizer(toAdd.slice(0,3)) );

        });

        test('Ejemplo de no causar efecto si no encuentra lo que se aporta',() => {

            const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;
            act(() => getCurrent().setTextInput(toAdd.join(','))) ; act(() => getCurrent().submit());

            act(() => getCurrent().deleteCategories('Jojo')) ;
            expect(getCurrent().categories).toStrictEqual( categoriesSanitizer(toAdd) );

        });

        test('opción PURGE, para borrar todos los términos',() => {

            const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;
            act(() => getCurrent().setTextInput(toAdd.join(','))) ; act(() => getCurrent().submit());

            act(() => getCurrent().deleteCategories('PURGE'));
            expect( getCurrent().categories ).toStrictEqual([]);

        });

    })

    test('tras un submit positivo, se debe de limpiar el input y añadir las categorias',() => {

        const stringToTest = 'Lorem';

        const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;

        act( () => getCurrent().setTextInput(stringToTest.substring(0,2)) ) ; act( () => getCurrent().submit() ) ;
        expect( getCurrent().textInput ).toBe(stringToTest.substring(0,2));

        act(() => getCurrent().setTextInput(stringToTest)) ; act( () => getCurrent().submit() ) ;
        expect( getCurrent().textInput ).toBe('');
        expect( getCurrent().categories.length ).toBeTruthy();

    });

    test('Todos los términos tienen siempre la inicial mayúscula y el resto en minúscula',() => {

        const toAdd:string[] = ['LOREM','IPSUM','DOLOR','AEMET'] ;
        const { result } = renderHook(controllerHook); const getCurrent = () => result.current ;

        act( () => getCurrent().setTextInput( toAdd.join(',') ) ); act( () => getCurrent().submit() );
        
        const firstToTest = getCurrent().categories[0].substring(0,1);
        expect( firstToTest ).toBe( firstToTest.toUpperCase() );

        const secondToTest = getCurrent().categories[0].substring(1,2);
        expect( secondToTest ).toBe( secondToTest.toLowerCase() );

    }); 

});