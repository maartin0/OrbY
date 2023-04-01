import Body from './Body';
import { circularOrbit, ellipticalOrbit } from './orbits';
import { yearMs } from '../util/date';

/* Circular Orbits
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
*/

const conv = (years: number): bigint => BigInt(Number(yearMs) * years);
const scale: number = 1 / 23481.4;
new Body('Sun', 109.123 * scale, 0xfcf803, circularOrbit(0)).focused = true;
new Body('Mercury', 0.383 * scale, 0x6a838f, ellipticalOrbit(0.387, 0.21, conv(0.241)));
new Body('Venus', 0.949 * scale, 0xa39679, ellipticalOrbit(0.723, 0.01, conv(0.615)));
new Body('Earth', scale, 0x4fc253, ellipticalOrbit(1, 0.02, conv(1)));
new Body('Mars', 0.533 * scale, 0xe08358, ellipticalOrbit(1.523, 0.09, conv(1.881)));
new Body('Jupiter', 11.209 * scale, 0xf0c7b4, ellipticalOrbit(5.202, 0.05, conv(11.861)));
new Body('Saturn', 9.449 * scale, 0xba8616, ellipticalOrbit(9.576, 0.06, conv(29.628)));
new Body('Uranus', 4.007 * scale, 0x6a8a7e, ellipticalOrbit(19.293, 0.05, conv(84.747)));
new Body('Neptune', 3.883 * scale, 0x3a4dde, ellipticalOrbit(30.246, 0.01, conv(166.344)));
new Body('Pluto', 0.187 * scale, 0xbac9cf, ellipticalOrbit(39.509,0.25, conv(248.348)));
