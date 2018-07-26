import Types from "../action/types"

export default function (state = {}, action = {}) {
    switch (action.type){

        case Types.FETCH_DATA:{
            const {uniqueId,data,error,showLoading} = action.payload;
            let _currentState = state[uniqueId] || {};
            _currentState = {..._currentState, data,showLoading,error};
            return {...state,
                [uniqueId]:_currentState
            };
        }
        case Types.REMOVE_DATA:{
            const {uniqueId} = action.payload;
            let newState = {...state};
            delete newState[uniqueId];
            return newState;
        }

        default:
            return state
    }
}


