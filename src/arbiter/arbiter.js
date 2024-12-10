import { PieceNotation } from "../const";
import { copyPosition } from "../utils/helper";
import { getCaptures, getMoves } from "./getMoves";

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
    getValidMoves : function({position, prevPosition, piece, rank, file}) {
        let validMoves = this.getRegularMoves({position, piece, rank, file});
        if (piece.endsWith(PieceNotation.pawn)) {
            validMoves = [
                ...validMoves,
                ...getCaptures.pawn({position, prevPosition, piece, rank, file})
            ];
        }

        return validMoves;
    },
    performMove : function({currentPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo}) {
        // deep copy of position
        const newPosition = copyPosition(currentPosition);

        // en passant configurations
        if (pieceFrom.endsWith(PieceNotation.pawn) && 
            newPosition[rankTo][fileTo] === PieceNotation.blank &&
            rankFrom !== rankTo && 
            fileFrom !== fileTo
            ) {
            newPosition[rankFrom][fileTo] = PieceNotation.blank;
        }

        // regular move configurations
        newPosition[rankTo][fileTo] = pieceFrom;
        newPosition[rankFrom][fileFrom] = PieceNotation.blank;
        
        return newPosition;
    }
}

export default arbiter;