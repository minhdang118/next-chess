from enum import Enum
import numpy as np

class Color(Enum):
    WHITE = 0
    BLACK = 1

CHESS_RANKS_TO_RANKS = {
    "1": 7,
    "2": 6,
    "3": 5,
    "4": 4,
    "5": 3,
    "6": 2,
    "7": 1,
    "8": 0
}

CHESS_FILES_TO_FILES = {
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7
}

FEN_TO_BOARD_NOTATION = {
    "K": "wK",
    "Q": "wQ",
    "B": "wB",
    "N": "wN",
    "R": "wR",
    "P": "wP",
    "k": "bK",
    "q": "bQ",
    "b": "bB",
    "n": "bN",
    "r": "bR",
    "p": "bP"
}

UNIT = np.uint64(1)
NOT_A_FILE = np.uint64(18374403900871474942)
NOT_H_FILE = np.uint64(9187201950435737471)
NOT_AB_FILE = np.uint64(18229723555195321596)
NOT_GH_FILE = np.uint64(4557430888798830399)
