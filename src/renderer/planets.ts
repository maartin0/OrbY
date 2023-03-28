import Body, { circularOrbit } from './Body';

new Body('Sun', 50, 0xfcf803, circularOrbit(0.01)).focused = true;
new Body('Mercury', 20/3, 0x6a838f, circularOrbit(50, 47.87/29.78));
new Body('Venus', 22/3, 0xa39679, circularOrbit(53.2, 35.02/29.78));
new Body('Earth', 23/3, 0x4fc253, circularOrbit(55.8, 1));
new Body('Mars', 7/2, 0xe08358, circularOrbit(60.7, 24.077/29.78));
new Body('Jupiter', 10, 0xf0c7b4, circularOrbit(94.9, 13.07/29.78));
new Body('Saturn', 9, 0xba8616, circularOrbit(135.4, 9.69/29.78));
new Body('Uranus', 8, 0x6a8a7e, circularOrbit(225.5, 6.81/29.78));
new Body('Neptune', 7.6, 0x3a4dde, circularOrbit(334.5, 5.43/29.78));
new Body('Pluto', 19/3, 0xbac9cf, circularOrbit(413.5, 4.74/29.78));
