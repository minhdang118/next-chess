import numpy as np
from utils import *

bb = np.uint64(0)

for rank in range(8):
    for file in range(8):
        square = rank * 8 + file
        if file > 1:
            bb = setBit(bb, square)

printBitboard(bb)