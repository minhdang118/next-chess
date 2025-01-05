from Pawn import Pawn
from Knight import Knight
from King import King
from const import *
from utils import *

class Game:
    def __init__(self):
        self.pawn = Pawn()
        self.knight = Knight()
        self.king = King()

    def initLeapersAttacks(self):
        for square in range(64):

            # init pawn attacks
            self.pawn.pawnAttacks[Color.WHITE.value][square] = self.pawn.maskPawnAttacks(Color.WHITE, square)
            self.pawn.pawnAttacks[Color.BLACK.value][square] = self.pawn.maskPawnAttacks(Color.BLACK, square)

            # init knight attacks
            self.knight.knightAttacks[square] = self.knight.maskKnightAttacks(square)

            # init king attacks
            self.king.kingAttacks[square] = self.king.maskKingAttacks(square)


# g = Game()
# g.initLeapersAttacks()
# for sq in range(64):
#     printBitboard(g.king.kingAttacks[sq])