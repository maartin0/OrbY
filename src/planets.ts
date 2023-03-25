import { circularOrbit, SimpleBody } from './body';

// Sun
new SimpleBody(10, 0xfcf803, circularOrbit(0.01));

// Mercury
new SimpleBody(1/6, 0x6a838f, circularOrbit(13.5));

// Venus
new SimpleBody(0.45, 0xa39679, circularOrbit(16.7));

// Earth
new SimpleBody(0.5, 0x4fc253, circularOrbit(19.3));

// Mars
new SimpleBody(0.25, 0xe08358, circularOrbit(24.2));

// Jupiter
new SimpleBody(5.5, 0xf0c7b4, circularOrbit(58.4));

// Saturn
new SimpleBody(4.5, 0xba8616, circularOrbit(98.9));

// Uranus
new SimpleBody(2, 0x6a8a7e, circularOrbit(189));

// Neptune
new SimpleBody(1.5, 0x3a4dde, circularOrbit(298));

// Pluto
new SimpleBody(1/12, 0xbac9cf, circularOrbit(377));
