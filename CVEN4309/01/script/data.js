var title1 = ['Ac', 'Ap', 'As', 'At', 'Emean', 'E005', 'fb', 'fc', 'fp', 'fs', 'ft', 'I', 'j2short', 'j2long', 'j3', 'k1', 'k4', 'k6', 'k7', 'k9', 'k12', 'S1', 'Z', 'phi', 'rhob', 'rhoc'];
var co11 = [
    ['', 2025, 4200.000, '', 10000, '', 17, '', 10, 2.6, '', 10290000.00, 1.011, 2, '', 0.8, 1, 1.0, 1, 0.825, '', 147000.000, 0.9, 0.75, '']
    ['', 1225, 2066.667, '', 12700, '', 28, '', 10, 3.5, '', 8003333.333, 1.011, 2, '', 0.8, 1, 1.0, 1, 0.550, '', 114333.333, 0.9, 0.85, ''],
    ['', 2025, 3600.000, '', 10500, '', 31, '', 12, 5.0, '', 6480000.000, 1.011, 2, '', 0.8, 1, 1.0, 1, 0.754, '', 108000.000, 0.9, 0.98, ''],
    ['', 2025, 4200.000, '', 10000, '', 17, '', 10, 2.6, '', 10290000.00, 1.011, 2, '', 0.8, 1, 0.9, 1, 0.860, '', 147000.000, 0.9, 0.75, ''],
    ['', 1225, 2066.667, '', 12700, '', 28, '', 10, 3.5, '', 8003333.333, 1.011, 2, '', 0.8, 1, 0.9, 1, 0.584, '', 114333.333, 0.9, 0.85, '']
];

var co12 = [
    ['', 1575, 4200.000, '', 10000, 7000, 17, '', 10, 2.6, '', 10290000.00, 1.011, 2, '', 0.8, 1, 1.0, 1, 1, 0.992, 13.551, 147000.000, 0.9, 0.75, ''],
    ['', 1575, 3266.667, '', 12700, 8890, 28, '', 10, 3.5, '', 8003333.333, 1.011, 2, '', 0.8, 1, 1.0, 1, 1, 0.760, 17.423, 114333.333, 0.9, 0.85, ''],
    ['', 1575, 3600.000, '', 10500, 7350, 31, '', 12, 5.0, '', 6480000.000, 1.011, 2, '', 0.8, 1, 1.0, 1, 1, 0.923, 11.875, 108000.000, 0.9, 0.98, ''],
    ['', 1575, 4200.000, '', 10000, 7000, 17, '', 10, 2.6, '', 10290000.00, 1.011, 2, '', 0.8, 1, 0.9, 1, 1, 1.007, 13.147, 147000.000, 0.9, 0.75, ''],
    ['', 1575, 3266.667, '', 12700, 8890, 28, '', 10, 3.5, '', 8003333.333, 1.011, 2, '', 0.8, 1, 0.9, 1, 1, 0.782, 16.793, 114333.333, 0.9, 0.85, '']
];

var title2 = ['Ac', 'Ap', 'As', 'At', 'Emean', 'E005', 'fb', 'fc', 'fp', 'fs', 'ft', 'I', 'j2short', 'j2long', 'j3', 'k1', 'k4', 'k6', 'k7', 'k9', 'k12', 'S1', 'Z', 'phi', 'rhob', 'rhoc'];

var co2 = [
    [32400, '', '', 25920, '', '', '', 22, '', '', 13.275, '', '', '', '', 0.94, 1, 1.0, '', '', 0.990, '', '', 0.7, '', 1.02],
    [25600, '', '', 21120, '', '', '', 34, '', '', 23.942, '', '', '', '', 0.94, 1, 1.0, '', '', 0.867, '', '', 0.7, '', 1.08],
    [40000, '', '', 29600, '', '', '', 22, '', '', 14.844, '', '', '', '', 0.94, 1, 1.0, '', '', 1.000, '', '', 0.7, '', 1.02],
    [25600, '', '', 21120, '', '', '', 34, '', '', 21.069, '', '', '', '', 0.94, 1, 0.9, '', '', 0.817, '', '', 0.7, '', 1.08],
    [32400, '', '', 25920, '', '', '', 22, '', '', 15.930, '', '', '', '', 0.94, 1, 0.9, '', '', 0.905, '', '', 0.7, '', 1.02]
];

var q11 = {
    location: "Sydney",
    joist: {
        span: 3,
        depth: 140,
        width: 45,
        centres: 450,
        grade: "MGP10"
    },
    bearer: {
        span: 1.7,
        depth: 140,
        width: 45,
        grade: "MGP10",
        length: 35
    },
    deadload: 0.7,
    liveload: 1.5,
    answer: [
        [1.565, 2.121],
        [2.807, 7.862],
        [2.807, 14.58],
        [9.255, 10],
        "yes",
        [1.675, 1.787],
        [3.941, 7.682],
        [3.941, 11.34],
        [4.544, 5],
        "yes"
    ]
};

