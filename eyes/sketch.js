var v,u,flag,t,Diameter,bg;
function setup() {
	colorMode(RGB,255);
	flag=1;
	Diameter =200;
	createCanvas(windowWidth, windowHeight);
	t = windowWidth/2 - Diameter;
	v = {
		x:0,
		y:0
	};
	u = {
		x:0,
		y:0
	};
	bg = {
		r:234,
		g:192,
		b:134
	};

}

function draw() {
	if(flag){
		//background(80,0,10);
		background(bg.r,bg.g,bg.b);	
		draw_spooky_eye(t,windowHeight/2,Diameter);
		draw_spooky_eye(t+Diameter+20,windowHeight/2,Diameter);
	}
}
function get_vec(x,y,v){
	factor = 25*Diameter/260;  
	v.x = (mouseX - x);
	v.y = (mouseY - y);
	norm_v = dist(v.x,v.y,0,0);
	v.x/=norm_v;
	v.y/=norm_v;
	v.x*=factor;
	v.y*=factor;
}
function draw_spooky_eye(x,y,dia){
	outer(x,y,dia);
	inner_dia = (12/26) * dia;
	get_vec(x,y,v);
	inner(x+v.x,y+v.y,inner_dia);
	nerves(x+v.x,y+v.y,inner_dia,x,y,dia);
	cover(x,y,dia);
}

function cover(x,y,dia){
	noFill();
	//stroke(80,0,10);
	stroke(bg.r,bg.g,bg.b);
	strokeWeight(10);
	ellipse(x,y,dia,dia);
}

function outer(x,y,dia){
	for(var i =0;i<dia;i+=5){
		b = map(i,0,dia,10,245);
		fill(b+80,b,b+10);
		noStroke();
		ellipse(x,y,dia-i,dia-i);
	}
}
function inner(x,y,dia){
	for(var i = 0, c = 3, d = 1;i<dia;i+=5){	
		fill(40+c*i,10+d*i,0);
		noStroke();
		ellipse(x,y,dia-i,dia-i);
	}
	innermost(x,y,dia/3);
	fill(255);
}
function innermost(x,y,dia){
	noStroke();	
	fill(40,10,0);
	ellipse(x,y,dia,dia);
	fill(0);
	a = 0.1;
	c = 0.2;
	ellipse(x+dia*a,y-dia*a,dia*c/2,dia*c/4);
	ellipse(x-dia*a,y+dia*a,dia*c/1.2,dia*c);
	fill(255,200);
	get_vec(x,y,u);
	ellipse(x+u.x/2,y+u.y/2,dia*c/2,dia*c/2);
	draw_spikes(x,y,dia);
}
function draw_spikes(x,y,dia){
	fill(40,10,0,150);
	var radius = dia/2;
	var delta = 0.08;
	var num = 16;
	var offset = TWO_PI/12;
	var i = offset;
	var Long = 1;
	while(i<TWO_PI+offset){
		X1 = x + radius * cos(i-delta);
		Y1 = y + radius * sin(i-delta);
		X2 = x + radius * cos(i+delta);
		Y2 = y + radius * sin(i+delta);
		X3 = x + radius * cos(i) * (1.5+Long/2);
		Y3 = y + radius * sin(i) * (1.5+Long/2);
		// if(i==1)
		// 	console.log(X1,Y1,X2,Y2,X3,Y3);
		triangle(X1,Y1,X2,Y2,X3,Y3);
		i+=TWO_PI/num;
		Long^=1;
	}
}
function get_arg(x,y){
	if (x>=0 && y>=0){
		return atan(y/x);
	}
	else if (x>0 && y<0){
		return TWO_PI + atan(y/x);
	}
	else{
		return PI + atan(y/x); 
	}
}

function nerves(x,y,dia,x1,y1,dia1){
	stroke(100,20,20,200);
	strokeWeight(1.2*dia1/260);
	noFill();
	
	var num = floor(sqrt(dia1));
	var offset = TWO_PI/10;
	var i = offset;
	var distance = dist(x,y,x1,y1);
	var radius_inv = dia1/2 - distance;

	while(i<TWO_PI+offset){

		tolerance = 0.1*radius_inv;

		radius = radius_inv + random(-tolerance,tolerance);

		X1 = x + radius * cos(i);
		Y1 = y + radius * sin(i);

		dist_walt = dist(X1,Y1,x1,y1);
		if(dist_walt>=dia1/2){
			continue;
		}

		Ang = get_arg(X1 - x1,Y1 - y1);
		Tol = 0.2;
		Ang+=random(-Tol,Tol);		

		X2 = x1 + dia1/2 * cos(Ang);
		Y2 = y1 + dia1/2 * sin(Ang);
		
		var v_x = X1 - X2;
		var v_y = Y1 - Y2;
		var dis = dist(v_x,v_y,0,0);
		v_x/=dis;
		v_y/=dis;
		var factor1 = dis * 0.33;
		var factor2 = dis * 0.67;

		var Orig = [v_x,v_y];
		
		var Rot1 = Rotate(Orig,X2,Y2,factor1);
		var Rot2 = Rotate(Orig,X2,Y2,factor2);

		bezier(X1,Y1,Rot1[0],Rot1[1],Rot2[0],Rot2[1],X2,Y2);
		i+=TWO_PI/num;
	}
}

function Rotate(vec,x2,y2,factor){
	x = vec[0];
	y = vec[1];
	theta = random(-PI/6,PI/6);
	c = cos(theta);
	s = sin(theta);
	X = c*x - s*y;
	Y = s*x + c*y;
	var f_x = x2 + X*factor;
	var f_y = y2 + Y*factor;
	var ans = [f_x,f_y];
	return ans;
}

function mousePressed(){
	flag^=1;
}
// r = map(i,0,dia/5,255,220);
// g = map(i,0,dia/5,255,180);
// b = map(i,0,dia/5,255,180);
// fill(r,g,b);


// function sum(a1,a2,offset){
// 	var s = a1+a2;
// 	if(s<offset + TWO_PI){
// 		return s;
// 	}
// 	else if(s<offset + TWO_PI*2){
// 		return s - TWO_PI;
// 	}

// 	return s - TWO_PI*2;
// }
// function diff(a1,a2,offset){
// 	var d = a1-a2;
// 	if(d<offset - TWO_PI){
// 		return d+TWO_PI*2;
// 	}
// 	else if(d<offset){
// 		return d+TWO_PI;
// 	}
// 	return d;
// }