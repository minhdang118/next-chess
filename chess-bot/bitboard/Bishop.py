import numpy as np
from const import *
from utils import *

class Bishop:
    def __init__(self):
        self.bishopAttacks = [np.uint64(0) for _ in range(64)]
    
    # generate bishop attacks bitboard
    def maskBishopAttacks(self, square: int):
        # result attacks bitboard
        attacks = np.uint64(0)

        # init target rank and file
        targetRank = int(square // 8)
        targetFile = int(square % 8)

        # mask relevant bishop occupancy bits
        for r, f in zip(range(targetRank + 1, 7, 1), range(targetFile + 1, 7, 1)):
            attacks |= (UNIT << r * 8 + f)
        
        for r, f in zip(range(targetRank - 1, 0, -1), range(targetFile + 1, 7, 1)):
            attacks |= (UNIT << r * 8 + f)

        for r, f in zip(range(targetRank + 1, 7, 1), range(targetFile - 1, 0, -1)):
            attacks |= (UNIT << r * 8 + f)

        for r, f in zip(range(targetRank - 1, 0, -1), range(targetFile - 1, 0, -1)):
            attacks |= (UNIT << r * 8 + f)

        # return attacks bitboard
        return attacks
    
    # # generate bishop attacks bitboard on the fly
    def bishopAttacksOnTheFly(self, square: int, block: np.uint64):
        # result attacks bitboard
        attacks = np.uint64(0)

        # init target rank and file
        targetRank = int(square // 8)
        targetFile = int(square % 8)

        # mask relevant bishop occupancy bits
        for r, f in zip(range(targetRank + 1, 8, 1), range(targetFile + 1, 8, 1)):
            attacks |= (UNIT << r * 8 + f)
            if (UNIT << r * 8 + f) & block:
                break
        
        for r, f in zip(range(targetRank - 1, -1, -1), range(targetFile + 1, 8, 1)):
            attacks |= (UNIT << r * 8 + f)
            if (UNIT << r * 8 + f) & block:
                break

        for r, f in zip(range(targetRank + 1, 8, 1), range(targetFile - 1, -1, -1)):
            attacks |= (UNIT << r * 8 + f)
            if (UNIT << r * 8 + f) & block:
                break

        for r, f in zip(range(targetRank - 1, -1, -1), range(targetFile - 1, -1, -1)):
            attacks |= (UNIT << r * 8 + f)
            if (UNIT << r * 8 + f) & block:
                break

        # return attacks bitboard
        return attacks