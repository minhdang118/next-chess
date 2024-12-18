from const import *
from Move import *

class GameState:
    def __init__(self, fen: str):
        self.board = self.fenToBoard(fen)
        self.whiteToMove = True
        self.moveLog: list[Move] = []
        self.getMoves = {
            "K" : self.getKingMoves,
            "Q" : self.getQueenMoves,
            "B" : self.getBishopMoves,
            "N" : self.getKnightMoves,
            "R" : self.getRookMoves,
            "P" : self.getPawnMoves
        }

    def boardToFen(self, board):
        pass

    def fenToBoard(self, fen: str):
        board = [[], [], [], [], [], [], [], []]
        fenSplit = fen.split(" ")
        fenRows = fenSplit[0].split("/")
        for idx, row in enumerate(fenRows):
            for char in row:
                if char.isnumeric():
                    for i in range(int(char)):
                        board[idx].append("--")
                else:
                    board[idx].append(FEN_TO_BOARD_NOTATION.get(char))
        
        return board

    def makeMove(self, move: Move):
        self.board[move.startRank][move.startFile] = "--"
        self.board[move.endRank][move.endFile] = move.pieceMoved
        self.moveLog.append(move)
        self.whiteToMove = not self.whiteToMove

    def getValidMoves(self):
        return self.getAllPossibleMoves()

    def getAllPossibleMoves(self):
        moves: list[Move] = []

        for r in range(len(self.board)):
            for f in range(len(self.board[r])):
                turn = self.board[r][f][0]
                if (turn == "w" and self.whiteToMove) or (turn == "b" and not self.whiteToMove):
                    piece = self.board[r][f][1]
                    self.getMoves[piece](r, f, moves) # calls the moves function for the according piece


    '''
    Get king moves from its rank and file, then add to the moves list
    '''
    def getKingMoves(self, r: int, f: int, moves: list[Move]):
        directions = ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1))
        oppColor = "b" if self.whiteToMove else "w"
        for i in range(8):
            endRank = r + dir[i][0]
            endFile = f + dir[i][1]
            if 0 <= endRank < 8 and 0 <= endFile < 8: # on the board
                endPiece = self.board[endRank][endFile]
                if endPiece == "--" or endPiece[0] == oppColor: # can move to blank square or capture opp piece
                    moves.append(Move(self.board, (r, f), (endRank, endFile)))


    '''
    Get queen moves from its rank and file, then add to the moves list
    '''
    def getQueenMoves(self, r: int, f: int, moves: list[Move]):
        self.getBishopMoves(r, f, moves)
        self.getRookMoves(r, f, moves)


    '''
    Get bishop moves from its rank and file, then add to the moves list
    '''
    def getBishopMoves(self, r: int, f: int, moves: list[Move]):
        directions = ((-1, -1), (-1, 1), (1, -1), (1, 1))
        oppColor = "b" if self.whiteToMove else "w"
        for dir in directions:
            for i in range(1, 8):
                endRank = r + dir[0] * i
                endFile = f + dir[1] * i
                if 0 <= endRank < 8 and 0 <= endFile < 8: # on the board
                    endPiece = self.board[endRank][endFile]
                    if endPiece == "--": # can move to blank square
                        moves.append(Move(self.board, (r, f), (endRank, endFile)))
                    elif endPiece[0] == oppColor: # can capture opp piece
                        moves.append(Move(self.board, (r, f), (endRank, endFile)))
                        break
                    else: # cannot capture fellow piece
                        break
                else: # off the board
                    break
    

    '''
    Get knight moves from its rank and file, then add to the moves list
    '''
    def getKnightMoves(self, r: int, f: int, moves: list[Move]):
        directions = ((-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1))
        oppColor = "b" if self.whiteToMove else "w"
        for dir in directions:
            endRank = r + dir[0]
            endFile = f + dir[1]
            if 0 <= endRank < 8 and 0 <= endFile < 8: # on the board
                endPiece = self.board[endRank][endFile]
                if endPiece == "--" or endPiece[0] == oppColor: # can move to blank square or capture opp piece
                    moves.append(Move(self.board, (r, f), (endRank, endFile)))

    
    '''
    Get rook moves from its rank and file, then add to the moves list
    '''
    def getRookMoves(self, r: int, f: int, moves: list[Move]):
        directions = ((-1, 0), (0, -1), (1, 0), (0, 1))
        oppColor = "b" if self.whiteToMove else "w"
        for dir in directions:
            for i in range(1, 8):
                endRank = r + dir[0] * i
                endFile = f + dir[1] * i
                if 0 <= endRank < 8 and 0 <= endFile < 8: # on the board
                    endPiece = self.board[endRank][endFile]
                    if endPiece == "--": # can move to blank square
                        moves.append(Move(self.board, (r, f), (endRank, endFile)))
                    elif endPiece[0] == oppColor: # can capture opp piece
                        moves.append(Move(self.board, (r, f), (endRank, endFile)))
                        break
                    else: # cannot capture fellow piece
                        break
                else: # off the board
                    break


    '''
    Get pawn moves from its rank and file, then add to the moves list
    '''
    def getPawnMoves(self, r: int, f: int, moves: list[Move]):
        if self.whiteToMove: # white pawn moves
            # advancing
            if self.board[r - 1][f] == "--": # one-square
                moves.append(Move(self.board, (r, f), (r - 1, f)))
                if r == 6 and self.board[r - 2][f] == "--": # two-square
                    moves.append(Move(self.board, (r, f), (r - 2, f)))
            
            # capturing
            if f > 0: # to the left
                if self.board[r - 1][f - 1][0] == "b": # opp color
                    moves.append(Move(self.board, (r, f), (r - 1, f - 1)))
            if f < 7: # to the right
                if self.board[r - 1][f + 1][0] == "b": # opp color
                    moves.append(Move(self.board, (r, f), (r - 1, f + 1)))

        else: # black pawn moves
            # advancing
            if self.board[r + 1][f] == "--": # one-square
                moves.append(Move(self.board, (r, f), (r + 1, f)))
                if r == 1 and self.board[r + 2][f] == "--": # two-square
                    moves.append(Move(self.board, (r, f), (r + 2, f)))
            
            # capturing
            if f > 0: # to the left
                if self.board[r + 1][f - 1][0] == "w": # opp color
                    moves.append(Move(self.board, (r, f), (r - 1, f - 1)))
            if f < 7: # to the right
                if self.board[r + 1][f + 1][0] == "w": # opp color
                    moves.append(Move(self.board, (r, f), (r - 1, f + 1)))
        
        # TODO: Add promotions and en passant



gs = GameState()
fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
print(gs.fenToBoard(fen=fen))
