from matplotlib import pyplot as plt
import math

def f(x, E):
    return (1 - E * math.cos(x)) ** -2

def tFromTheta(theta, previous, E, i, h):
    if i == 0:
        c = 1
    elif i & 1 == 1:
        c = 4
    else:
        c = 2

    return previous + (1/3) * h * c * f(theta, E)

E = [ 0.21,  0.01,  0.02,  0.09,   0.05,   0.06,   0.05,    0.01,    0.25]
T = [0.241, 0.615, 1.000, 1.881, 11.861, 29.628, 84.747, 166.344, 248.348]
h = 0.001

theta0 = 0
totalPeriod = T[8] * 3

N = totalPeriod/T[8]

i = 0
theta = [theta0]
tC = [tFromTheta(theta[i], 0, 0, i, h)]
tP = [tFromTheta(theta[i], 0, 0, i, h)]
i += 1

while theta0 + h*i <= 2 * math.pi * N + theta0:
    theta.append(theta0 + h*i)
    tC.append(tFromTheta(theta[i], tC[i - 1], 0, i, h))
    tP.append(tFromTheta(theta[i], tP[i - 1], E[8], i, h))
    i += 1

theta.append(theta0 + h*i)
tC.append(tFromTheta(theta[i], tC[i - 1], 0, 0, h))
tP.append(tFromTheta(theta[i], tP[i - 1], E[8], 0, h))

cC = T[8]/(2 * math.pi)
cP = (T[8]/(2 * math.pi)) * ((1 - E[8] ** 2) ** (1.5))

for n in range(i + 1):
    tC[n] *= cC
    tP[n] *= cP


plt.plot(tC, theta, color = "b", label = "Circular, ε = 0")
plt.plot(tP, theta, color = "g", label = "Pluto, ε = 0.25")
plt.xlabel("time / Yr")
plt.ylabel("orbit angle / rad")
plt.title("Task 5 - Orbit Angle vs Time")
plt.legend()
plt.savefig("../docs/Task_5.png")
plt.show()
