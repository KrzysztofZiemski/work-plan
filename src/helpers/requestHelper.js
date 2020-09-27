export const getQueries = (search) => {

    if (typeof search !== 'string') return;
    if (search[0] !== '?') return;

    const input = search.substring(1)
    const queriesStrings = input.split('&');

    const output = {};

    queriesStrings.forEach(string => {
        const propertyValue = string.split('=');
        output[propertyValue[0]] = propertyValue[1];
    });

    return output;
}