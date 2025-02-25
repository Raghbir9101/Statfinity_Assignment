export function toPascalCase(text = "") {
    if(text.length === 0) {
        return text;
    }
    const charArray = text.split("");
    charArray[0] = charArray[0].toUpperCase();
    const restOfText = charArray.join("");
    return restOfText;
}