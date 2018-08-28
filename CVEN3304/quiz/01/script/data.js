// use selfShuffle(arr) to shuffle

var pool1 = [
    {
        'idx': 1,
        'question': 'Tricalcium silicate (Alite) reacts fastest among cement components',
        'ans': 'no'
    },
    {
        'idx': 2,
        'question': 'Gypsum contains Sulphates',
        'ans': 'yes'
    },
    {
        'idx': 3,
        'question': 'Cement fineness affects the rate of strength gaining',
        'ans': 'yes'
    },
    {
        'idx': 4,
        'question': 'Theoretically, cement cannot be fully hydrated if w/c is 0.48',
        'ans': 'no'
    },
    {
        'idx': 5,
        'question': 'The kinetics of cement mineral hydration is C<sub>3</sub>S&gt;C<sub>3</sub>A&gt;C<sub>4</sub>AF&gt;C<sub>2</sub>S',
        'ans': 'no'
    },
    {
        'idx': 6,
        'question': 'Up to 60~70% of Portland cement can be replaced by GGBFS',
        'ans': 'yes'
    },
    {
        'idx': 7,
        'question': 'Pozzolanic reaction is generally faster than the hydration reaction',
        'ans': 'no'
    },
    {
        'idx': 8,
        'question': 'Concrete is a composite material. Therefore, the concrete compressive strength generally falls between the compressive strength of aggregate and the compressive strength of cement paste',
        'ans': 'no'
    },
    {
        'idx': 9,
        'question': 'Autogenous shrinkage is a subset of the chemical shrinkage',
        'ans': 'yes'
    },
    {
        'idx': 10,
        'question': 'Water-reducing admixtures are generally used to increase the workability of concrete while simultaneously reducing the w/c',
        'ans': 'no'
    },
    {
        'idx': 11,
        'question': 'CaO, Fe<sub>2</sub>O<sub>3</sub>, SiO<sub>2</sub> and Al<sub>2</sub>O<sub>3</sub> are the four major cement minerals',
        'ans': 'no'
    },
    {
        'idx': 12,
        'question': 'Al<sub>2</sub>O<sub>3</sub> obtained from quartz, limestone, clay, and aluminium ore',
        'ans': 'no'
    },
    {
        'idx': 13,
        'question': 'Gypsum is added to the clinker to increase the setting time',
        'ans': 'yes'
    },
    {
        'idx': 14,
        'question': 'Theoretically, cement can be fully hydrated if w/c is 0.48',
        'ans': 'yes'
    },
    {
        'idx': 15,
        'question': 'C<sub>3</sub>A produces the monosulfoaluminate when it first contacts with water',
        'ans': 'no'
    },
    {
        'idx': 16,
        'question': 'Using fly ash in concrete reduces the heat of hydration',
        'ans': 'yes'
    },
    {
        'idx': 17,
        'question': 'The direct tensile strength test is the simple and the easiest to perform',
        'ans': 'no'
    },
    {
        'idx': 18,
        'question': 'Concrete is a composite material. Therefore, the value of concrete elastic modulus falls between the elastic modulus of aggregate and the elastic modulus of cement paste',
        'ans': 'yes'
    },
    {
        'idx': 19,
        'question': 'The autogenous shrinkage is a macroscopic volume change and the chemical shrinkage is the internal volume changes in pore scale',
        'ans': 'no'
    },
    {
        'idx': 20,
        'question': 'Final set is the time required for the paste to solidify completely and final set generally occurs in the beginning of deceleration stage during cement hydration',
        'ans': 'no'
    },
    {
        'idx': 21,
        'question': 'Plastic shrinkage is mainly caused by the consumption of evaporable water during the hydration',
        'ans': 'no'
    },
    {
        'idx': 22,
        'question': 'Autogenous shrinkage is mainly caused by the self-dessciation',
        'ans': 'yes'
    },
    {
        'idx': 23,
        'question': 'Interfacial transition zone is the weakest place in concrete',
        'ans': 'yes'
    },
    {
        'idx': 24,
        'question': 'When using the same content of water, an angular and rough textured aggregate generally less workable than a rounded and smooth one',
        'ans': 'yes'
    },
    {
        'idx': 25,
        'question': 'Aggregate moisture condition is not a critical factor when batching concrete because the amount of absorption is negligible compared to the water content in mix design',
        'ans': 'no'
    },
    {
        'idx': 26,
        'question': 'We can generally use water reducing admixture to improve both workability and strength at the same time',
        'ans': 'no'
    },
    {
        'idx': 27,
        'question': 'We can generally use water reducing admixture to improve either workability or strength at the same time',
        'ans': 'yes'  // correct always
    },
    {
        'idx': 28,
        'question': 'Immersing a hardened concrete in water should be avoided because it changes water-to-cement ratio',
        'ans': 'no'
    },
    {
        'idx': 29,
        'question': 'Immersing a hardened concrete in water does not affect the water-to-cement ratio of concrete',
        'ans': 'yes'
    },
    {
        'idx': 30,
        'question': 'Water in small pores can be removed easier than water in the large pores due to the less capillary pressure',
        'ans': 'no'
    }
];

