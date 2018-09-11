if (who) {
    var seed = Number(who.slice(-6));
    seed = seed.toString(5);
    
    var idx1 = seed[seed.length - 1];
    var idx2 = seed[seed.length - 2];
    var idx3 = seed[seed.length - 3];
    
    idx1 = (idx1 > 4) ? 4 : idx1;
    idx2 = (idx1 > 4) ? 4 : idx2;
    idx3 = (idx1 > 4) ? 4 : idx3;
    
    window.q1 = q0pool[idx1];
    window.q2 = q1pool[idx2];
    window.q3 = q2pool[idx3];
    window.set = [q1.SetNo, q2.SetNo, q3.SetNo];
    
    window.q0 = (function() {
        var selection = selection_pool;
        selection.push([selection[0].idx, selection[1].idx, selection[2].idx);

        return selection;
    })();
} else {
    $("body").hide();
    window.location.href = "https://moodle.telt.unsw.edu.au";
}