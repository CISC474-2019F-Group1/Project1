function gameState() {

    var score;
    var mode;
    var activePowerup;
    var level;

    var level1 = [
        new brick(1,0,10,10,10,10),
        new brick(4,0,20,20,30,30)
    ];

    if (typeof(Storage) !== "undefined") {
        
        var x = JSON.stringify(level1);
        var y = JSON.parse(x);
        for(var i = 0; i < y.length; i++){
            console.log(level1[i].initX);
        }

      } else {
        console.log("No Local Storage");
    }

}