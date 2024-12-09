import { bishopNotation, kingNotation, knightNotation, pawnNotation, queenNotation, rookNotation } from "../const";
import { getBishopMoves, getKingMoves, getKnightMoves, getPawnMoves, getQueenMoves, getRookMoves } from "./getMoves";

const arbiter = {
    getRegularMoves : function({position, piece, rank, file}) {
        if (piece.endsWith(rookNotation)) {
            return getRookMoves({position, piece, rank, file});
        }
        if (piece.endsWith(knightNotation)) {
            return getKnightMoves({position, piece, rank, file});
        }
        if (piece.endsWith(bishopNotation)) {
            return getBishopMoves({position, piece, rank, file});
        }
        if (piece.endsWith(queenNotation)) {
            return getQueenMoves({position, piece, rank, file});
        }
        if (piece.endsWith(kingNotation)) {
            return getKingMoves({position, piece, rank, file});
        }
        if (piece.endsWith(pawnNotation)) {
            return getPawnMoves({position, piece, rank, file});
        }
        
    },
}

export default arbiter;