class Move:
    def __init__(self, board: list[list[str]], startSq: tuple[int], endSq: tuple[int]):
        self.startRank = startSq[0]
        self.startFile = startSq[1]
        self.endRank = endSq[0]
        self.endFile = endSq[1]
        self.pieceMoved = board[self.startRank][self.startFile]
        self.pieceCaptured = board[self.endRank][self.endFile]
        self.moveId = self.startRank * 1000 + self.startFile * 100 + self.endRank * 10 + self.endFile

    '''
    Overriding the equals method
    '''
    def __eq__(self, other):
        if isinstance(other, Move):
            return self.moveId == other.moveId
        return False