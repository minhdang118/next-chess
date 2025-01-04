import numpy as np

unit = np.uint64(1)

def getBit(bitboard: np.uint64, square: int):
        return bitboard & (unit << square)
    
def setBit(bitboard: np.uint64, square: int):
    return bitboard | (unit << square)

def popBit(bitboard: np.uint64, square: int):
    if getBit(bitboard, square):
        return bitboard ^ (unit << square)
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