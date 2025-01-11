import numpy as np
from const import *
from utils import *

class King:
    def __init__(self):
        self.kingAttacks = [np.uint64(0) for _ in range(64)]
    
    def initAttacks(self, square: int):
        self.kingAttacks[square] = self.maskKingAttacks(square)
    
    # generate king attacks bitboard
    def maskKingAttacks(self, square: int):
        # result attacks bitboard
        attacks = np.uint64(0)

        # piece bitboard
        bitboard = np.uint64(0)

        # set piece on board
        bitboard = setBit(bitboard, square)

        # generate king attacks
        if bitboard >> 8:
            attacks |= (bitboard >> 8)
        if (bitboard >> 9) & NOT_H_FILE:
            attacks |= (bitboard >> 9)
        if (bitboard >> 7) & NOT_A_FILE:
            attacks |= (bitboard >> 7)
        if (bitboard >> 1) & NOT_H_FILE:
            attacks |= (bitboard >> 1)
        
        if bitboard << 8:
            attacks |= (bitboard << 8)
        if (bitboard << 9) & NOT_A_FILE:
            attacks |= (bitboard << 9)
        if (bitboard << 7) & NOT_H_FILE:
            attacks |= (bitboard << 7)
        if (bitboard << 1) & NOT_A_FILE:
            attacks |= (bitboard << 1)

        # return attacks bitboard
        return attacks
