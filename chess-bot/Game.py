from Pawn import Pawn
from Knight import Knight
from King import King
from Bishop import Bishop
from const import *
from utils import *

class Game:
    def __init__(self):
        self.pawn = Pawn()
        self.knight = Knight()
        self.king = King()
        self.bishop = Bishop()

    def initLeapersAttacks(self):
        for square in range(64):

            # init pawn attacks
            self.pawn.pawnAttacks[Color.WHITE.value][square] = self.pawn.maskPawnAttacks(Color.WHITE, square)
            self.pawn.pawnAttacks[Color.BLACK.value][square] = self.pawn.maskPawnAttacks(Color.BLACK, square)

            # init knight attacks
            self.knight.knightAttacks[square] = self.knight.maskKnightAttacks(square)

            # init king attacks
            self.king.kingAttacks[square] = self.king.maskKingAttacks(square)
    
    def test(self):
        for square in range(64):
            self.bishop.bishopAttacks[square] = self.bishop.maskBishopAttacks(square)
