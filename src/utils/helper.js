import { fenToStr, startingPositionFen } from "../const";

// general
export const getFirstElementOfArr = (arr) => {
    if (arr.length > 0) {
        return arr[0];
    }
    return null;
}

export const getLastElementOfArr = (arr) => {
    if (arr.length > 0) {
        return arr[arr.length - 1];
    }
    return null;
}

export const getFileChar = (file) => String.fromCharCode(file + 96);

export const getTileClassName = (i, j) => {
    let c = "tile";
    c += (i + j) % 2 === 0 ? " tile--light" : " tile--dark";
    return c;
}

// translating fen to game state
export const getGameStateFromFen = (fen) => {
    const fenSplit = fen.split(' ');

    // obtain position matrix
    const fenRows = fenSplit[0].split('/');
    const fenArrs = fenRows.map((rowStr) => rowStr.split(''));
    const position = fenArrs.map((rowArr) => translateFenRowArr(rowArr));

    // obtain turn
    const turn = fenSplit[1];

    // return game state object
    const gameState = {
        position: [position],
        turn: turn,
        candidateMoves: []
    }
    return gameState;
}

const translateFenRowArr = (rowArr) => {    
    return rowArr.map((info) => fenToStr.get(info)).flat(Infinity);
}

export const getInitGameState = getGameStateFromFen(startingPositionFen);

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
