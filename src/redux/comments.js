import * as ActionTypes from './ActionTypes';

export const Comments = (state = { isLoading: true, errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            return {...state, isLoading: false, errMess: null, 
                comments: state.comments.concat(action.payload)};
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, 
                comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};