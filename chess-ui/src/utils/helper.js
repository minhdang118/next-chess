import { CastlingDirectionNotation, fenToStr, Status } from "../const";

// general
const getFirstElementOfArr = (arr) => {
    if (arr.length > 0) {
        return arr[0];
    }
    return null;
}

const getSecondLastElementOfArr = (arr) => {
    if (arr.length > 1) {
        return arr[arr.length - 2];
    }
    return null;
}

const getLastElementOfArr = (arr) => {
    if (arr.length > 0) {
        return arr[arr.length - 1];
    }
    return null;
}

export const getArrayElement = {
    "first" : getFirstElementOfArr,
    "last" : getLastElementOfArr,
    "secondLast" : getSecondLastElementOfArr
}

export const getFileChar = (file) => String.fromCharCode(file + 96);


// translating fen to game state
export const getGameStateFromFen = (fen) => {
    const fenSplit = fen.split(' ');

    // obtain position matrix
    const fenRows = fenSplit[0].split('/');
    const fenArrs = fenRows.map((rowStr) => rowStr.split(''));
    const position = fenArrs.map((rowArr) => translateFenRowArr(rowArr));

    // obtain turn
    const turn = fenSplit[1];

    // obtain castling rights
    const dirStr = fenSplit[2];
    const dirWhite = [];
    const dirBlack = [];

    for (let char of dirStr) {
        if (char === "K") {
            dirWhite.push(CastlingDirectionNotation.kingSide);
        } else if (char === "Q") {
            dirWhite.push(CastlingDirectionNotation.queenSide);
        } else if (char === "k") {
            dirBlack.push(CastlingDirectionNotation.kingSide);
        } else if (char === "q") {
            dirBlack.push(CastlingDirectionNotation.queenSide);
        }
    }
    const castlingDirections = {
        w : dirWhite,
        b : dirBlack
    }

    // return game state object
    const gameState = {
        position : [position],
        turn : turn,
        candidateMoves : [],
        status : Status.ongoing,
        promotionInfo : null,
        castlingDirections : castlingDirections
    }
    return gameState;
}

const translateFenRowArr = (rowArr) => {    
    return rowArr.map((info) => fenToStr.get(info)).flat(Infinity);
}

export const getInfoFromPieceClassName = (className) => {
    const classNameSplit = className.split(' ');
    const piece = classNameSplit[1];
    const posSplit = classNameSplit[2].split('');
    const rank = posSplit[2];
    const file = posSplit[3];

    // return info object
    const info = {
        piece: piece,
        rank: rank,
        file: file
    }
    return info;
}

export const copyPosition = (position) => {
    return position.map((r, rank) => r.map((f, file) => position[rank][file]));
}
