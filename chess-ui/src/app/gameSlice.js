import { createSlice } from "@reduxjs/toolkit";
import { getGameStateFromFen } from "../utils/helper";
import { ColorNotation, startingPositionFen, Status } from "../const";

export const gameSlice = createSlice({
    name: "game",
    initialState: getGameStateFromFen(startingPositionFen),
    reducers: {
        makeNewMove: (state, action) => {
            state.positions = [
                ...state.positions,
                action.payload.newPosition
            ];
            state.turn = state.turn === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
        },
        generateCandidateMoves: (state, action) => {
            state.candidateMoves = action.payload.candidateMoves;
        },
        clearCandidateMoves: (state) => {
            state.candidateMoves = [];
        },
        openPromotionBox: (state, action) => {
            state.status = Status.promoting;
            state.promotionInfo = {...action.payload};
        },
        closePopup: (state) => {
            state.status = Status.ongoing;
            state.promotionInfo = null;
        },
        updateCastling: (state, action) => {
            const oppTurn = state.turn === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
            state.castlingDirections[oppTurn] = action.payload.directions;
        }
    }
});

export const { makeNewMove, generateCandidateMoves, clearCandidateMoves, openPromotionBox, closePopup, updateCastling } = gameSlice.actions;
export const selectPositions = (state) => state.game.positions;
export const selectTurn = (state) => state.game.turn;
export const selectCandidateMoves = (state) => state.game.candidateMoves;
export const selectStatus = (state) => state.game.status;
export const selectPromotionInfo = (state) => state.game.promotionInfo;
export const selectCastlingDirections = (state) => state.game.castlingDirections;

// export const { selectPosition, selectTurn, selectCandidateMoves, selectStatus, selectPromotionInfo, selectCastlingDirections } = (state) => {
//     state.game.position,
//     state.game.turn,
//     state.game.candidateMoves,
//     state.game.status,
//     state.game.promotionInfo,
//     state.game.castlingDirections
// }
export default gameSlice.reducer;