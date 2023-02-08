import { nameRegex } from "./regex";

export default function validateOrder(order, clientName){

    let errorMsg = '';
    const existProduct = order.length > 0;
    const isValidName = clientName !== '' && nameRegex.test(clientName);
    if(!existProduct) {
        errorMsg = 'Debes Agregar por lo menos un producto a tu orden';
        return {
            errorMsg,
            isValid: false
        };

    }

    if(!isValidName){
        errorMsg = 'Debes escribir un nombre';
        return {
            errorMsg,
            isValid: false
        };

    }

    return {
        errorMsg,
        isValid: true
    }

}



