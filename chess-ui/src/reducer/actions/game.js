import actionTypes from "../actionTypes"

export const updateCastling = ({directions}) => {
    return {
        type: actionTypes.CAN_CASTLE,
        payload: {directions}
    }
}