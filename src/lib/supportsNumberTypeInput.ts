export function supportsInputTypeNumber() {
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    const isValidType = input.type === 'number';
    return isValidType;
}