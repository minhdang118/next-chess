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

# count bits using Brian Kernighan's way
def countBits(bitboard: np.uint64):
    count = 0
    while bitboard:
        count += 1
        bitboard &= bitboard - UNIT
    return count

# get least significant 1st bit index
def getLs1bIndex(bitboard: np.uint64):
    # make sure bitboard is not 0
    if bitboard:
        # count trailing bits before LS1B
        return countBits((bitboard & (~bitboard + UNIT)) - UNIT)

    # otherwise
    else:
        return -1