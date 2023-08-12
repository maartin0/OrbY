import { PhysicalBody, PhysicalBodyType } from '../../types';

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
        startingLongitudeDegrees: 0,
        elements: {
            semiMajorAxisAu: 0,
            eccentricity: 0,
            inclinationDegrees: 0,
            orbitalPeriodYears: 1,
            perihelionLongitudeDegrees: 0,
            ascendingLongitudeDegrees: 0,
            trueAnomalyDegrees: 0,
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
        startingLongitudeDegrees: 201.916,
        elements: {
            semiMajorAxisAu: 0.387,
            eccentricity: 0.21,
            inclinationDegrees: 7.00,
            orbitalPeriodYears: 0.241,
            perihelionLongitudeDegrees: 29.124,
            ascendingLongitudeDegrees: 48.331,
            trueAnomalyDegrees: 172.792,
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
        startingLongitudeDegrees: 104.214,
        elements: {
            semiMajorAxisAu: 0.723,
            eccentricity: 0.01,
            inclinationDegrees: 3.39,
            orbitalPeriodYears: 0.615,
            perihelionLongitudeDegrees: 54.884,
            ascendingLongitudeDegrees: 76.680,
            trueAnomalyDegrees: 49.330,
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
        color: '#8A6140',
    },
    description: {
        wikipedia: 'https://en.wikipedia.org/wiki/Earth',
    },
    properties: {
        radiusAu: 4.2635e-05,
        massRel: 1.000,
        rotationPeriodYears: 0.00272963723477,
        startingLongitudeDegrees: 112.396,
        elements: {
            semiMajorAxisAu: 1.000,
            eccentricity: 0.02,
            inclinationDegrees: 0.00,
            orbitalPeriodYears: 1.000,
            perihelionLongitudeDegrees: 114.208,
            ascendingLongitudeDegrees: 348.739,
            trueAnomalyDegrees: 358.188,
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
        startingLongitudeDegrees: 305.660,
        elements: {
            semiMajorAxisAu: 1.523,
            eccentricity: 0.09,
            inclinationDegrees: 1.85,
            orbitalPeriodYears: 1.881,
            perihelionLongitudeDegrees: 286.500,
            ascendingLongitudeDegrees: 49.579,
            trueAnomalyDegrees: 19.160,
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
        startingLongitudeDegrees: 292.626,
        elements: {
            semiMajorAxisAu: 5.202,
            eccentricity: 0.05,
            inclinationDegrees: 1.31,
            orbitalPeriodYears: 11.861,
            perihelionLongitudeDegrees: 273.867,
            ascendingLongitudeDegrees: 100.464,
            trueAnomalyDegrees: 18.759,
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
        startingLongitudeDegrees: 299.691,
        elements: {
            semiMajorAxisAu: 9.576,
            eccentricity: 0.06,
            inclinationDegrees: 2.49,
            orbitalPeriodYears: 29.628,
            perihelionLongitudeDegrees: 339.392,
            ascendingLongitudeDegrees: 113.665,
            trueAnomalyDegrees: 320.299,
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
        startingLongitudeDegrees: 239.964,
        elements: {
            semiMajorAxisAu: 19.293,
            eccentricity: 0.05,
            inclinationDegrees: 0.77,
            orbitalPeriodYears: 84.747,
            perihelionLongitudeDegrees: 96.999,
            ascendingLongitudeDegrees: 74.006,
            trueAnomalyDegrees: 142.965,
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
        startingLongitudeDegrees: 180.453,
        elements: {
            semiMajorAxisAu: 30.246,
            eccentricity: 0.01,
            inclinationDegrees: 1.77,
            orbitalPeriodYears: 166.344,
            perihelionLongitudeDegrees: 273.187,
            ascendingLongitudeDegrees: 131.783,
            trueAnomalyDegrees: 267.266,
        },
    },
};
export const PLUTO: PhysicalBody = {
    id: 134340,
    label: 'Pluto',
    type: PhysicalBodyType.DWARF_PLANET,
    parent: SUN,
    defaultSelected: true,
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
        startingLongitudeDegrees: 128.099,
        elements: {
            semiMajorAxisAu: 39.509,
            eccentricity: 0.25,
            inclinationDegrees: 17.5,
            orbitalPeriodYears: 248.348,
            perihelionLongitudeDegrees: 113.834,
            ascendingLongitudeDegrees: 110.299,
            trueAnomalyDegrees: 14.265,
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

export default { SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO, /*MOON*/ };
