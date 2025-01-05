import numpy as np
from const import *
from utils import *

class Knight:
    def __init__(self):
        self.knightAttacks = [np.uint64(0) for _ in range(64)]

    def initAttacks(self, square: int):
        self.knightAttacks[square] = self.maskKnightAttacks(square)
    
    # generate knight attacks bitboard
    def maskKnightAttacks(self, square: int):
        # result attacks bitboard
        attacks = np.uint64(0)

        # piece bitboard
        bitboard = np.uint64(0)

        # set piece on board
        bitboard = setBit(bitboard, square)

        # generate knight attacks
        if (bitboard >> 17) & NOT_H_FILE:
            attacks |= (bitboard >> 17)
        if (bitboard >> 15) & NOT_A_FILE:
            attacks |= (bitboard >> 15)
        if (bitboard >> 10) & NOT_GH_FILE:
            attacks |= (bitboard >> 10)
        if (bitboard >> 6) & NOT_AB_FILE:
            attacks |= (bitboard >> 6)

        if (bitboard << 17) & NOT_A_FILE:
            attacks |= (bitboard << 17)
        if (bitboard << 15) & NOT_H_FILE:
            attacks |= (bitboard << 15)
        if (bitboard << 10) & NOT_AB_FILE:
            attacks |= (bitboard << 10)
        if (bitboard << 6) & NOT_GH_FILE:
            attacks |= (bitboard << 6)

        # return attacks bitboard
        return attacks
