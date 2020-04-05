var gyro_data = []; 
var mag_data = []; 
var acc_data = []; 
var canvas_width = 1420; 
var canvas_height = 1000; 
var curr_data_point = 0; 
var prev_second = 0; //for no repeated seconds takes care of milliseconds
var g_pos = 50; 
var mag_pos = 250;
var acc_pos = 450; 

function setup() {
	createCanvas(canvas_width, canvas_height); 
  	gyro_data = [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1]; 
  	mag_data = [2,4,6,8,10,8,6,4,2,4,6,8,10,8,6,4,2,4,6];
  	acc_data = [7,6,3,3,9,1,5,0,2,3,8,6,10,2,7,6,4,8,9];

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
}

function bar_draw(){
	fill(255,0,0)
	g_curr_data = -(gyro_data[curr_data_point] * 20);
	mag_curr_data = -(mag_data[curr_data_point] * 20);
	acc_curr_data = -(acc_data[curr_data_point] * 20); 

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

