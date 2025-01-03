def getBoardGraphics(board: list[list[int]]):
    boardGraphics = getTopEdge()
    for i in range(8):
        if i != 0:
            boardGraphics += getMiddleSep()
        boardGraphics += getRowGraphics(board[i])
    boardGraphics += getBottomEdge()
    return boardGraphics

def getMiddleSep():
    middleSep = "\u255f"
    for _ in range(7):
        middleSep += "\u2500\u2500\u2500\u2500\u253c"
    middleSep += "\u2500\u2500\u2500\u2500\u2562"
    return middleSep + "\n"

def getTopEdge():
    topEdge = "\u2554"
    for _ in range(7):
        topEdge += "\u2550\u2550\u2550\u2550\u2564"
    topEdge += "\u2550\u2550\u2550\u2550\u2557"
    return topEdge + "\n"

def getBottomEdge():
    bottomEdge = "\u255a"
    for _ in range(7):
        bottomEdge += "\u2550\u2550\u2550\u2550\u2567"
    bottomEdge += "\u2550\u2550\u2550\u2550\u255d"
    return bottomEdge + "\n"

def getRowGraphics(row: list[str]):
    rowGraphics = "\u2551"
    for j in range(8):
        rowGraphics += "\u0020"
        piece = row[j]
        if piece == "--":
            rowGraphics += "\u0020"
        elif piece.startswith("w"):
            if piece.endswith("K"):
                rowGraphics += "\u2654"
            elif piece.endswith("Q"):
                rowGraphics += "\u2655"
            elif piece.endswith("B"):
                rowGraphics += "\u2657"
            elif piece.endswith("N"):
                rowGraphics += "\u2658"
            elif piece.endswith("R"):
                rowGraphics += "\u2656"
            elif piece.endswith("P"):
                rowGraphics += "\u2659"
            
        elif piece.startswith("b"):
            if piece.endswith("K"):
                rowGraphics += "\u265a"
            elif piece.endswith("Q"):
                rowGraphics += "\u265b"
            elif piece.endswith("B"):
                rowGraphics += "\u265d"
            elif piece.endswith("N"):
                rowGraphics += "\u265e"
            elif piece.endswith("R"):
                rowGraphics += "\u265c"
            elif piece.endswith("P"):
                rowGraphics += "\u265f"
        rowGraphics += "\u0020\u0020"
        if j < 7:
            rowGraphics += "\u2502"
    rowGraphics += "\u2551"
    return rowGraphics + "\n"

