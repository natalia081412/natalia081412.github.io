function loadImages(){
	ballonImage = new Image();
	shotImage = new Image();
	bulletImage = new Image();

	ballonImage.src = "Images/ballon.png";
	shotImage.src = "Images/player.png"
	bulletImage.src = "Images/bullet.png"
}


function init(){
canvas = document.getElementById('mycanvas');
console.log(canvas);
gameover = false;
pen = canvas.getContext('2d');

W = canvas.width;
H = canvas.height;
prev_counter = 0;
counter = 0;

loadImages();
shooter = {
	x : 300,
	y : H-50,
	w : 50,
	h : 50,
	speed : 25,
	bullets : [],

	update : function(){
	},

	draw : function(){
		pen.drawImage(shotImage,shooter.x,shooter.y,shooter.w,shooter.h)
	},

	shoot : function(){

		if(counter-prev_counter>=1){
			console.log("Shooting a bullet");

			var b = new bullet(this.x + (this.w)/2, this.y,10);
			this.bullets.push(b);
			prev_counter = counter;

			ballons.forEach(function(ballon){

			if(isCollidingWithBullet(b,ballon)){
				this.state = "inactive";
				console.log("ballon died");
				var index = ballons.indexOf(ballon);
				ballons.splice(index,1);
				}

			});

		}
		
	}

};
function buttonGotPressed(e){
	if(e.key==" "){
		shooter.shoot();
	}
	if(e.key=="ArrowLeft"){
		shooter.x = shooter.x - shooter.speed;
		if(shooter.x<=0){
			shooter.x= 0;
		}
	}
	if(e.key=="ArrowRight"){
		shooter.x = shooter.x + shooter.speed;
		if(shooter.x >= W-shooter.w){
			shooter.x = W-shooter.w;
		}
	}
}

document.addEventListener('keydown', buttonGotPressed);
ballons = [];
var e = new ballon(10,20,5);
ballons.push(e);
}
function bullet(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 4;
	this.h = 14;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){
        pen.drawImage(bulletImage,this.x,this.y,this.w,this.h);

	}

	this.update = function(){
		this.y -= this.speed;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}

function ballon(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 50;
	this.h = 50;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){

		pen.drawImage(ballonImage,this.x,this.y,this.w,this.h);

	}

	this.update = function(){

		this.x = this.x + this.speed;
		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}

		this.y++;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}


function draw(){
	pen.clearRect(0,0,W,H);

	pen.fillStyle = "red"  
	shooter.draw()
	shooter.bullets.forEach(function(bullet){
		bullet.draw();
	});
	ballons.forEach(function(ballon){
		ballon.draw();

	});

}

function update(){
	shooter.update()

	shooter.bullets.forEach(function(bullet){
		bullet.update();

	});
	ballons.forEach(function(ballon){
		ballon.update();
	});
	var no =  Math.random();
	if(no<0.01){
		var x = Math.floor(Math.random()*(W-50));
		var y = Math.floor(Math.random()*100);

		var speed = Math.random()*10 +2;
		var negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}

		var e = new ballon(x,y,speed);
		ballons.push(e);
	}

	ballons.forEach(function(ballon){
		if(isColliding(shooter,ballon)){
			alert("Game over. Press OK to restart!");
			gameover = true;
		}

	});
}
function isColliding(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis && y_axis;
}

function isCollidingWithBullet(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis || y_axis;
}
function render(){
	draw();
	update();
	console.log("in render");
	counter++;
	if(gameover == false){
		window.requestAnimationFrame(render);
	}
	else{
		startGame();
	}
	}
	
function startGame(){
	init();
	render();
}

startGame();
