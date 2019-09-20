function paddle() {

    this.position = 100;
    this.speed = 20;
    this.size = 200;

    this.maxPosition = window.innerWidth - this.size;
    $('#paddle').css("width", this.width);

    this.updatePosition = function (direction, amt) {
        if ((direction == 'left') && (this.position > 0)) {
            this.position -= amt;
        }

        if ((direction == 'right') && (this.position < this.maxPosition)) {
            this.position += amt;
        }
    }
}