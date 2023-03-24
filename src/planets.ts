import { circularOrbit, SimpleBody } from './body';

// Sun
new SimpleBody(1, 0xfcf803, circularOrbit(0));

// Earth
new SimpleBody(0.5, 0x4fc253, circularOrbit(2));
