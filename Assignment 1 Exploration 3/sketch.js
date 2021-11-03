/* 
August 2019 - Doug Whitton 
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is "threeSensorExample"
*/

let osc;
let playing = false;
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let splitter;
let volume = 0;

let Circles = [];

let osc1, fft;

function setup() {

    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 100; i++) {
        Circles[i] = new Circle();
    }

    ///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
    ///////////////////////////////////////////////////////////////////    


    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();
    console.log("serial.list()   ", serial.list());

    //////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("COM3");
    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);


}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


osc1 = new p5.TriOsc(); // set frequency and type
osc1.amp(.5);

fft = new p5.FFT();
osc1.start();


// We are connected and ready to go
function serverConnected() {
    console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
    console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string

    volume = currentString;



}

// We got raw data from the serial port
function gotRawData(thedata) {
    println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
    background(255, 100, 100);
    for (let i = 0; i < Circle.length; i++) {
        Circles[i].move();
        Circles[i].show();
        
    }
    
   

    //console.log("diameter0  "  + diameter0);




    var freq = map(volume, 0, width, 40, 880);
    osc1.amp(map(volume,0,1000,0,1));
    osc1.freq(400);
   // console.log(freq);


}


function mouseClicked() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        console.log("getAudioContext().state" + getAudioContext().state);
    }
};


class Circle {
    constructor(shape) {
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.z = volume;




    }
    show() {
noStroke();
        fill(255);  
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.z);
        console.log(this.z);
        


    }
    move() {
       this.z = volume;
//        this.xSpeed = x;
//        this.ySpeed = y;
//        this.zpeed = z - 1;
//        this.x = this.x + x * 10;
//        this.y = this.y + y * 10;
//        this.z = this.z + this.zpeed;
//        if (this.z >= 40){
//        this.z =40
//        }
//        if (this.z <= 10){
//        this.z =10
//        }
//
//
//        if (this.x < 0) {
//            this.x = windowWidth;
//        }
//        if (this.x > windowWidth) {
//            this.x = 0;
//        }
//                if (this.y < 0) {
//            this.y = windowHeight;
//        }
//        if (this.y > windowHeight) {
//            this.y = 0;
//        }

    }

}
