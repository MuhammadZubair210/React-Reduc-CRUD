import ActionTypes from '../constants/constant';

const INITIAL_STATE = {
    todo: '',
    arr: '',
    alltodos: [],
    allkeys: [],
    specifictodo: '',
    updatedtodo: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.ADDTODO:
            return ({
                ...state,
                todo: action.payload
            })
        case ActionTypes.DELETETODO:
            return ({
                ...state,
                todo: action.payload,
            })
        case ActionTypes.VIEWTODOS:
            return ({
                ...state,
                alltodos: action.payload,
            })
        case ActionTypes.GETKEYS:
            return ({
                ...state,
                allkeys: action.payload,
            })
        case ActionTypes.EDITTODO:
            return ({
                ...state,
                specifictodo: action.payload
            })
        case ActionTypes.UPDATETODOS:
            return ({
                ...state,
                updatedtodo: action.payload
            })
        default:
            return state;
    }

}