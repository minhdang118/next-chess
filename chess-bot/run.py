import time
from Game import Game
from utils import *

start = time.time()

game = Game()

game.initLeapersAttacks()

game.test()

end = time.time()

print("\nRuntime : ", (end - start) * 1000, "ms")