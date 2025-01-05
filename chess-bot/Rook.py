import numpy as np
from const import *
from utils import *

class Rook:
    def __init__(self):
        self.rookAttacks = [np.uint64(0) for _ in range(64)]
    
    # generate rook attacks bitboard
    def maskRookAttacks(self, square: int):
        # result attacks bitboard
        attacks = np.uint64(0)

        # init target rank and file
        targetRank = int(square // 8)
        targetFile = int(square % 8)

        # mask relevant rook occupancy bits
        for r in range(targetRank + 1, 7, 1):
            attacks |= (UNIT << r * 8 + targetFile)
        
        for r in range(targetRank - 1, 0, -1):
            attacks |= (UNIT << r * 8 + targetFile)

        for f in range(targetFile + 1, 7, 1):
            attacks |= (UNIT << targetRank * 8 + f)

        for f in range(targetFile - 1, 0, -1):
            attacks |= (UNIT << targetRank * 8 + f)
        
        # return attacks bitboard
        return attacks
    
    # generate rook attacks bitboard on the fly
    def rookAttacksOnTheFly(self, square: int, block: np.uint64):
        # result attacks bitboard
        attacks = np.uint64(0)

        # init target rank and file
        targetRank = int(square // 8)
        targetFile = int(square % 8)

        # mask relevant rook occupancy bits
        for r in range(targetRank + 1, 8, 1):
            attacks |= (UNIT << r * 8 + targetFile)
            if (UNIT << r * 8 + targetFile) & block:
                break
        
        for r in range(targetRank - 1, -1, -1):
            attacks |= (UNIT << r * 8 + targetFile)
            if (UNIT << r * 8 + targetFile) & block:
                break

        for f in range(targetFile + 1, 8, 1):
            attacks |= (UNIT << targetRank * 8 + f)
            if (UNIT << targetRank * 8 + f) & block:
                break

        for f in range(targetFile - 1, -1, -1):
            attacks |= (UNIT << targetRank * 8 + f)
            if (UNIT << targetRank * 8 + f) & block:
                break
        
        # return attacks bitboard
        return attacks