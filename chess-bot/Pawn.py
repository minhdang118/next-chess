import numpy as np
from const import *
from utils import *

class Pawn:
    def __init__(self):
        self.pawnAttacks = [[np.uint64(0) for _ in range(64)] for _ in range(2)]

    # generate pawn attacks bitboard
    def maskPawnAttacks(self, color: Color, square: int):
        # result attacks bitboard
        attacks = np.uint64(0)

        # piece bitboard
        bitboard = np.uint64(0)

        # set piece on board
        bitboard = setBit(bitboard, square)

        # white pawns
        if color is Color.WHITE:
            # generate pawn attacks
            if (bitboard >> 7) & NOT_A_FILE:
                attacks |= (bitboard >> 7)
            if (bitboard >> 9) & NOT_H_FILE:
                attacks |= (bitboard >> 9)

        # black pawns
        else:
            # generate pawn attacks
            if (bitboard << 7) & NOT_H_FILE:
                attacks |= (bitboard << 7)
            if (bitboard << 9) & NOT_A_FILE:
                attacks |= (bitboard << 9)


        # return attacks bitboard
        return attacks
    
