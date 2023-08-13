from matplotlib import pyplot as plt

a = [0.387, 0.723, 1.000, 1.523,  5.202,  9.576, 19.293,  30.246,  39.509]
T = [0.241, 0.615, 1.000, 1.881, 11.861, 29.628, 84.747, 166.344, 248.348]

x = []
for i in a:
    x.append(i ** 1.5)

y = T

plt.scatter(x, y, color = "b", marker = "x", label = "(a^(3/2), T)")
plt.plot([x[0],x[8]], [x[0],x[8]], color = "r", label = "y = x")
plt.xlabel("(a / AU)^(3/2)")
plt.ylabel("T / Yr")
plt.title("Task 1 - Kepler's Third Law")
plt.legend()
plt.savefig("../docs/Task_1.png")
plt.show()
