import numpy as np
from const import *

def getBit(bitboard: np.uint64, square: int):
        return bitboard & (UNIT << square)
    
def setBit(bitboard: np.uint64, square: int):
    return bitboard | (UNIT << square)

def popBit(bitboard: np.uint64, square: int):
    if getBit(bitboard, square):
        return bitboard ^ (UNIT << square)
    return bitboard

def printBitboard(bitboard: np.uint64):
        for rank in range(8):
            for file in range(8):
                square = rank * 8 + file
                if getBit(bitboard, square):
                    print("1 ", end="")
                else:
                    print("0 ", end="")
            print()
        print("bitboard value: " + str(bitboard))