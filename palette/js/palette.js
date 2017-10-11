window.onload=function(){
	let canvas=document.querySelector('canvas');
	let ctx=canvas.getContext("2d");
	let xiantiao=document.querySelector('.icon-xiantiao');
	let xuxian=document.querySelector('.icon-xuxian');
	let yuan=document.querySelector('.icon-yuan');
	let juxing=document.querySelector('.icon-juxing');
	let duobian=document.querySelector('.icon-iconfontwubianxing');
	let qianbi=document.querySelector('.icon-pan_icon');
	let duojiao=document.querySelector('.icon-wujiaoxing-copy');
	let chehui=document.querySelector('.icon-chexiaofanhuichehuishangyibu');
	let xp=document.querySelector('.eraser');
	let xps=document.querySelector('.icon-xiangpi')
	let opcity=document.querySelector('.opcity');
	let font=document.querySelector('.icon-ziti');
	let miaobian=document.querySelector('.icon-miaobian');
	let mys=document.querySelector('.mys input');
	let tianchong=document.querySelector('.icon-tianchong-hong');
	let tys=document.querySelector('.tys input');
	let caijian=document.querySelector('.icon-caijian');
	let caiqie=document.querySelector('.caiqie')
	class Palette{
		constructor(canvas,ctx,opcity,xp){
			this.canvas=canvas;
			this.ctx=ctx;
			this.cw=this.canvas.width;
			this.ch=this.canvas.height;
			this.xiantiao=xiantiao;
			this.history=[];
			this.opcity=opcity;
			this.xp=xp;
			this.strokeStyle='red';
			this.fillStyle='red';
			this.temp=null;
			this.style='stroke';
		}
		// 直线
		line(dx,dy,mx,my){	
			this.ctx.beginPath();
			this.ctx.moveTo(dx, dy);
			this.ctx.lineTo(mx, my);
			this.ctx.strokeStyle=this.strokeStyle;
			this.ctx.stroke();				
		}
		// 虚线
		dash(dx,dy,mx,my){
			this.ctx.beginPath();
			this.ctx.moveTo(dx, dy);
			this.ctx.setLineDash([3,3]);
			this.ctx.lineTo(mx, my);
			this.ctx.strokeStyle=this.strokeStyle;
			this.ctx.stroke();
		}
		// 画圆
		circle(dx,dy,mx,my){
			this.ctx.beginPath();
			let r=Math.sqrt(Math.pow(mx-dx,2)+Math.pow(my-dy,2))
			this.ctx.arc(dx, dy, r, 0, Math.PI*2);
			this.ctx[this.style]();
			this.ctx.fillStyle=this.fillStyle;
		}
		// 画矩形
		square(dx,dy,mx,my){
			this.ctx.beginPath();
			this.ctx.moveTo(dx, dy);
			this.ctx.lineTo(dx, my);
			this.ctx.lineTo(mx, my);
			this.ctx.lineTo(mx, dy);
			this.ctx.closePath();
			this.ctx[this.style]();
			this.ctx.fillStyle=this.fillStyle;
			this.ctx.strokeStyle=this.strokeStyle;
		}
		// 画多边形
		ploy(dx,dy,mx,my,n){
			this.ctx.beginPath();
			let r=Math.sqrt(Math.pow(mx-dx,2)+Math.pow(my-dy,2));
			let deg=Math.PI*2/n;
			this.ctx.moveTo(dx+r, dy);
			for(let i=0;i<n;i++){
				let x=dx+Math.cos(deg*i)*r,
					y=dy+Math.sin(deg*i)*r;
					this.ctx.lineTo(x, y);
			}
			this.ctx.closePath();
			this.ctx[this.style]();
			this.ctx.fillStyle=this.fillStyle;
		}
		// 画多角形
		ployJ(dx,dy,mx,my,n){
			this.ctx.beginPath();
			let r=Math.sqrt(Math.pow(mx-dx,2)+Math.pow(my-dy,2));
			let deg=Math.PI/n;
			this.ctx.moveTo(dx+r, dy);
			for(let i=0;i<2*n;i++){
				let r1;
				r1=i%2==0 ? r:r/2;
				let x=dx+Math.cos(deg*i)*r1,
					y=dy+Math.sin(deg*i)*r1;
					this.ctx.lineTo(x, y);
			}
			this.ctx.closePath();
			this.ctx[this.style]();
			this.ctx.fillStyle=this.fillStyle;
		}
		// 铅笔
		pencil(){
			this.opcity.onmousedown=function(e){
				let dx=e.offsetX,dy=e.offsetY;
				this.ctx.beginPath();
				this.ctx.moveTo(dx, dy);
				this.opcity.onmousemove=function(e){
					let mx=e.offsetX,my=e.offsetY;
					this.ctx.clearRect(0, 0, this.cw,this.ch);
					if(this.history.length){
						ctx.putImageData(this.history[this.history.length-1], 0,0);
					}				
					this.ctx.lineTo(mx, my);
					this.ctx.strokeStyle=this.strokeStyle;
					this.ctx.stroke();
				}.bind(this)
				this.opcity.onmouseup=function(){
					this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
					this.opcity.onmousemove=null;
					this.opcity.onmouseup=null;
				}.bind(this)
			}.bind(this)
		}
		// 撤销
		delete(){
			if(!this.history.length){return}
			this.ctx.clearRect(0, 0, this.cw, this.ch);
			this.history.pop();
			this.ctx.putImageData(this.history[this.history.length-1],0,0);
		}
		// 橡皮
		eraser(){
			this.opcity.onmousedown=function(e){
				this.opcity.onmousemove=function(e){
					let mx=e.offsetX-10,my=e.offsetY-10;
					if(mx>this.cw-20){
						mx=this.cw-20;
					}
					if(mx<0){
						mx=0;
					}
					if(my>this.ch-20){
						my=this.ch-20;
					}
					if(my<0){
						my=0;
					}
					this.xp.style.display='block';
					this.xp.style.left=`${mx}px`;
					this.xp.style.top=`${my}px`;
					this.ctx.clearRect(mx, my, 20, 20)
				}.bind(this)
				this.opcity.onmouseup=function(){
					this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
					this.xp.style.display='none'
					this.opcity.onmousemove=null;
					this.opcity.onmouseup=null;
				}.bind(this)
			}.bind(this)
		}
		// 文字
		font(){
			let tops=0,lefts=0;
			this.opcity.onmousedown=function(e){
				this.opcity.onmousedown=null;
				let cx=e.offsetX,cy=e.offsetY;
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1], 0,0);
				}
				let divs=document.createElement('div');
				divs.style.cssText=`
				width:100px;height:30px;border:1px dashed #333;
				position:absolute;top:${cy}px;left:${cx}px;outline:none;cursor:move;
				`;
				divs.contentEditable=true;
				this.opcity.appendChild(divs);
				divs.onmousedown=function(e){
					let top=divs.offsetTop,left=divs.offsetLeft;
					let top2=e.clientY,left2=e.clientX;
					divs.onmousemove=function(e){
						let top1=e.clientY,left1=e.clientX;
						tops=top+top1-top2;
						lefts=left+left1-left2;
						divs.style.top=`${tops}px`;
						divs.style.left=`${lefts}px`;
					}
					divs.onmouseup=function(){
						divs.onmousemove=null;
						divs.onmouseup=null;
					}
				}
				divs.onblur=function(){
					let value=divs.innerText;
					this.opcity.removeChild(divs);					
					this.ctx.font='bold 20px sans-serif';
					this.ctx.textAlign = 'center';
					this.ctx.textBaseLine = 'middle';
					this.ctx.fillText(value, lefts, tops);
					this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
				}.bind(this)
			}.bind(this)
		}
		// 描边色
		mcolor(){
			mys.onblur=function(){
				let value=mys.value;
				this.strokeStyle=value;
			}.bind(this)
		}
		tcolor(){
			tys.onblur=function(){
				let value=tys.value;
				console.log(value);
				this.fillStyle=value;
			}.bind(this)
		}
		// 填充
		tianchongs(){
			this.style='fill';
		}
		miaobians(){
			this.style='stroke';
		}
		caiqiex(caiqie){
			let minX,minY,w,h;
			this.opcity.onmousedown=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				caiqie.style.display='block';
				caiqie.style.width=0;
				caiqie.style.height=0;
				this.opcity.onmousemove=function(e){
					let ox=e.offsetX,oy=e.offsetY;
					w=Math.abs(cx-ox),h=Math.abs(cy-oy);
					minX=ox>=cx?cx:ox;
					minY=oy>=cy?cy:oy;
					caiqie.style.left=`${minX}px`;
					caiqie.style.top=`${minY}px`;
					caiqie.style.width=`${w}px`;
					caiqie.style.height=`${h}px`;
				}
				this.opcity.onmouseup=function(){
					this.temp=this.ctx.getImageData(minX,minY,w,h);
					this.ctx.clearRect(minX,minY,w,h);
					this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
					this.ctx.putImageData(this.temp,minX,minY);
					this.opcity.onmousemove=null;
					this.opcity.onmouseup=null;
					this.drag(minX,minY,caiqie);
				}.bind(this)
			}.bind(this)
		}		
		drag(x,y,obj){
			let that=this;
			this.opcity.onmousedown=function(e){console.log(2);
				let cx=e.offsetX,cy=e.offsetY;
				that.opcity.onmousemove=function(e){

					let ox=e.offsetX,oy=e.offsetY;
					let lefts=x+ox-cx,tops=y+oy-cy;
					that.ctx.clearRect(0, 0, that.cw, that.ch);
					if(that.history.length){
						that.ctx.putImageData(that.history[that.history.length-1],0,0)
					}
					obj.style.left=`${lefts}px`;
					obj.style.top=`${tops}px`;
					that.ctx.putImageData(that.temp,lefts,tops);
				}.bind(that)
				that.opcity.onmouseup=function(){
					that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
					that.temp = null;
					obj.style.display = 'none';
					that.opcity.onmousemove = null;
					that.opcity.onmouseup = null;
				}
			}
		}
		drow(type,num){
			this.opcity.onmousedown=function(e){
				let dx=e.offsetX,dy=e.offsetY;
				this.opcity.onmousemove=function(e){
					let mx=e.offsetX,my=e.offsetY;
					this.ctx.clearRect(0, 0, this.cw,this.ch);
					if(this.history.length){
						this.ctx.putImageData(this.history[this.history.length-1], 0,0);
					}
					this[type](dx,dy,mx,my,num)
				}.bind(this)
				this.opcity.onmouseup=function(){
					this.ctx.setLineDash([3,0]);
					this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
					this.opcity.onmousemove=null;
					this.opcity.onmouseup=null;
				}.bind(this)
			}.bind(this)
		}
	}
	let palette=new Palette(canvas,ctx,opcity,xp);
	palette.drow('line');
	// 先触发一次
	// xiantiao.onclick();
	xiantiao.onclick=function(){
		palette.drow('line');
	}
	xuxian.onclick=function(){
		palette.drow('dash');
	}
	yuan.onclick=function(){
		palette.drow('circle');
	}
	juxing.onclick=function(){
		palette.drow('square');
	}
	duobian.onclick=function(){
		let num=prompt('请输入边数',5);
		palette.drow('ploy',num);
	}
	duojiao.onclick=function(){
		let num=prompt('请输入边数',5);
		palette.drow('ployJ',num);
	}
	qianbi.onclick=function(){
		palette.pencil();
	}
	chehui.onclick=function(){
		palette.delete();
	}
	xps.onclick=function(){
		palette.eraser();
	}
	font.onclick=function(){
		palette.font();
	}
	mys.onclick=function(){		
		palette.mcolor();
	}
	tys.onclick=function(){
		palette.tcolor();
	}
	miaobian.onclick=function(){
		palette.miaobians();
	}
	tianchong.onclick=function(){
		palette.tianchongs()
	}
	caijian.onclick=function(){
		console.log(1)
		palette.caiqiex(caiqie);
	}
}
