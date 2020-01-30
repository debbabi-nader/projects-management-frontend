import { diff } from 'jiff';


export function getJsonPatchOperations(object: {}) {

    const OBJECT_KEYS: string[] = Object.keys(object);
    const OBJECT_SKELETON = {};
    OBJECT_KEYS.forEach(
        (key: string) => OBJECT_SKELETON[key] = ''
    );

    return diff(OBJECT_SKELETON, object, { invertible: false });

}
