import actionTypes from "../actionTypes"

export const openPromotionBox = ({rankFrom, fileFrom, rankTo, fileTo}) => {
    return {
        type: actionTypes.PROMOTION_OPEN,
        payload: {rankFrom, fileFrom, rankTo, fileTo}
    }
}

export const closePopup = () => {
    return {
        type: actionTypes.PROMOTION_CLOSE
    }
}