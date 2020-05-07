//PROGRAM NOTES///
// - All serial code is currently commented out for testing purposes//


///////////////GLOBAL VARIABLES/////////////////
var gyro_data = []; 
var mag_data = []; 
var acc_data = []; 
var g_data, m_data, a_data; 

var canvas_width = 1420; 
var canvas_height = 700; 

var curr_data_point = 0; 
var prev_second = 0; //for no repeated seconds takes care of milliseconds

var g_pos = 100; 
var mag_pos = g_pos + 200;
var acc_pos = g_pos + 400; 
var button_pos = 100; 
var button_height = 100; 

var active = false; 
var display = false; 

//Serial Variables
let serial;
var currentString; 


function setup() {
	createCanvas(canvas_width, canvas_height); 

  	g_name = createDiv("GYRO"); 
  	g_name.class("name_style"); 
  	g_name.position(g_pos + 25, 650); 

  	m_name = createDiv("MAG"); 
  	m_name.class("name_style"); 
  	m_name.position(mag_pos + 25, 650); 

  	a_name = createDiv("ACCEL"); 
  	a_name.class("name_style"); 
  	a_name.position(acc_pos + 25, 650); 

  	title = createDiv("Knee Brace Data Visualization"); 
  	title.class("title_style"); 
  	title.position(25,50); 

  	start_button = createDiv("START"); 
  	start_button.class("button_style"); 
  	start_button.mousePressed(activate); 
  	start_button.position(button_pos,button_height); 

  	stop_button = createDiv("STOP"); 
  	stop_button.class("button_style"); 
  	stop_button.mousePressed(deactivate); 
  	stop_button.position(button_pos + 150,button_height); 

  	display_button = createDiv("DISPLAY"); 
  	display_button.class("button_style"); 
  	display_button.mousePressed(display_func); 
  	display_button.position(button_pos + 300,button_height); 


//   	//Initializing the Arduino serial port
//   	serial = new p5.SerialPort(); 
//   	serial.open("") //FILL WITH THE NAME OF ARDUINO SERIAL PORT

//   	//CHECKS
//   	// When we connect to the underlying server
// 	serial.on('connected', serverConnected);

//   	// When we get a list of serial ports that are available
//   	serial.on('list', gotList);

//   	// When we some data from the serial port
//   	serial.on('data', gotData);

//   	// When or if we get an error
//   	serial.on('error', gotError);

//   	// When our serial port is opened and ready for read/write
//   	serial.on('open', gotOpen);

}

// ///////////////SERIAL FUNCTIONS/////////////////
// // We are connected and ready to go
// function serverConnected() {
//     print("We are connected!");
// }

// // Got the list of ports
// function gotList(thelist) {
//   // theList is an array of their names
//   for (let i = 0; i < thelist.length; i++) {
//     // Display in the console
//     print(i + " " + thelist[i]);
//   }
// }

// // Connected to our serial device
// function gotOpen() {
//   print("Serial Port is open!");
// }

// // Ut oh, here is an error, let's log it
// function gotError(theerror) {
//   print(theerror);
// }

// // There is data available to work with from the serial port
// function gotData() {
//   currentString = serial.readStringUntil("\r\n");
//   console.log(currentString);
// }

///////////////DATA FUNCTIONS/////////////////

function activate(){
	active = true; 
}

function deactivate(){
	active = false; 
}

function display_func(){
	display = !display; 
}

function bar_draw(){

	//Creates the bar graph and constantly updates with the next data point within the lists
	//var splitString = split(currentString, " "); //This assumes that all values are being printed on one line
	// g_curr_data = -(splitString[0] * 20);
	// mag_curr_data = -(splitString[1] * 20);
	// acc_curr_data = -(splitString[2] * 20); 

	//random data pushing 
	g_data = round(random(0,100), 4); 
	m_data = round(random(0,100), 4); 
	a_data = round(random(0,100), 4); 
	gyro_data.push(g_data); 
	mag_data.push(m_data); 
	acc_data.push(a_data); 

	g_curr_data = -(g_data * 3);
	mag_curr_data = -(m_data * 3);
	acc_curr_data = -(a_data * 3); 

	fill(185, 140, 207);
	gyro_bar = rect(g_pos, 600, 100, g_curr_data);
	fill(139, 79, 168);  
	mag_bar = rect(mag_pos, 600, 100, mag_curr_data);
	fill(74, 21, 99);
	acc_bar = rect(acc_pos, 600, 100, acc_curr_data);
}

function timed_bar_graph(s){
	prev_second = s; 
	clear();
	redraw(); 
	bar_draw(); 
}

function draw() {
	let s = second(); 
	if (s!= prev_second && active == true){
		timed_bar_graph(s); 
	}

	if (active == true){
		start_button.style('background-color', '#4400ff');
		stop_button.style('background-color', '#ffffff');
	}
	else{
		stop_button.style('background-color', '#4400ff');
		start_button.style('background-color', '#ffffff');
	}

	if (display == true && active == true){
		data_screen.timed_display(); 
		
	}
}

///////////////DATA SCREEN + FUNCTIONS/////////////////

var data_screen_p5 = function(p){

	p.setup = function() {
		screen = p.createCanvas(500, 550); 
		p.background(30,30,30); 
		screen.position(800, button_height); 


	  	gdd = p.createDiv("GYRO DATA"); 
	  	gdd.class("name_style"); 
	  	gdd.position(800, button_height); 

	  	mdd = p.createDiv("MAG DATA"); 
	  	mdd.class("name_style"); 
	  	mdd.position(1000, button_height); 

	  	add = p.createDiv("ACCEL DATA"); 
	  	add.class("name_style"); 
	  	add.position(1200, button_height);

		gdd.hide(); 
		mdd.hide(); 
		add.hide(); 
	}

	p.draw = function() {
		if (display == true){
			display_button.style('background-color', '#4400ff');
			gdd.show(); 
			mdd.show(); 
			add.show();
		}

		else{
			display_button.style('background-color', '#ffffff');
			gdd.hide(); 
			mdd.hide(); 
			add.hide(); 
			p.reset(); 
		}
	}

	p.timed_display = function(){
		p.reset(); 
		var curr_data_pos = 50; 
		
		for (var i = 0; i < gyro_data.length; i++){
			p.fill(255,255,255); 
			p.textSize(15); 
			p.text(gyro_data[i], 10, curr_data_pos); 
			p.text(mag_data[i], 210, curr_data_pos); 
			p.text(acc_data[i], 410, curr_data_pos); 

			curr_data_pos += 20; 

			if (curr_data_pos >= 500){
				p.reset(); 
				curr_data_pos = 50; 
			}

		}
	}

	p.reset = function(){
		p.clear(); 
		p.redraw(); 
	}

}

//initializing second sketch aka "data screen"
var data_screen = new p5(data_screen_p5); 


