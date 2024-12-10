import { PieceNotation, ColorNotation } from "../const";
import { getArrayElement } from "../utils/helper";

const offsets = Array(7).fill().map((x, i) => i + 1);

const getRookMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];
    directions.forEach((dir) => {
        for (const offset of offsets) {
            const r = rank + (offset * dir[0]);
            const f = file + (offset * dir[1]);
            
            if (position?.[r]?.[f] === undefined) {
                break;
            }
            if (position[r][f].startsWith(oppColor)) {
                moves.push([r, f]);
                break;
            }
            if (position[r][f].startsWith(myColor)) {
                break;
            }
            moves.push([r, f]);
        }
    });

    return moves;
}

const getKnightMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
    const candidates = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1]
    ];

    candidates.forEach((cand) => {
        const r = rank + cand[0];
        const f = file + cand[1]
        const candInfo = position?.[r]?.[f];
        if (candInfo !== undefined && 
            (candInfo.startsWith(oppColor) || candInfo === PieceNotation.blank)) {
            moves.push([r, f]);
        }
    })

    return moves;
}

const getBishopMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
    const directions = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];
    directions.forEach((dir) => {
        for (const offset of offsets) {
            const r = rank + (offset * dir[0]);
            const f = file + (offset * dir[1]);
            
            if (position?.[r]?.[f] === undefined) {
                break;
            }
            if (position[r][f].startsWith(oppColor)) {
                moves.push([r, f]);
                break;
            }
            if (position[r][f].startsWith(myColor)) {
                break;
            }
            moves.push([r, f]);
        }
    });

    return moves;
}

const getQueenMoves = ({position, piece, rank, file}) => {
    const moves = [
        ...getRookMoves({position, piece, rank, file}),
        ...getBishopMoves({position, piece, rank, file})
    ];
    return moves;
}

const getKingMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
    const candidates = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];

    candidates.forEach((cand) => {
        const r = rank + cand[0];
        const f = file + cand[1]
        const candInfo = position?.[r]?.[f];
        if (candInfo !== undefined && 
            (candInfo.startsWith(oppColor) || candInfo === PieceNotation.blank)) {
            moves.push([r, f]);
        }
    })

    return moves;
}

const getPawnMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const moveDirection = myColor === ColorNotation.white ? -1 : 1;
    
    // configure forward moves
    const r1 = rank + moveDirection;
    const r2 = r1 + moveDirection;
    const oneSquareForwardCandInfo = position?.[r1]?.[file];
    const twoSquaresForwardCandInfo = position?.[r2]?.[file];

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

const getPawnCaptures = ({position, prevPosition, piece, rank, file}) => {
    const moves = [];
    const myColor = getArrayElement.first(piece);
    const oppColor = myColor === ColorNotation.white ? ColorNotation.black : ColorNotation.white;
    const moveDirection = myColor === ColorNotation.white ? -1 : 1;
    
    const r1 = rank + moveDirection;
    const r2 = r1 + moveDirection;
    // configure captures
    const captureDirections = 
    myColor === ColorNotation.white 
    ? [[-1, -1], [-1, 1]] 
    : [[1, -1], [1, 1]];

    captureDirections.forEach((captDir) => {
        const captRank = rank + captDir[0];
        const captFile = file + captDir[1];
        const captureCandInfo = position?.[captRank]?.[captFile];
        if (captureCandInfo !== undefined && captureCandInfo.startsWith(oppColor)) {
            moves.push([captRank, captFile]);
        }
    });

    // en passant
    const oppPawn = `${oppColor}${PieceNotation.pawn}`;
    const adjacentFiles = [file - 1, file + 1];

    if (prevPosition) {
        if ((myColor === ColorNotation.white && rank === 3) || 
        (myColor === ColorNotation.black && rank === 4)) {
            adjacentFiles.forEach((adjFile) => {
                if (position?.[rank]?.[adjFile] === oppPawn && 
                    position?.[r2]?.[adjFile] === PieceNotation.blank &&
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