selfShuffle(pool1);

var pool2_ori = [
    {
        'idx': 1,
        'question': [
            ['1', 'The rapid heat evolution is marked as (i) and C<sub>3</sub>A reacts during this region (i)', 'yes'],
            ['2', 'The most important cement hydration product is (a)', 'yes'],
            ['3', 'The reaction products of C<sub>3</sub>S are (a) and (c)', 'no'],
            ['4', 'Adding more gypsum delays the reaction of C3A and thus the stage (ii) will be shortened', 'no'],
            ['5', 'The acceleration period is stage (iii) and this heat evolution is almost entirely due to the hydration of C<sub>3</sub>S', 'yes'],
        ]
    },
    {
        'idx': 2,
        'question': [
            ['1', 'Adding gypsum delays the reaction of C<sub>3</sub>A that produce (d)', 'yes'],
            ['2', 'The most important cement hydration product is (b)', 'no'],
            ['3', 'The reaction products of C<sub>3</sub>S are (a) and (b)', 'yes'],
            ['4', 'The second plot (the amount of hydration products) shows that the point of decreasing the amount of (d) at around 2 days is due to the lack of calcium hydroxide', 'no'],
            ['5', 'All C<sub>3</sub>S in cement react during the acceleration period', 'no']
        ]
    },
    {
        'idx': 3,
        'question': [
            ['1', 'The rapid heat evolution is marked as (i) and the hydration of C<sub>3</sub>S is the main reaction in this region (i)', 'no'],
            ['2', 'The second plot (the amount of hydration products) shows that the point of decreasing the amount of (d) at around 2 days is due to the lack of sulphate', 'yes'],
            ['3', '(iv) is mainly due to the slow reaction of C<sub>2</sub>S', 'no'],
            ['4', 'Dormant period is denoted (ii) and this period has very slow reaction. This period can be reduced by adding more gypsum', 'no'],
            ['5', 'Calcium hydroxide is the reaction product of C<sub>3</sub>S and C<sub>2</sub>S and it is denoted as (b)', 'yes']
        ]
    }
];

pool2 = shuffle(pool2_ori);

var pool3_ori = [
    {
        'idx': 1,
        'question': [
            ['1', 'The shrinkage shown in this plot can be prevented by minimizing water evaporation', 'no'],
            ['2', 'Chemical shrinkage = (e), the volume reduction is associated with the hydration reaction in a cementitious materials', 'no'],
            ['3', 'Volume of voids = (b), this volume cannot contribute to the macroscopic volume reduction', 'yes'],
            ['4', 'The shrinkage caused by Self-desiccation is (a)', 'no'],
            ['5', '(d) is the chemical shrinkage before setting and it is macroscopic volume change', 'yes']
        ]
    },
    {
        'idx': 2,
        'question': [
            ['1', 'The shrinkage shown in this plot cannot be prevented by minimizing water evaporation', 'yes'],
            ['2', 'Autogenous shrinkage = (c), the volume reduction is associated with the hydration reaction in a cementitious materials', 'yes'],
            ['3', 'Volume of voids = (e), this volume cannot contribute to the macroscopic volume reduction', 'no'],
            ['4', '(a) is the macroscopic shrinkage and (b) is the internal voids due to chemical shrinkage', 'yes'],
            ['5', 'Chemical shrinkage is the absolute shrinkage associated with the hydration reaction', 'yes']
        ]
    }
];

pool3 = shuffle(pool3_ori);

var pool4 = [
    {
        'idx': 1,
        'length': 8,
        'space': 5,
        'thickness': 130,
        'width': 350,
        'depth': 700,
        'dl': 2,
        'll': 3,
        'ans': 480,
        'figure': {
            'space': 5000,
            'height': 700,
            'web': 350,
            'flange': 130,
            'span': 8000
        }
    },
    {
        'idx': 2,
        'length': 9,
        'space': 4.5,
        'thickness': 150,
        'width': 400,
        'depth': 600,
        'dl': 3,
        'll': 2,
        'ans': 557,
        'figure': {
            'space': 4500,
            'height': 600,
            'web': 400,
            'flange': 150,
            'span': 9000
        }
    },
    {
        'idx': 3,
        'length': 8,
        'space': 3.5,
        'thickness': 100,
        'width': 400,
        'depth': 650,
        'dl': 2,
        'll': 2,
        'ans': 288,
        'figure': {
            'space': 3500,
            'height': 650,
            'web': 400,
            'flange': 100,
            'span': 8000
        }
    }
];

selfShuffle(pool4);

