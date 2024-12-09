import { blackColorNotation, blankPieceNotation, whiteColorNotation } from "../const";
import { getFirstElementOfArr } from "../utils/helper";

const offsets = Array(7).fill().map((x, i) => i + 1);

export const getRookMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getFirstElementOfArr(piece);
    const oppColor = myColor === whiteColorNotation ? blackColorNotation : whiteColorNotation;
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

export const getKnightMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getFirstElementOfArr(piece);
    const oppColor = myColor === whiteColorNotation ? blackColorNotation : whiteColorNotation;
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
        if (candInfo !== undefined 
            && 
            (candInfo.startsWith(oppColor) || candInfo === blankPieceNotation)) {
            moves.push([r, f]);
        }
    })

    return moves;
}

export const getBishopMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getFirstElementOfArr(piece);
    const oppColor = myColor === whiteColorNotation ? blackColorNotation : whiteColorNotation;
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

export const getQueenMoves = ({position, piece, rank, file}) => {
    const moves = [
        ...getRookMoves({position, piece, rank, file}),
        ...getBishopMoves({position, piece, rank, file})
    ];
    return moves;
}

export const getKingMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getFirstElementOfArr(piece);
    const oppColor = myColor === whiteColorNotation ? blackColorNotation : whiteColorNotation;
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
        if (candInfo !== undefined 
            && 
            (candInfo.startsWith(oppColor) || candInfo === blankPieceNotation)) {
            moves.push([r, f]);
        }
    })

    return moves;
}

export const getPawnMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getFirstElementOfArr(piece);
    const oppColor = myColor === whiteColorNotation ? blackColorNotation : whiteColorNotation;
    const moveDirection = myColor === whiteColorNotation ? -1 : 1;
    
    // configure moves
    const r1 = rank + moveDirection;
    const r2 = r1 + moveDirection;
    const oneSquareForwardCandInfo = position?.[r1]?.[file];
    const twoSquaresForwardCandInfo = position?.[r2]?.[file];
    if (oneSquareForwardCandInfo !== undefined && oneSquareForwardCandInfo === blankPieceNotation) {
        moves.push([r1, file]);
    }

    if (rank % 5 === 1) {
        if (oneSquareForwardCandInfo === blankPieceNotation && twoSquaresForwardCandInfo === blankPieceNotation) {
            moves.push([r2, file]);
        }
    }

    // configure captures
    const captureDirections = 
    myColor === whiteColorNotation 
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

    return moves;
}