var Canvas=require('canvas'),
	Image=Canvas.Image,
	cHeight=300,
	cWidth=800;
	
var fs=require('fs');
var Q=require('q');
var htt=require('html-to-text');
var Sanitize=require('./sanitize');


function textImage(text,noClean){
	var heading=undefined;
	if(typeof text === 'object'){
		heading=text.heading;
		text=text.text;
	}
	if(!noClean){
	var s=new Sanitize(text);
		text=s.removeWhiteSpace()
			.removeTags()
			.removeSpChars(':')
			.toSentenceCase()
			.getString();
	}
	canvas=new Canvas(cWidth,cHeight),
	ctx=canvas.getContext('2d');
	var defer=Q.defer();
	// writing text		
	paintTextToCenter(ctx,text,heading);
	
	ctx.stroke();
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

function saveToTemp(text,temp){
	var defer=Q.defer();
	textImage(text)
		.then(function(uri)
		{
			temp=temp || '/var/tmp/img.png';
			var imgURI=uri.substr(22);
			fs.writeFile(temp,imgURI,'base64',function(err)
			{
				if(err)
					defer.reject(err)
				else
					defer.resolve({
						uri : uri,
						absURL : temp
					});
			});
		})
	return defer.promise;
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

function paintTextToCenter(ctx,text,heading)
{
	ctx.fillStyle='#4B4A4A';
	ctx.font='bold 18px sans';
	ctx.textBaseline='center';
	ctx.textAlign='center';
	if(heading){
		paintText(ctx,heading,1);
	}
	getLines(ctx, text, cWidth-10).forEach(function(a,b)
	{
		paintText(ctx,a,b+2);
	});
	
}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function paintText(ctx,text,h)
{
	var height=41*h;
	ctx.fillText(text,Math.round(cWidth/2),height);
}
function removeWhiteSpace(text)
{
	return text.replace(/\s+/g,' ');
}
var create={
	textImage : textImage,
	saveToTemp: saveToTemp
};


module.exports=create
