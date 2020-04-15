var gyro_data = []; 
var mag_data = []; 
var acc_data = []; 

var curr_data_point = 0; 
var prev_second = 0; //for no repeated seconds takes care of milliseconds
var g_pos = 50; 
var mag_pos = 250;
var acc_pos = 450; 

let serial;
var currentString; 

function setup() {
	createCanvas(1420, 1000); 

	//Demo data will be replaced by the Arduino data
  	gyro_data = [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1]; 
  	mag_data = [2,4,6,8,10,8,6,4,2,4,6,8,10,8,6,4,2,4,6];
  	acc_data = [7,6,3,3,9,1,5,0,2,3,8,6,10,2,7,6,4,8,9];

  	//Text and names 
  	g_name = createDiv("GYRO"); 
  	g_name.class("name_style"); 
  	g_name.position(g_pos + 25, 600); 

  	m_name = createDiv("MAG"); 
  	m_name.class("name_style"); 
  	m_name.position(mag_pos + 25, 600); 

  	a_name = createDiv("ACCEL"); 
  	a_name.class("name_style"); 
  	a_name.position(acc_pos + 25, 600); 

  	title = createDiv("Knee Brace Data Visualization"); 
  	title.class("title_style"); 
  	title.position(25,50); 

  	//Initializing the Arduino serial port
  	serial = new p5.SerialPort(); 
  	serial.open("") //FILL WITH THE NAME OF ARDUINO SERIAL PORT

  	//Checks

  	// When we connect to the underlying server
	serial.on('connected', serverConnected);

  	// When we get a list of serial ports that are available
  	serial.on('list', gotList);

  	// When we some data from the serial port
  	serial.on('data', gotData);

  	// When or if we get an error
  	serial.on('error', gotError);

  	// When our serial port is opened and ready for read/write
  	serial.on('open', gotOpen);

}

// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}

function bar_draw(){

	//Creates the bar graph and constantly updates with the next data point within the lists
	var splitString = split(currentString, " "); //This assumes that all values are being printed on one line
	g_curr_data = -(splitString[0] * 20);
	mag_curr_data = -(splitString[1] * 20);
	acc_curr_data = -(splitString[2] * 20); 

	fill(185, 140, 207);
	gyro_bar = rect(g_pos, 550, 100, g_curr_data);
	fill(139, 79, 168);  
	mag_bar = rect(mag_pos, 550, 100, mag_curr_data);
	fill(74, 21, 99);
	acc_bar = rect(acc_pos, 550, 100, acc_curr_data);
	curr_data_point += 1; 
}

function draw() {
	let s = second();
	if (s != prev_second && curr_data_point <= gyro_data.length - 1 ){
		prev_second = s; 
		clear();
		redraw(); 
		bar_draw(); 
	}
}

