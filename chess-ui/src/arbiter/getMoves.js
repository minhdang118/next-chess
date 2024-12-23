import { PieceNotation, ColorNotation, CastlingDirectionNotation, MovesDefinition } from "../const";
import { getArrayElement } from "../utils/helper";

const offsets = Array(7).fill().map((x, i) => i + 1);


// king
const getKingMoves = ({currPosition, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;

    MovesDefinition.kingCandidates.forEach((cand) => {
        const r = rank + cand[0];
        const f = file + cand[1]
        const candInfo = currPosition?.[r]?.[f];
        if (candInfo !== undefined && 
            (candInfo.startsWith(oppColor) || candInfo === PieceNotation.blank)) {
            moves.push([r, f]);
        }
    })

    return moves;
}


// queen
const getQueenMoves = ({currPosition, piece, rank, file}) => {
    const moves = [
        ...getRookMoves({currPosition, piece, rank, file}),
        ...getBishopMoves({currPosition, piece, rank, file})
    ];
    return moves;
}


// bishop
const getBishopMoves = ({currPosition, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;

    MovesDefinition.bishopDirections.forEach((dir) => {
        for (const offset of offsets) {
            const r = rank + (offset * dir[0]);
            const f = file + (offset * dir[1]);
            
            if (currPosition?.[r]?.[f] === undefined) {
                break;
            }
            if (currPosition[r][f].startsWith(oppColor)) {
                moves.push([r, f]);
                break;
            }
            if (currPosition[r][f].startsWith(myColor)) {
                break;
            }
            moves.push([r, f]);
        }
    });

    return moves;
}


// knight
const getKnightMoves = ({currPosition, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;

    MovesDefinition.knightCandidates.forEach((cand) => {
        const r = rank + cand[0];
        const f = file + cand[1]
        const candInfo = currPosition?.[r]?.[f];
        if (candInfo !== undefined && 
            (candInfo.startsWith(oppColor) || candInfo === PieceNotation.blank)) {
            moves.push([r, f]);
        }
    })

    return moves;
}


// rook
const getRookMoves = ({currPosition, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;

    MovesDefinition.rookDirections.forEach((dir) => {
        for (const offset of offsets) {
            const r = rank + (offset * dir[0]);
            const f = file + (offset * dir[1]);
            
            if (currPosition?.[r]?.[f] === undefined) {
                break;
            }
            if (currPosition[r][f].startsWith(oppColor)) {
                moves.push([r, f]);
                break;
            }
            if (currPosition[r][f].startsWith(myColor)) {
                break;
            }
            moves.push([r, f]);
        }
    });

    return moves;
}


// pawn
const getPawnMoves = ({currPosition, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const moveDirection = myColor === ColorNotation.white ? -1 : 1;
    
    // configure forward moves
    const r1 = rank + moveDirection;
    const r2 = r1 + moveDirection;
    const oneSquareForwardCandInfo = currPosition?.[r1]?.[file];
    const twoSquaresForwardCandInfo = currPosition?.[r2]?.[file];

    // normal pawn push
    if (oneSquareForwardCandInfo !== undefined && 
        oneSquareForwardCandInfo === PieceNotation.blank) {
        moves.push([r1, file]);
    }

    // possible 2-square pawn push
    if (rank % 5 === 1) {
        if (oneSquareForwardCandInfo === PieceNotation.blank && 
            twoSquaresForwardCandInfo === PieceNotation.blank) {
            moves.push([r2, file]);
        }
    }

    return moves;
}


const getPawnCaptures = ({currPosition, prevPosition, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
    const moveDirection = myColor === ColorNotation.white ? -1 : 1;
    
    const r1 = rank + moveDirection;
    const r2 = r1 + moveDirection;
    // configure captures
    const captureDirections = 
    myColor === ColorNotation.white 
    ? MovesDefinition.whitePawnCaptures
    : MovesDefinition.blackPawnCaptures;

    captureDirections.forEach((captDir) => {
        const captRank = rank + captDir[0];
        const captFile = file + captDir[1];
        const captureCandInfo = currPosition?.[captRank]?.[captFile];
        if (captureCandInfo !== undefined && captureCandInfo.startsWith(oppColor)) {
            moves.push([captRank, captFile]);
        }
    });

    // en passant
    const oppPawn = oppColor + PieceNotation.pawn;
    const adjacentFiles = [file - 1, file + 1];

    if (prevPosition) {
        if ((myColor === ColorNotation.white && rank === 3) || 
        (myColor === ColorNotation.black && rank === 4)) {
            adjacentFiles.forEach((adjFile) => {
                if (currPosition?.[rank]?.[adjFile] === oppPawn && 
                    currPosition?.[r2]?.[adjFile] === PieceNotation.blank &&
                    prevPosition?.[rank]?.[adjFile] === PieceNotation.blank && 
                    prevPosition?.[r2]?.[adjFile] === oppPawn
                ) {
                    moves.push([r1, adjFile]);
                }
            });
        }
    }

    return moves;
}


// castling
const getCastlingMoves = ({currPosition, castlingDirections: directions, piece, rank, file}) => {
    const moves = [];

    // unable to castle
    if (file !== 4 || rank % 7 !== 0 || !directions) {
        return [];
    }

    if (piece.startsWith(ColorNotation.white)) {
        if (directions.includes(CastlingDirectionNotation.kingSide) &&
        currPosition[7][5] === PieceNotation.blank &&
        currPosition[7][6] === PieceNotation.blank &&
        currPosition[7][7] === ColorNotation.white + PieceNotation.rook
        ) {
            moves.push([7, 6]);
        }
        if (directions.includes(CastlingDirectionNotation.queenSide) &&
        currPosition[7][3] === PieceNotation.blank &&
        currPosition[7][2] === PieceNotation.blank &&
        currPosition[7][1] === PieceNotation.blank &&
        currPosition[7][0] === ColorNotation.white + PieceNotation.rook
        ) {
            moves.push([7, 2]);
        }
    }

    if (piece.startsWith(ColorNotation.black)) {
        if (directions.includes(CastlingDirectionNotation.kingSide) &&
        currPosition[0][5] === PieceNotation.blank &&
        currPosition[0][6] === PieceNotation.blank &&
        currPosition[0][7] === ColorNotation.black + PieceNotation.rook
        ) {
            moves.push([0, 6]);
        }
        if (directions.includes(CastlingDirectionNotation) &&
        currPosition[0][3] === PieceNotation.blank &&
        currPosition[0][2] === PieceNotation.blank &&
        currPosition[0][1] === PieceNotation.blank &&
        currPosition[0][0] === ColorNotation.black + PieceNotation.rook
        ) {
            moves.push([0, 2]);
        }
    }

    return moves;
}

const getCastlingDirections = ({castlingDirections, piece, rank, file}) => {
    const color = getArrayElement.first(piece);
    const directions = castlingDirections[color];

    // king has moved
    if (piece.endsWith(PieceNotation.king)) {
        return [];
    }

    // rook has moved
    if (piece.endsWith(PieceNotation.rook)) {
        if (file === 7) {
            directions.filter((side) => side !== CastlingDirectionNotation.kingSide);
        }
        if (file === 0) {
            directions.filter((side) => side !== CastlingDirectionNotation.queenSide);
        }
    }

    return directions;
}


// function exports
export const getMoves = {
    "king" : getKingMoves,
    "queen" : getQueenMoves,
    "bishop" : getBishopMoves,
    "knight" : getKnightMoves,
    "rook" : getRookMoves,
    "pawn" : getPawnMoves
}

export const getCaptures = {
    "pawn" : getPawnCaptures
}

export const getCastling = {
    "moves" : getCastlingMoves,
    "directions" : getCastlingDirections
}