// export const startingPositionFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const startingPositionFen = "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1";

export const blankPieceNotation = "-";

export const fenToStr = new Map([
    ["K", "wk"],
    ["Q", "wq"],
    ["B", "wb"],
    ["N", "wn"],
    ["R", "wr"],
    ["P", "wp"],
    ["k", "bk"],
    ["q", "bq"],
    ["b", "bb"],
    ["n", "bn"],
    ["r", "br"],
    ["p", "bp"],
    ["1", blankPieceNotation],
    ["2", Array(2).fill(blankPieceNotation)],
    ["3", Array(3).fill(blankPieceNotation)],
    ["4", Array(4).fill(blankPieceNotation)],
    ["5", Array(5).fill(blankPieceNotation)],
    ["6", Array(6).fill(blankPieceNotation)],
    ["7", Array(7).fill(blankPieceNotation)],
    ["8", Array(8).fill(blankPieceNotation)],
]);
