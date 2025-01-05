import time
from Game import Game
from utils import *

start = time.time()

game = Game()

game.initLeapersAttacks()

# for sq in range(64):
#     printBitboard(game.king.kingAttacks[sq])

end = time.time()

print("Runtime : ", (end - start) * 1000, "ms")