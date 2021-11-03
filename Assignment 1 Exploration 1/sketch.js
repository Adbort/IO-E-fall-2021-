let songs = [];
let backgroundColor;
let circlesNum = 5;
let rectNum = 10;
let Shapes =[];

function setup() {

    songs[0] = loadSound('assets/assets_sounds_bubbles.mp3');
    songs[1] = loadSound('assets/assets_sounds_confetti.mp3');
    songs[2] = loadSound('assets/assets_sounds_ufo.mp3');
    createCanvas(windowWidth, windowHeight);
    backgroundColor = color(255, 100, 100);
    background(backgroundColor);

}
function draw() {
    background(backgroundColor);
    for (let i = 0; i < Shapes.length; i++) {
     //   Shapes[i] = new shapes('circle');
        Shapes[i].show();
        Shapes[i].wait();
        if(Shapes[i].time < 0){
        
        Shapes.splice(i,1);
        }
        
    }
    
}
function keyPressed() {
    fill(255);

    if (keyCode === 81) {
        if (songs[0].isPlaying()) {

            // .isPlaying() returns a boolean
            songs[0].stop();


        } else {
            songs[0].play();
            background(backgroundColor);
            for (let i = 0; i < circlesNum; i++) {
                
                Shapes[i] = new shapes('circle');

            }


        }

    }
        if (keyCode === 87) {
        if (songs[1].isPlaying()) {

            // .isPlaying() returns a boolean
            songs[1].stop();


        } else {
            songs[1].play();
            background(backgroundColor);
            for (let i = 0; i < rectNum; i++) {
                
                Shapes[i] = new shapes('rect');
                
            }


        }

    }
            if (keyCode === 69) {
        if (songs[2].isPlaying()) {

            // .isPlaying() returns a boolean
            songs[2].stop();


        } else {
            songs[2].play();
            background(backgroundColor);
            for (let i = 0; i < rectNum; i++) {
                
                Shapes[i] = new shapes('tria');
                
            }


        }

    }
    
}
class shapes {
    constructor(shape) {
        this.x = random(windowWidth);
        this.y = random(windowHeight);
        this.w = random(40, 50);
        this.shape = shape;
        this.col = 255;
        this.time = 255;
        


    }
    show() {


        if (this.shape == 'circle') {
            fill(this.col,this.col,this.col,this.time);
            noStroke();
            ellipseMode(CENTER);
            ellipse(this.x, this.y, this.w);
            
            
        }
         if (this.shape == 'rect') {
             fill(this.col,this.col,this.col,this.time);
            noStroke();
            rectMode(CENTER);
            rect(this.x, this.y, this.w,this.w);

        }
         if (this.shape == 'tria') {
             fill(this.col,this.col,this.col,this.time);
            noStroke();
            rectMode(CENTER);
            triangle(this.x, this.y-this.w, this.x+this.w/2, this.y, this.x-this.w/2, this.y);

        }
        
    }
    wait() {
        this.time= this.time - 2;
        this.w = this.w *.99;

    }

}
