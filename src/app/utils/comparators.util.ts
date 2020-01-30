export function inputValuesComparator(oldValue: string, newValue: string): boolean {

    if ((oldValue === null && newValue === undefined) || (oldValue === undefined && newValue === null)) {
        return false;
    } else {
        return String(oldValue) !== String(newValue);
    }

}
