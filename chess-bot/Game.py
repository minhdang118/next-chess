from Pawn import Pawn
from Knight import Knight
from King import King
from Bishop import Bishop
from Rook import Rook
from const import *
from utils import *

class Game:
    def __init__(self):
        self.pawn = Pawn()
        self.knight = Knight()
        self.king = King()
        self.bishop = Bishop()
        self.rook = Rook()

    def initLeapersAttacks(self):
        for square in range(64):

            # init pawn attacks
            self.pawn.initAttacks(square)

            # init knight attacks
            self.knight.initAttacks(square)

            # init king attacks
            self.king.initAttacks(square)
    
    def test(self):
        block = ZERO
        block = setBit(block, 34)
        block = setBit(block, 11)
        block = setBit(block, 19)
        block = setBit(block, 39)
        printBitboard(block)

        for square in range(64):
            self.bishop.bishopAttacks[square] = self.bishop.bishopAttacksOnTheFly(square, block)
            self.rook.rookAttacks[square] = self.rook.rookAttacksOnTheFly(square, block)

        # for sq in range(64):
        #     printBitboard(self.bishop.bishopAttacks[sq])

        printBitboard(self.rook.rookAttacks[35])
