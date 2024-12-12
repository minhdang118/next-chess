import { PieceNotation } from "../const";
import { getCaptures, getCastling, getMoves } from "./getMoves";
import { movePawn, movePiece } from "./move";

const arbiter = {
    getRegularMoves : function({position, piece, rank, file}) {
        if (piece.endsWith(PieceNotation.king)) {
            return getMoves.king({position, piece, rank, file});
        }
        if (piece.endsWith(PieceNotation.queen)) {
            return getMoves.queen({position, piece, rank, file});
        }
        if (piece.endsWith(PieceNotation.bishop)) {
            return getMoves.bishop({position, piece, rank, file});
        }
        if (piece.endsWith(PieceNotation.knight)) {
            return getMoves.knight({position, piece, rank, file});
        }
        if (piece.endsWith(PieceNotation.rook)) {
            return getMoves.rook({position, piece, rank, file});
        }
        
        if (piece.endsWith(PieceNotation.pawn)) {
            return getMoves.pawn({position, piece, rank, file});
        }
        
    },
    getValidMoves : function({position, prevPosition, castlingDirections, piece, rank, file}) {
        let validMoves = this.getRegularMoves({position, piece, rank, file});
        if (piece.endsWith(PieceNotation.pawn)) {
            validMoves = [
                ...validMoves,
                ...getCaptures.pawn({position, prevPosition, piece, rank, file})
            ];
        }
        if (piece.endsWith(PieceNotation.king)) {
            validMoves = [
                ...validMoves,
                ...getCastling.moves({position, castlingDirections, piece, rank, file})
            ];
        }

        return validMoves;
    },
    performMove : function({currentPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo}) {
        if (pieceFrom.endsWith(PieceNotation.pawn)) {
            return movePawn({currentPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo});
        } else {
            return movePiece({currentPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo});
        }
    }
}

export default arbiter;