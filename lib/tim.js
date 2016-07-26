var Canvas=require('canvas'),
	Image=Canvas.Image,
	cHeight=300,
	cWidth=700,
	canvas=new Canvas(cWidth,cHeight),
	ctx=canvas.getContext('2d');
var fs=require('fs');
var Q=require('q');

var create={
	textImage : function(text)
	{
		// console.log('called with',text);
		var defer=Q.defer();
		// writing text		
		
		paintTextToCenter(ctx,text);
		
		ctx.stroke();
		// text writing done
		drawImage('images/img.jpg',ctx)
				.then(function(resp)
				{
					defer.resolve(resp)
				}).catch(function(err)
				{
					defer.reject(err);
				})
		return defer.promise;
	}
}
function drawImage(imgURL,ctx){
	var defer=Q.defer();
	fs.readFile(__dirname+'/../images/img.jpg',function(err,i)
		{
			if(err){
				defer.reject(err);return;
			}
			img =new Image;
			img.src=i;
			ctx.globalCompositeOperation='destination-over';
			var pat=ctx.createPattern(img,"repeat");
			ctx.rect(0,0,cWidth,cHeight);
			ctx.fillStyle=pat;
			ctx.fill();
			var url=canvas.toDataURL();
			if(url){
				defer.resolve(url);
			}else{
				defer.reject('some error');
			}
		});
	return defer.promise;
}
function paintTextToCenter(ctx,text)
{
	ctx.fillStyle='#4B4A4A';
	ctx.font='bold 20px sans';
	ctx.textBaseline='center';
	ctx.textAlign='center';
	var totalStringWidth=ctx.measureText(text).width;
	var oneCharWidth=totalStringWidth/text.length;
	var noOfLinesRequired=Math.round(totalStringWidth/cHeight);
	var i=0,max=60;
	var x=1;
	while(true){
		var subText=text.substr(i,max);
		if(subText.length===0){
			break;
		}
		paintText(ctx,subText,x);
		i+=max;
		x++;
	}
}
function paintText(ctx,text,h)
{
	var height=41*h;
	ctx.fillText(text,Math.round(cWidth/2),height);
}
module.exports=create
