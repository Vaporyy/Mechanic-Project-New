class Water {  
    constructor(x, y, w){
        this.x = x 
        this.y = y
        this.width = w
        this.raduius = 5
        this.vx = 0
        this.vy = 0
        this.colour = "#0000FF";
    }
    checkCollision(i, disks){
        for(var j = i+1 ; j < disks.length; j++){
          var diskB = disks[j];
          var dx = diskB.x - this.x;
          var dy = diskB.y - this.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var minDist = this.radius + diskB.radius;
          if(dist < minDist){
            var angle = Math.atan2(dy, dx);
            var tx = this.x + Math.cos(angle) * minDist;
            var ty = this.y + Math.sin(angle) * minDist;
            var ax = (tx - diskB.x) * 0.5;
            var ay = (ty - diskB.y) * 0.5;
            diskB.vx += ax;
            diskB.vy += ay;
            this.vx -= 0;
            this.vy -= 0;
          }
        }
    }
    checkAllCollisions(){
        var disk;
        for(var i = 0; i < disksNum; i++){
          disk = disks[i];
          disk.checkCollision(i, disks);
        }
    }

    update() {
        if(this == draggedDisk){
            this.x = mouseX;
            this.y = mouseY;
            this.vx = this.vy = 0;

        }else{
            this.vy += gravity;
            var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            var angle = Math.atan2(this.vy, this.vx);
            if (speed > this.friction) {
                speed -= this.friction;
            } else {
                speed = 0;
            }
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x - this.radius < 0) { 
                this.x = this.radius;
                this.vx = -this.vx;
            } else if (this.x + this.radius > stageWidth) { 
                this.x = stageWidth - this.radius;
                this.vx = -this.vx
            }
            if (this.y - this.radius < 0) { 
                this.y = this.radius;
                this.vy = -this.vy;
            } else if (this.y + this.radius > stageHeight) { 
                this.y = stageHeight - this.radius;
                this.vy = -this.vy;
            }
        }

    }

    containsPoint(x, y) {
        var dx = Math.abs(x - this.x);
        var dy = Math.abs(y - this.y);
        if(dx + dy < this.radius){
            return true
        }
    }

    draw() {
        //console.log(this);
        ctx.strokeStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    manageInput(){
        if(isMouseDown && draggedDisk == null){
            var disk;
            for(var i = 0; i < disksNum; i++){
                disk = disks[i];
                if(disk.containsPoint(mouseX, mouseY)){
                    draggedDisk = disk;
                    canvas.addEventListener('mousemove', onDragDisk);
                    break;
                }
            }
    
        }
    }

}
