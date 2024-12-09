export const startingPositionFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// export const startingPositionFen = "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1";

export const blankPieceNotation = "-";
export const whiteColorNotation = "w";
export const blackColorNotation = "b";
export const kingNotation = "k";
export const queenNotation = "q";
export const bishopNotation = "b";
export const knightNotation = "n";
export const rookNotation = "r";
export const pawnNotation = "p";

export const fenToStr = new Map([
    ["K", `${whiteColorNotation}${kingNotation}`],
    ["Q", `${whiteColorNotation}${queenNotation}`],
    ["B", `${whiteColorNotation}${bishopNotation}`],
    ["N", `${whiteColorNotation}${knightNotation}`],
    ["R", `${whiteColorNotation}${rookNotation}`],
    ["P", `${whiteColorNotation}${pawnNotation}`],
    ["k", `${blackColorNotation}${kingNotation}`],
    ["q", `${blackColorNotation}${queenNotation}`],
    ["b", `${blackColorNotation}${bishopNotation}`],
    ["n", `${blackColorNotation}${knightNotation}`],
    ["r", `${blackColorNotation}${rookNotation}`],
    ["p", `${blackColorNotation}${pawnNotation}`],
    ["1", Array(1).fill(blankPieceNotation)],
    ["2", Array(2).fill(blankPieceNotation)],
    ["3", Array(3).fill(blankPieceNotation)],
    ["4", Array(4).fill(blankPieceNotation)],
    ["5", Array(5).fill(blankPieceNotation)],
    ["6", Array(6).fill(blankPieceNotation)],
    ["7", Array(7).fill(blankPieceNotation)],
    ["8", Array(8).fill(blankPieceNotation)],
]);
