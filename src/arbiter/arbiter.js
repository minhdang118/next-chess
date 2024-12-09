import { bishopNotation, kingNotation, knightNotation, pawnNotation, queenNotation, rookNotation } from "../const";
import { getBishopMoves, getKingMoves, getKnightMoves, getPawnCaptures, getPawnMoves, getQueenMoves, getRookMoves } from "./getMoves";

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
    getValidMoves : function({position, prevPosition, piece, rank, file}) {
        let validMoves = this.getRegularMoves({position, piece, rank, file});
        if (piece.endsWith(pawnNotation)) {
            validMoves = [
                ...validMoves,
                ...getPawnCaptures({position, prevPosition, piece, rank, file})
            ];
        }

        return validMoves;
    }
}

export default arbiter;