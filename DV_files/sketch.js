
var gyro_data = []; 
var mag_data = []; 
var acc_data = []; 
var canvas_width = 1420; 
var canvas_height = 700; 
var curr_data_point = 0; 
var prev_second = 0; //for no repeated seconds takes care of milliseconds
var g_pos = 50; 
var mag_pos = 250;
var acc_pos = 450; 
var active = false; 
var display = false; 
var button_height = 100; 
var g_data, m_data, a_data; 


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
  	start_button.position(50,button_height); 

  	stop_button = createDiv("STOP"); 
  	stop_button.class("button_style"); 
  	stop_button.mousePressed(deactivate); 
  	stop_button.position(200,button_height); 

  	display_button = createDiv("DISPLAY"); 
  	display_button.class("button_style"); 
  	display_button.mousePressed(display_func); 
  	display_button.position(350,button_height); 

  	gdd = createDiv("GYRO DATA"); 
  	gdd.class("name_style"); 
  	gdd.position(800, button_height); 

  	mdd = createDiv("MAG DATA"); 
  	mdd.class("name_style"); 
  	mdd.position(1000, button_height); 

  	add = createDiv("ACCEL DATA"); 
  	add.class("name_style"); 
  	add.position(1200, button_height);

	gdd.hide(); 
	mdd.hide(); 
	add.hide(); 

}

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
	// curr_data_point += 1; 
}

function timed_bar_graph(s){
	prev_second = s; 
	clear();
	redraw(); 
	bar_draw(); 
}

function draw() {
	let s = second(); 
	// if (s != prev_second && curr_data_point <= gyro_data.length - 1 ){
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

	if (display == true){
		display_button.style('background-color', '#4400ff');
		gdd.show(); 
		mdd.show(); 
		add.show();

		if (active == true){

			var curr_data_pos = button_height + 50; 
			
			for (var i = 0; i < gyro_data.length; i++){
				fill(255,255,255); 
				textSize(15); 
				text(gyro_data[i], 800, curr_data_pos); 
				text(mag_data[i], 1000, curr_data_pos); 
				text(acc_data[i], 1200, curr_data_pos); 

				curr_data_pos += 20; 

				if (curr_data_pos >= 600){
					timed_bar_graph(s); //figure out this issue
					curr_data_pos = button_height + 50; 
				}

			}
			
		}

	}
	else{
		display_button.style('background-color', '#ffffff');
		gdd.hide(); 
		mdd.hide(); 
		add.hide(); 

	}
}










