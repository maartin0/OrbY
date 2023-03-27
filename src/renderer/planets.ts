import Body, { circularOrbit } from './body';

new Body('Sun', 50, 0xfcf803, circularOrbit(0.01)).focused = true;
new Body('Mercury', 1/6, 0x6a838f, circularOrbit(50));
new Body('Venus', 0.45, 0xa39679, circularOrbit(53.2));
new Body('Earth', 0.5, 0x4fc253, circularOrbit(55.8));
new Body('Mars', 0.25, 0xe08358, circularOrbit(60.7));
new Body('Jupiter', 5.5, 0xf0c7b4, circularOrbit(94.9));
new Body('Saturn', 4.5, 0xba8616, circularOrbit(135.4));
new Body('Uranus', 2, 0x6a8a7e, circularOrbit(225.5));
new Body('Neptune', 1.5, 0x3a4dde, circularOrbit(334.5));
new Body('Pluto', 1/12, 0xbac9cf, circularOrbit(413.5));
