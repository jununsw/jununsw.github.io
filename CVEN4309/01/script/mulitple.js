// create and randomize multiple choice

function randomize(arr) {  // randomize array's order
    var currentIndex = arr.length;
    var temporaryValue;
    var randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

var selection_pool = [
    {
        idx: 0,
        choice: 0,
        question: "In which direction is timber strong and stiff?",
        options: [
            "Parallel to the grain",
            "Perpendicular to the grain",
            "Both directions - Timber is Isotropic"
        ]
    },
    {
        idx: 1,
        choice: 2,
        question: "What do you call timber that has been dried to 15% moisture content?",
        options: [
            "Unseasoned Timber",
            "Partially Seasoned Timber",
            "Seasoned Timber"
        ]
    },
    {
        idx: 2,
        choice: 1,
        question: "How would a piece of timber respond to an increase in humidity?",
        options: [
            "Shrink – the cell walls get thinner",
            "Swell – the cell walls get thicker",
            "It does not respond"
        ]
    },
    {
        idx: 3,
        choice: 0,
        question: "What is creep?",
        options: [
            "Creep is the time dependent deflection of timber",
            "Creep is the swelling or shrinkage of the timber that occurs due to moisture content",
            "Creep is the way in which timber stores carbon"
        ]
    },
    {
        idx: 4,
        choice: 2,
        question: "When do you use the lower 5th percentile modulus of elasticity in deflection?",
        options: [
            "Never",
            "For all elements",
            "For only critical elements"
        ]
    },
    {
        idx: 5,
        choice: 1,
        question: "What does the timber strength group tell you?",
        options: [
            "Bending Strength",
            "Bearing Strength",
            "Modulus of Elasticity"
        ]
    },
    {
        idx: 6,
        choice: 0,
        question: "Which engineered timber products are made by gluing sawn timber together?",
        options: [
            "Glulam and Cross Laminated Timber",
            "Laminated Veneer Lumber and Plywood",
            "Laminated Strand Lumber and Oriented Strand Board"
        ]
    }
];

var q0 = (function() {
    var arr = randomize(selection_pool);
    var selection = [arr[0], arr[1], arr[2], arr[3]];
    selection.push([arr[0].idx, arr[1].idx, arr[2].idx, arr[3].idx]);
    
    return selection;
})();