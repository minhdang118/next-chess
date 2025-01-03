import numpy as np

class Bitboard:
    def __init__(self):
        self.bitboard = np.int64(0)
        self.unit = np.int64(1)

    def getBit(self, square: int):
        return self.bitboard & (self.unit << square)
    
    def setBit(self, square: int):
        self.bitboard |= (self.unit << square)
    
    def popBit(self, square: int):
        if self.getBit(square):
            self.bitboard ^= (self.unit << square)
    
    def printBitboard(self):
        for rank in range(8):
            for file in range(8):
                square = rank * 8 + file
                if self.getBit(square):
                    print("1 ", end="")
                else:
                    print("0 ", end="")
            print()
        print("bitboard value: " + str(self.bitboard))


bb = Bitboard()
bb.setBit(35)
bb.setBit(30)
bb.setBit(3)
bb.setBit(16)
bb.popBit(30)
bb.printBitboard()