import { PieceNotation } from "../const";
import { copyPosition, getArrayElement } from "../utils/helper";

export const movePiece = ({currPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo}) => {
    // deep copy of position
    const newPosition = copyPosition(currPosition);
    const colorFrom = getArrayElement.first(pieceFrom);

    // castling move for rooks
    if (pieceFrom.endsWith(PieceNotation.king) && Math.abs(fileTo - fileFrom) > 1) {
        // king-side castle
        if (fileTo === 6) {
            newPosition[rankFrom][7] = PieceNotation.blank;
            newPosition[rankFrom][5] = colorFrom + PieceNotation.rook;
        }
        // queen-side castle
        if (fileTo === 2) {
            newPosition[rankFrom][0] = PieceNotation.blank;
            newPosition[rankFrom][3] = colorFrom + PieceNotation.rook;
        }
    }

    // regular move
    newPosition[rankTo][fileTo] = pieceFrom;
    newPosition[rankFrom][fileFrom] = PieceNotation.blank;
    
    return newPosition;
}

export const movePawn = ({currPosition, pieceFrom, rankFrom, fileFrom, pieceTo, rankTo, fileTo}) => {
    // deep copy of position
    const newPosition = copyPosition(currPosition);

    // en passant
    if (newPosition[rankTo][fileTo] === PieceNotation.blank &&
        rankFrom !== rankTo && 
        fileFrom !== fileTo
        ) {
        newPosition[rankFrom][fileTo] = PieceNotation.blank;
    }

    // regular move
    newPosition[rankTo][fileTo] = pieceFrom;
    newPosition[rankFrom][fileFrom] = PieceNotation.blank;
    
    return newPosition;
}