import {ADD_VALUE, RESET} from "./actionTypes.js";

export const addValue = (id) => ({
    type: ADD_VALUE,
    payload: {
        id
    }
});

export const reset = () => ({
    type: RESET
});