import apiActions from "./types"
const INITIAL_STATE = { apiObj: {}}

export const reducer = (state= INITIAL_STATE, action) => {
          switch(action.type) {
          case apiActions.GET_API_START: 
                 return { ...state};
          case apiActions.GET_API_SUCCESS:
            //   var tempObj = {...state.apiObj};
            //   tempObj[action.payload.id] = action.payload.json;
              return { ...state,
                       apiObj: {
                        ...state.apiObj,
                        [action.payload.id] : action.payload.json,
                       }
                    }

          default:
              return {...state}
          }
}