var q12 = {
    location: "Brisbane",
    joist: {
        span: 2.8,
        depth: 140,
        width: 35,
        centres: 450,
        grade: "MPG12"
    },
    bearer: {
        span: 1.7,
        depth: 140,
        width: 35,
        grade: "MGP12",
        length: 45
    },
    deadload: 0.8,
    liveload: 1.0,
    answer: [
        [1.085, 1.82],
        [1.55, 8.232],
        [1.55, 8.82],
        [7.103, 9.333],
        "yes",
        [1.244, 1.752],
        [2.927, 8.232],
        [2.927, 11.34],
        [4.289, 5],
        "yes"
    ]
};

var q13 = {
    location: "Melbourne",
    joist: {
        span: 2.5,
        depth: 120,
        width: 45,
        centres: 450,
        grade: "F11"
    },
    bearer: {
        span: 1.5,
        depth: 120,
        width: 45,
        grade: "F11",
        length: 35
    },
    deadload: 0.9,
    liveload: 1.2,
    answer: [
        [1.013, 2.634],
        [1.62, 12.96],
        [1.62, 17.496],
        [7.689, 8.333],
        "yes",
        [1.013, 2.225],
        [2.7, 12.96],
        [2.7, 13.608],
        [3.953, 5],
        "yes"
    ]
};

var q14 = {
    location: "Darwin",
    joist: {
        span: 2.7,
        depth: 140,
        width: 45,
        centres: 600,
        grade: "MPG10"
    },
    bearer: {
        span: 1.6,
        depth: 140,
        width: 45,
        grade: "MGP10",
        length: 35
    },
    deadload: 0.8,
    liveload: 1.0,
    answer: [
        [1.345, 2.057],
        [1.993, 7.076],
        [1.993, 13.122],
        [8.088, 9],
        "yes",
        [1.063, 1.631],
        [2.657, 7.076],
        [2.657, 10.206],
        [3.205, 5],
        "yes"
    ]
};

var q15 = {
    location: "Adelaide",
    joist: {
        span: 2.6,
        depth: 140,
        width: 35,
        centres: 600,
        grade: "MPG12"
    },
    bearer: {
        span: 1.6,
        depth: 140,
        width: 45,
        grade: "MGP12",
        length: 45
    },
    deadload: 0.7,
    liveload: 1.5,
    answer: [
        [1.567, 1.795],
        [2.41, 7.409],
        [2.41, 7.938],
        [7.048, 8.667],
        "yes",
        [1.285, 1.622],
        [3.214, 7.409],
        [3.214, 10.206],
        [3.127, 5],
        "larger"
    ]
};

var q21 = {
    location: "Sydney",
    element: {
        length: 2.4,
        depth: 180,
        width: 180
    },
    load: 200,
    boltsize: "M16",
    holesize: 18,
    grade: "F11",
    density: "Softwood",
    answer: [
        [200, 226.41],
        [200, 464.332],
        "yes"
    ]
};

var q22 = {
    location: "Melbourne",
    element: {
        length: 2.5,
        depth: 160,
        width: 160
    },
    load: 300,
    boltsize: "M12",
    holesize: 14,
    grade: "F17",
    density: "Hardwood",
    answer: [
        [300, 332.721],
        [300, 496.551],
        "yes"
    ]
};

var q23 = {
    location: "Perth",
    element: {
        length: 2.6,
        depth: 160,
        width: 160
    },
    load: 250,
    boltsize: "M24",
    holesize: 26,
    grade: "F11",
    density: "Hardwood",
    answer: [
        [250, 289.114],
        [250, 579.04],
        "yes"
    ]
};

var q24 = {
    location: "Darwin",
    element: {
        length: 2.7,
        depth: 160,
        width: 160
    },
    load: 220,
    boltsize: "M12",
    holesize: 14,
    grade: "F17",
    density: "Softwood",
    answer: [
        [220, 263.516],
        [220, 421.123],
        "yes"
    ]
};

var q25 = {
    location: "Townsville",
    element: {
        length: 2.8,
        depth: 180,
        width: 180
    },
    load: 190,
    boltsize: "M16",
    holesize: 18,
    grade: "F11",
    density: "Hardwood",
    answer: [
        [190, 244.523],
        [190, 382.019],
        "yes"
    ]
};

var q1pool = [q11, q12, q13, q14, q15];
var q2pool = [q21, q22, q23, q24, q25];

var r1 = (Math.random() * q1pool.length >> 0);
var r2 = (Math.random() * q2pool.length >> 0);

var q1 = q1pool[r1];
var q2 = q2pool[r2];

var coeff1 = [title1, co11[r1], co12[r1]];
var coeff2 = [title2, co2[r1]];