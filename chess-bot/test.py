import numpy as np

t = 2.0
 
t1 = int(t)
print(f"t1 = {type(t1)}")
 
 
t2 = np.int32(t)
print(f"t2 = {type(t2)}")
 
t3 = np.int64(t)
print(f"t3 = {type(t3)}")