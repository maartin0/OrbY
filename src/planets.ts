import { circularOrbit, SimpleBody } from './body';

// Sun
new SimpleBody(50, 0xfcf803, circularOrbit(0.01));

// Mercury
new SimpleBody(1/6, 0x6a838f, circularOrbit(50));

// Venus
new SimpleBody(0.45, 0xa39679, circularOrbit(53.2));

// Earth
new SimpleBody(0.5, 0x4fc253, circularOrbit(55.8));

// Mars
new SimpleBody(0.25, 0xe08358, circularOrbit(60.7));

// Jupiter
new SimpleBody(5.5, 0xf0c7b4, circularOrbit(94.9));

// Saturn
new SimpleBody(4.5, 0xba8616, circularOrbit(135.4));

// Uranus
new SimpleBody(2, 0x6a8a7e, circularOrbit(225.5));

// Neptune
new SimpleBody(1.5, 0x3a4dde, circularOrbit(334.5));

// Pluto
new SimpleBody(1/12, 0xbac9cf, circularOrbit(413.5));
