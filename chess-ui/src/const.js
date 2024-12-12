export const startingPositionFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// export const startingPositionFen = "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1";

export const PieceNotation = {
    "blank" : "-",
    "king" : "k",
    "queen" : "q",
    "bishop" : "b",
    "knight" : "n",
    "rook" : "r",
    "pawn" : "p"
}

export const ColorNotation = {
    "white" : "w",
    "black" : "b"
}

export const CastlingDirectionNotation = {
    "kingSide" : "kingSide",
    "queenSide" : "queenSide"
}

export const fenToStr = new Map([
    ["K", ColorNotation.white + PieceNotation.king],
    ["Q", ColorNotation.white + PieceNotation.queen],
    ["B", ColorNotation.white + PieceNotation.bishop],
    ["N", ColorNotation.white + PieceNotation.knight],
    ["R", ColorNotation.white + PieceNotation.rook],
    ["P", ColorNotation.white + PieceNotation.pawn],
    ["k", ColorNotation.black + PieceNotation.king],
    ["q", ColorNotation.black + PieceNotation.queen],
    ["b", ColorNotation.black + PieceNotation.bishop],
    ["n", ColorNotation.black + PieceNotation.knight],
    ["r", ColorNotation.black + PieceNotation.rook],
    ["p", ColorNotation.black + PieceNotation.pawn],
    ["1", Array(1).fill(PieceNotation.blank)],
    ["2", Array(2).fill(PieceNotation.blank)],
    ["3", Array(3).fill(PieceNotation.blank)],
    ["4", Array(4).fill(PieceNotation.blank)],
    ["5", Array(5).fill(PieceNotation.blank)],
    ["6", Array(6).fill(PieceNotation.blank)],
    ["7", Array(7).fill(PieceNotation.blank)],
    ["8", Array(8).fill(PieceNotation.blank)],
]);

export const Status = {
    "ongoing" : "Ongoing",
    "promoting" : "Promoting",
    "white" : "White wins",
    "black" : "Black wins"
}