var pool5 = [
    {
        'idx': 1,
        'width': 400,
        'height': 540,
        'cover': 60,
        'top': '2N20',
        'Asc': 620,
        'btm': '3N24',
        'Ast': 1350,
        'ans': 305 
    },
    {
        'idx': 2,
        'width': 500,
        'height': 590,
        'cover': 60,
        'top': '2N20',
        'Asc': 620,
        'btm': '4N24',
        'Ast': 1800,
        'ans': 331 
    },
    {
        'idx': 3,
        'width': 450,
        'height': 535,
        'cover': 65,
        'top': '2N10',
        'Asc': 16,
        'btm': '3N32',
        'Ast': 2400,
        'ans': 313 
    }
];

selfShuffle(pool5);

var pool6 = [
    {
        'idx': 1,
        'width': 400,
        'height': 680,
        'cover': 60,
        'btm': '6N32',
        'Ast': 3720,
        'fc': 32,
        'yield': 500,
        'ans': [1152, 1.47]
    },
    {
        'idx': 2,
        'width': 450,
        'height': 550,
        'cover': 50,
        'btm': '6N32',
        'Ast': 3720,
        'fc': 25,
        'yield': 500,
        'ans': [880, 1.34]
    },
    {
        'idx': 3,
        'width': 350,
        'height': 540,
        'cover': 55,
        'btm': '6N24',
        'Ast': 2700,
        'fc': 32,
        'yield': 400,
        'ans': [548, 2.22]
    }
];

selfShuffle(pool6);

var part1 = [pool1[0], pool1[1], pool1[2], pool1[3], pool1[4]];
var part2 = pool2[0];
var part3 = pool3[0];
var part4 = pool4[0];
var part5 = pool5[0];
var part6 = pool6[0];

var order2 = shuffle([0, 1, 2, 3, 4]);
var order3 = shuffle([0, 1, 2, 3, 4]);

var option3 = [
    [
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 42, ans3: 336});"> w* = 42 kN/m, M*=336 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 60, ans3: 480});"> w* = 60 kN/m, M*=480 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 34, ans3: 276});"> w* = 34 kN/m, M*=276 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 55, ans3: 440});"> w* = 55 kN/m, M*=440 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 65, ans3: 490});"> w* = 65 kN/m, M*=480 kNm',
    ],
    [
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 47, ans3: 476});"> w* = 47 kN/m, M*=476 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 60, ans3: 608});"> w* = 60 kN/m, M*=608 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 30, ans3: 304});"> w* = 30 kN/m, M*=304 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 55, ans3: 557});"> w* = 55 kN/m, M*=557 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 64, ans3: 648});"> w* = 64 kN/m, M*=648 kNm',
    ],
    [
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 40, ans3: 320});"> w* = 40 kN/m, M*=320 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 60, ans3: 480});"> w* = 60 kN/m, M*=480 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 36, ans3: 288});"> w* = 36 kN/m, M*=288 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 55, ans3: 557});"> w* = 55 kN/m, M*=557 kNm',
    '<input type="radio" name="option3" onchange="toSelect(event, {w3: 30, ans3: 240});"> w* = 30 kN/m, M*=240 kNm',
    ]
];
option3 = option3[part4['idx'] - 1];
selfShuffle(option3);

var option51 = [
    [
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 1152});"> M<sub>u</sub> = 1152 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 1208});"> M<sub>u</sub> = 1208 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 1096});"> M<sub>u</sub> = 1096 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 985});"> M<sub>u</sub> = 985 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 927});"> M<sub>u</sub> = 927 kNm',
    ],
    [
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 880});"> M<sub>u</sub> = 880 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 834});"> M<sub>u</sub> = 834 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 627});"> M<sub>u</sub> = 627 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 691});"> M<sub>u</sub> = 691 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 645});"> M<sub>u</sub> = 645 kNm',
    ],
    [
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 548});"> M<sub>u</sub> = 548 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 518});"> M<sub>u</sub> = 518 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 578});"> M<sub>u</sub> = 578 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 483});"> M<sub>u</sub> = 483 kNm',
    '<input type="radio" name="option51" onchange="toSelect(event, {ans51: 453});"> M<sub>u</sub> = 453 kNm',
    ]
];

var option52 = [
    [
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 1.47});">&phi; = 1.47 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 8.57});">&phi; = 8.57 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 2.1});">&phi; = 2.1 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 2.47});">&phi; = 2.47 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 14.7});">&phi; = 1.47 &times;10<sup>-4</sup> mm<sup>-1</sup>',
    ],
    [
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 1.34});">&phi; = 1.34 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 9.23});">&phi; = 9.23 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 2.1});">&phi; = 2.1 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 2.47});">&phi; = 2.47 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 1.47});">&phi; = 1.47 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    ],
    [
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 2.22});">&phi; = 2.22 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 9.23}});">&phi; = 2.92 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 5.56});">&phi; = 5.56 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 2.57});">&phi; = 2.57 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    '<input type="radio" name="option52" onchange="toSelect(event, {ans52: 1.47});">&phi; = 1.47 &times;10<sup>-5</sup> mm<sup>-1</sup>',
    ]
];
option51 = option51[part6['idx'] - 1];
selfShuffle(option51);
option52 = option52[part6['idx'] - 1];
selfShuffle(option52);