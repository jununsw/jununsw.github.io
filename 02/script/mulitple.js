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
        question: "Which of the below is NOT a way to reduce the chance of rot within the timber?",
        options: [
            "Protect the timber using plasterboard",
            "Allow air flow around the timber",
            "Ensure there are no exposed horizontal timber surfaces"
        ]
    },
    {
        idx: 1,
        choice: 1,
        question: "Which hazard class is required for the timber studs within a residential stud frame lined with plasterboard?",
        options: [
            "H1",
            "H2",
            "H3"
        ]
    },
    {
        idx: 2,
        choice: 1,
        question: "Which hazard class is required for the timber piers within a freshwater lake?",
        options: [
            "H4",
            "H5",
            "H6"
        ]
    },
    {
        idx: 3,
        choice: 2,
        question: "What is the most important part of the termite management system?",
        options: [
            "Physical Barrier",
            "Chemical Barrier",
            "Termite Inspection"
        ]
    },
    {
        idx: 4,
        choice: 0,
        question: "What conditions do termites prefer?",
        options: [
            "Dark and Damp",
            "Dark and Dry",
            "Light and Humid"
        ]
    }
];

var q0 = (function() {
    var arr = randomize(selection_pool);
    var selection = [arr[0], arr[1], arr[2], arr[3]];
    selection.push([arr[0].idx, arr[1].idx, arr[2].idx, arr[3].idx]);
    
    return selection;
})();