import { PieceNotation } from "../const";
import { getCaptures, getCastling, getMoves } from "./getMoves";
import { movePawn, movePiece } from "./move";

const NonBlankPieceNotations = Object.entries(PieceNotation).filter(([key]) => key !== "blank");

const arbiter = {
    getRegularMoves : function({currPosition, piece, rank, file}) {
        for (const [notationKey, notationValue] of NonBlankPieceNotations) {
            if (piece.endsWith(notationValue)) {
                return getMoves[notationKey]({currPosition, piece, rank, file});
            }
        }
        // if (piece.endsWith(PieceNotation.king)) {
        //     return getMoves.king({currPosition, piece, rank, file});
        // }
        // if (piece.endsWith(PieceNotation.queen)) {
        //     return getMoves.queen({currPosition, piece, rank, file});
        // }
        // if (piece.endsWith(PieceNotation.bishop)) {
        //     return getMoves.bishop({currPosition, piece, rank, file});
        // }
        // if (piece.endsWith(PieceNotation.knight)) {
        //     return getMoves.knight({currPosition, piece, rank, file});
        // }
        // if (piece.endsWith(PieceNotation.rook)) {
        //     return getMoves.rook({currPosition, piece, rank, file});
        // }
        
        // if (piece.endsWith(PieceNotation.pawn)) {
        //     return getMoves.pawn({currPosition, piece, rank, file});
        // }
        
    },
    getValidMoves : function({currPosition, prevPosition, castlingDirections, piece, rank, file}) {
        let validMoves = this.getRegularMoves({currPosition, piece, rank, file});
        if (piece.endsWith(PieceNotation.pawn)) {
            validMoves = [
                ...validMoves,
                ...getCaptures.pawn({currPosition, prevPosition, piece, rank, file})
            ];
        }
        if (piece.endsWith(PieceNotation.king)) {
            validMoves = [
                ...validMoves,
                ...getCastling.moves({currPosition, castlingDirections, piece, rank, file})
            ];
        }

        return validMoves;
    },
    performMove : function({currPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo}) {
        if (pieceFrom.endsWith(PieceNotation.pawn)) {
            return movePawn({currPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo});
        } else {
            return movePiece({currPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo});
        }
    }
}

export default arbiter;