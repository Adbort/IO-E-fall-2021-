// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let Circles = [];
let songs = [];
let notePattern = [60, 62, 64, 67, 69, 72];
let notePattern2 = [72, 62, 64, 69, 64, 60];
let synth, soundLoop, soundLoop2,synth2;

function setup() {
    let intervalInSeconds = 0.2;
    soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
    soundLoop2 = new p5.SoundLoop(onSoundLoop2, intervalInSeconds);
    synth = new p5.MonoSynth();
    synth2 = new p5.MonoSynth();
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    for (let i = 0; i < 200; i++) {
        Circles[i] = new Circle();
    }
    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    userStartAudio();
    // Hide the video element, and just show the canvas
    video.hide();

}

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex]);

  synth.play(note, 0.5, timeFromNow);
 // background(noteIndex * 360 / notePattern.length, 50, 100);
}
function onSoundLoop2(timeFromNow) {
  let noteIndex = (soundLoop2.iterations - 1) % notePattern2.length;
  let note = midiToFreq(notePattern2[noteIndex]);

  synth2.play(note, 0.5, timeFromNow);
 // background(noteIndex * 360 / notePattern.length, 50, 100);
}
function modelReady() {
    select('#status').html('Model Loaded');
}

function draw() {
    // background(0);
    image(video, 0, 0, width, height);
    for (let i = 0; i < Circles.length; i++) {
        Circles[i].move();
        Circles[i].show();

    }



    // We can call both functions to draw all keypoints and the skeletons
    // drawKeypoints();
    //drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {

            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(255, 0, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            //            let partA = skeleton[j][0];
            //            let partB = skeleton[j][1];
            //            stroke(255, 0, 0);
            //            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
class Circle {
    constructor(shape) {
        this.x = random(windowWidth);
        this.y = random(windowHeight);
        this.z = 20;
        this.xSpeed = random(-0.1, 0.1);
        this.ySpeed = random(-0.1, 0.1);
        this.near = false;




    }
    show() {

//        noFill();
//        stroke(0);
//        ellipseMode(CENTER);
//        ellipse(this.x, this.y, this.z);



    }
    move() {

        if (this.near == false) {
            this.x = this.x + this.xSpeed;
            this.y = this.y + this.ySpeed;
        }
        if (this.near == true) {
            this.x = this.x + this.xSpeed * 0;
            this.y = this.y + this.ySpeed * 0;

        }
        this.near = true;
        // this.z = this.z + this.zpeed;
        if (this.z >= 40) {
            this.z = 40
        }
        if (this.z <= 10) {
            this.z = 10
        }
        for (let i = 0; i < poses.length; i++) {
            // For each pose detected, loop through all the keypoints
            let pose = poses[i].pose;

            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[9];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                let check = false;
                if (soundLoop.isPlaying) {

                    
                }
                else{
                    soundLoop.start();
                }
                

                this.z = dist(this.x, this.y, keypoint.position.x, keypoint.position.y)
                // this.near = true;




                                  ellipse(keypoint.position.x, keypoint.position.y, 30, 30);    
            } else {
                soundLoop.stop();
            }
            keypoint = pose.keypoints[10];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                let check = false;
                if (soundLoop2.isPlaying) {

                    
                }
                else{
                    soundLoop2.start();
                }
                

                this.z = dist(this.x, this.y, keypoint.position.x, keypoint.position.y)
                // this.near = true;




                                  ellipse(keypoint.position.x, keypoint.position.y, 30, 30);    
            } else {
                soundLoop2.stop();
            }
        }

        if (this.x < 0) {
            this.x = windowWidth;
        }
        if (this.x > windowWidth) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = windowHeight;
        }
        if (this.y > windowHeight) {
            this.y = 0;
        }

    }

}
