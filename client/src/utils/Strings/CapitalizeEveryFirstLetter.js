/**
 * Pone en mayúsculas todas las primeras letras del string proporcionado
 * @example CapitalizeEveryFirstLetter("marcos juares") // returns "Marcos Juarez"
 * @param {*} string String a ser puesta en mayusculas
 */
export const CapitalizeEveryFirstLetter = (string) => {
    let newString = "";

    for (let charIndex = 0; charIndex < string.length; charIndex++) {
        if (charIndex === 0 || string[charIndex - 1] === " ") {
            newString += string[charIndex].toUpperCase();
        } else {
            newString += string[charIndex];
        }
    }

    return newString;
};
