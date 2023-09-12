import {PhysicalBody, PhysicalBodyType} from '../types';

export const SUN: PhysicalBody = {
    id: 10,
    label: 'Sun',
    type: PhysicalBodyType.STAR,
    defaultSelected: true,
    texture: {
        color: '#FFE484',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Sun',
    },
    properties: {
        radiusAu: 0.00465046726,
        massRel: 332837,
        rotationPeriodYears: 0,
        elements: {
            semiMajorAxisAu: 0,
            eccentricity: 0,
            inclinationDegrees: 0,
            orbitalPeriodYears: 1,
            perihelionLongitudeDegrees: 0,
            ascendingLongitudeDegrees: 0,
            trueAnomalyDegrees: 0,
            startingLongitudeDegrees: 0,
        },
        elementPairs: {
            semiMajorAxisAu: {mul: 0, offset: 0},
            eccentricity: {mul: 0, offset: 0},
            inclinationDegrees: {mul: 0, offset: 0},
            perihelionLongitudeDegrees: {mul: 0, offset: 0},
            ascendingLongitudeDegrees: {mul: 0, offset: 0},
            startingLongitudeDegrees: {mul: 0, offset: 0},
        },
    },
};
export const MERCURY: PhysicalBody = {
    id: 199,
    label: 'Mercury',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#B7B8B9',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Mercury_(planet)',
    },
    properties: {
        radiusAu: 1.63104e-5,
        massRel: 0.055,
        rotationPeriodYears: 0.160563997262,
        elements: {
            semiMajorAxisAu: 0.387,
            eccentricity: 0.21,
            inclinationDegrees: 7.00,
            orbitalPeriodYears: 0.241,
            perihelionLongitudeDegrees: 29.124,
            ascendingLongitudeDegrees: 48.331,
            trueAnomalyDegrees: 172.792,
            startingLongitudeDegrees: 201.916,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 0.38709927,
                "offset": 3.7e-07
            },
            "eccentricity": {
                "mul": 0.20563593,
                "offset": 1.906e-05
            },
            "inclinationDegrees": {
                "mul": 7.00497902,
                "offset": -0.00594749
            },
            "startingLongitudeDegrees": {
                "mul": 252.2503235,
                "offset": 149472.67411175
            },
            "perihelionLongitudeDegrees": {
                "mul": 77.45779628,
                "offset": 0.16047689
            },
            "ascendingLongitudeDegrees": {
                "mul": 48.33076593,
                "offset": -0.12534081
            },
        },
    },
};
export const VENUS: PhysicalBody = {
    id: 299,
    label: 'Venus',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#FFC649',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Venus',
    },
    properties: {
        radiusAu: 4.04540517e-5,
        massRel: 0.815,
        rotationPeriodYears: 0.665347022587,
        elements: {
            semiMajorAxisAu: 0.723,
            eccentricity: 0.01,
            inclinationDegrees: 3.39,
            orbitalPeriodYears: 0.615,
            perihelionLongitudeDegrees: 54.884,
            ascendingLongitudeDegrees: 76.680,
            trueAnomalyDegrees: 49.330,
            startingLongitudeDegrees: 104.214,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 0.72333566,
                "offset": 3.9e-06
            },
            "eccentricity": {
                "mul": 0.00677672,
                "offset": -4.107e-05
            },
            "inclinationDegrees": {
                "mul": 3.39467605,
                "offset": -0.0007889
            },
            "startingLongitudeDegrees": {
                "mul": 181.9790995,
                "offset": 58517.81538729
            },
            "perihelionLongitudeDegrees": {
                "mul": 131.60246718,
                "offset": 0.00268329
            },
            "ascendingLongitudeDegrees": {
                "mul": 76.67984255,
                "offset": -0.27769418
            }
        },
    },
};
export const EARTH: PhysicalBody = {
    id: 399,
    label: 'Earth',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#3a6635',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Earth',
    },
    properties: {
        radiusAu: 4.2635e-05,
        massRel: 1.000,
        rotationPeriodYears: 0.00272963723477,
        elements: {
            semiMajorAxisAu: 1.000,
            eccentricity: 0.02,
            inclinationDegrees: 0.00,
            orbitalPeriodYears: 1.000,
            perihelionLongitudeDegrees: 114.208,
            ascendingLongitudeDegrees: 348.739,
            trueAnomalyDegrees: 358.188,
            startingLongitudeDegrees: 112.396,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 1.00000261,
                "offset": 5.62e-06
            },
            "eccentricity": {
                "mul": 0.01671123,
                "offset": -4.392e-05
            },
            "inclinationDegrees": {
                "mul": -1.531e-05,
                "offset": -0.01294668
            },
            "startingLongitudeDegrees": {
                "mul": 100.46457166,
                "offset": 35999.37244981
            },
            "perihelionLongitudeDegrees": {
                "mul": 102.93768193,
                "offset": 0.32327364
            },
            "ascendingLongitudeDegrees": {
                "mul": 0.0,
                "offset": 0.0
            }
        },
    },
};
export const MARS: PhysicalBody = {
    id: 499,
    label: 'Mars',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#9C2E35',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Mars',
    },
    properties: {
        radiusAu: 2.26602156e-5,
        massRel: 0.107,
        rotationPeriodYears: 0.0028090349076,
        elements: {
            semiMajorAxisAu: 1.523,
            eccentricity: 0.09,
            inclinationDegrees: 1.85,
            orbitalPeriodYears: 1.881,
            perihelionLongitudeDegrees: 286.500,
            ascendingLongitudeDegrees: 49.579,
            trueAnomalyDegrees: 19.160,
            startingLongitudeDegrees: 305.660,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 1.52371034,
                "offset": 1.847e-05
            },
            "eccentricity": {
                "mul": 0.0933941,
                "offset": 7.882e-05
            },
            "inclinationDegrees": {
                "mul": 1.84969142,
                "offset": -0.00813131
            },
            "startingLongitudeDegrees": {
                "mul": -4.55343205,
                "offset": 19140.30268499
            },
            "perihelionLongitudeDegrees": {
                "mul": -23.94362959,
                "offset": 0.44441088
            },
            "ascendingLongitudeDegrees": {
                "mul": 49.55953891,
                "offset": -0.29257343
            }
        },
    },
};
export const JUPITER: PhysicalBody = {
    id: 599,
    label: 'Jupiter',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#E3DCCB',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Jupiter',
    },
    properties: {
        radiusAu: 0.00046732617,
        massRel: 317.850,
        rotationPeriodYears: 0.00113073237509,
        elements: {
            semiMajorAxisAu: 5.202,
            eccentricity: 0.05,
            inclinationDegrees: 1.31,
            orbitalPeriodYears: 11.861,
            perihelionLongitudeDegrees: 273.867,
            ascendingLongitudeDegrees: 100.464,
            trueAnomalyDegrees: 18.759,
            startingLongitudeDegrees: 292.626,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 5.202887,
                "offset": -0.00011607
            },
            "eccentricity": {
                "mul": 0.04838624,
                "offset": -0.00013253
            },
            "inclinationDegrees": {
                "mul": 1.30439695,
                "offset": -0.00183714
            },
            "startingLongitudeDegrees": {
                "mul": 34.39644051,
                "offset": 3034.74612775
            },
            "perihelionLongitudeDegrees": {
                "mul": 14.72847983,
                "offset": 0.21252668
            },
            "ascendingLongitudeDegrees": {
                "mul": 100.47390909,
                "offset": 0.20469106
            }
        },
    },
};
export const SATURN: PhysicalBody = {
    id: 699,
    label: 'Saturn',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#7B7869',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Saturn',
    },
    properties: {
        radiusAu: 1.51474185388e-13,
        massRel: 95.159,
        rotationPeriodYears: 0.00121560574949,
        elements: {
            semiMajorAxisAu: 9.576,
            eccentricity: 0.06,
            inclinationDegrees: 2.49,
            orbitalPeriodYears: 29.628,
            perihelionLongitudeDegrees: 339.392,
            ascendingLongitudeDegrees: 113.665,
            trueAnomalyDegrees: 320.299,
            startingLongitudeDegrees: 299.691,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 9.53667594,
                "offset": -0.0012506
            },
            "eccentricity": {
                "mul": 0.05386179,
                "offset": -0.00050991
            },
            "inclinationDegrees": {
                "mul": 2.48599187,
                "offset": 0.00193609
            },
            "startingLongitudeDegrees": {
                "mul": 49.95424423,
                "offset": 1222.49362201
            },
            "perihelionLongitudeDegrees": {
                "mul": 92.59887831,
                "offset": -0.41897216
            },
            "ascendingLongitudeDegrees": {
                "mul": 113.66242448,
                "offset": -0.28867794
            }
        },
    },
};
export const URANUS: PhysicalBody = {
    id: 799,
    label: 'Uranus',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#B2D6DB',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Uranus',
    },
    properties: {
        radiusAu: 0.0001695345,
        massRel: 14.500,
        rotationPeriodYears: 0.00196577686516,
        elements: {
            semiMajorAxisAu: 19.293,
            eccentricity: 0.05,
            inclinationDegrees: 0.77,
            orbitalPeriodYears: 84.747,
            perihelionLongitudeDegrees: 96.999,
            ascendingLongitudeDegrees: 74.006,
            trueAnomalyDegrees: 142.965,
            startingLongitudeDegrees: 239.964,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 19.18916464,
                "offset": -0.00196176
            },
            "eccentricity": {
                "mul": 0.04725744,
                "offset": -4.397e-05
            },
            "inclinationDegrees": {
                "mul": 0.77263783,
                "offset": -0.00242939
            },
            "startingLongitudeDegrees": {
                "mul": 313.23810451,
                "offset": 428.48202785
            },
            "perihelionLongitudeDegrees": {
                "mul": 170.9542763,
                "offset": 0.40805281
            },
            "ascendingLongitudeDegrees": {
                "mul": 74.01692503,
                "offset": 0.04240589
            }
        },
    },
};
export const NEPTUNE: PhysicalBody = {
    id: 899,
    label: 'Neptune',
    type: PhysicalBodyType.PLANET,
    parent: SUN,
    defaultSelected: true,
    texture: {
        color: '#2990B5',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Neptune',
    },
    properties: {
        radiusAu: 0.00016460127,
        massRel: 17.204,
        rotationPeriodYears: 0.00183709787817,
        elements: {
            semiMajorAxisAu: 30.246,
            eccentricity: 0.01,
            inclinationDegrees: 1.77,
            orbitalPeriodYears: 166.344,
            perihelionLongitudeDegrees: 273.187,
            ascendingLongitudeDegrees: 131.783,
            trueAnomalyDegrees: 267.266,
            startingLongitudeDegrees: 180.453,
        },
        elementPairs: {
            "semiMajorAxisAu": {
                "mul": 30.06992276,
                "offset": 0.00026291
            },
            "eccentricity": {
                "mul": 0.00859048,
                "offset": 5.105e-05
            },
            "inclinationDegrees": {
                "mul": 1.77004347,
                "offset": 0.00035372
            },
            "startingLongitudeDegrees": {
                "mul": -55.12002969,
                "offset": 218.45945325
            },
            "perihelionLongitudeDegrees": {
                "mul": 44.96476227,
                "offset": -0.32241464
            },
            "ascendingLongitudeDegrees": {
                "mul": 131.78422574,
                "offset": -0.00508664
            }
        },
    },
};
export const PLUTO: PhysicalBody = {
    id: 134340,
    label: 'Pluto',
    type: PhysicalBodyType.DWARF_PLANET,
    parent: SUN,
    defaultSelected: false,
    texture: {
        color: '#968570',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Pluto',
    },
    properties: {
        radiusAu: 7.9432949e-6,
        massRel: 0.003,
        rotationPeriodYears: 0.0174866529774,
        elements: {
            semiMajorAxisAu: 39.509,
            eccentricity: 0.25,
            inclinationDegrees: 17.5,
            orbitalPeriodYears: 248.348,
            perihelionLongitudeDegrees: 113.834,
            ascendingLongitudeDegrees: 110.299,
            trueAnomalyDegrees: 14.265,
            startingLongitudeDegrees: 128.099,
        },
        elementPairs: {
            semiMajorAxisAu: {mul: 0, offset: 39.509},
            eccentricity: {mul: 0, offset: 0.25},
            inclinationDegrees: {mul: 0, offset: 17.5},
            perihelionLongitudeDegrees: {mul: 0, offset: 113.834},
            ascendingLongitudeDegrees: {mul: 0, offset: 110.299},
            startingLongitudeDegrees: {mul: 0, offset: 128.099},
        },
    },
};
/*export const MOON: PhysicalBody = {
    id: 301,
    label: 'Moon',
    type: PhysicalBodyType.MOON,
    parent: EARTH,
    defaultSelected: true,
    texture: {
        color: '#F6F1D5',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Moon',
    },
    properties: {
        radiusAu: 1.16146707e-5,
        massRel: ,
        timePeriodYears: ,
        startingLongitudeDegrees: ,
        elements: {
            semiMajorAxisAu: ,
            eccentricity: ,
            inclinationDegrees: ,
            orbitalPeriodYears: ,
            perihelionLongitudeDegrees: ,
            ascendingLongitudeDegrees: ,
        },
    },
}*/

export default {SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO, /*MOON*/};
