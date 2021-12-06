import * as actions from './actionTypes.js';

const initialState = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentValue: 'X'
}

export default function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case actions.ADD_VALUE:
            return {
                ...state,
                currentValue: state.currentValue === 'X' ? '0' : 'X',
                board: state.board.map((value, id) => {
                    if (id === payload.id) {
                        value = state.currentValue;
                    }

                    return value;
                })
            };

        case actions.RESET: {
            return initialState;
        }

        default:
            return state;
    }
}