import apiActions from "./types"

export const getApiStart = () =>({
  type: apiActions.GET_API_START,
})
export const getApiSuccess = (id, json) =>({
  type: apiActions.GET_API_SUCCESS,
  payload: {id: id, json: json},
})
export const getApiFailure = (errorMsg) =>({
  type: apiActions.GET_API_FAILURE,
  payload: errorMsg,
}
)

export const getApi = (id) => {
    const url = 'https://5c3ce12c29429300143fe570.mockapi.io/api';
 return (dispatch) => {
     dispatch(getApiStart());
    fetch(`${url}/${id}`)
    .then(response =>  response.json())
    .then( json => {
       dispatch(getApiSuccess(id,json));
    }
    )
    .catch((error) => {
        const errorMsg = error.message;
        dispatch(getApiFailure(errorMsg));
    });
 }
}