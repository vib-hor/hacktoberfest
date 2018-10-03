var bubble = [],flag;
function setup() {
	createCanvas(windowWidth, windowHeight);
	for(var i=0;i<100;i++){
		bubble.push(new Bubble());
	}
	flag = 1;
}

function draw() {
	if(flag){
		background(0);
		for(var i=0;i<100;i++){ 
			bubble[i].display();
			bubble[i].move(0.1);
		}
	}
}

class Bubble {
	constructor(){
		this.x = random()*width;
		this.y = random()*height;
		this.radius = random(0,0.1)*width;
	}
	display(){
		noStroke();
		fill(255);
		ellipse(this.x,this.y,this.radius);
	}
	move(Constant){
		var s_x = map(mouseX,0,width,-Constant,Constant);
		var s_y = map(mouseY,0,height,-Constant,Constant);
		this.x+=s_x*width;
		this.y+=s_y*height;
		this.x = this.boundaries(this.x,width);
		this.y = this.boundaries(this.y,height);
	}
	boundaries(x,bound){
		if(x>bound){
			x-=bound;
		}
		else if(x<0){
			x+=bound;
		}
		return x;
	}
}

function mousePressed(){
	flag^=1;
}