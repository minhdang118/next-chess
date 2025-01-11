import numpy as np
from utils import *

block = np.uint64(0)
block = setBit(block, 34)
block = setBit(block, 11)
block = setBit(block, 19)
block = setBit(block, 39)
printBitboard(block)
# print(getLs1bIndex(block))

printBitboard((block & (~block + UNIT)) - UNIT)