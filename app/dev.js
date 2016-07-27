var tim=require('./../lib/tim');
var http=require('http');
var disp=require('httpdispatcher');
var port=3011;

var server=http.createServer(function(req,res)
{
	disp.dispatch(req,res);
}).listen(port,function()
{
	console.log('==PRODUCTION MODE STARTED ==port',port);
});

disp.onGet('/',function(req,res)
{
	var txt=req.params.text || 'Lorem Ipsum : Lorem ipsum';
	render(req,res,saveImage.bind(null,req,res,txt));
});
function render(req,res,fn)
{
	res.writeHead(200,{
		'Content-Type' :'text/html'
	});
	fn();
}

function displayImage(req,res,url)
{
	url = url || false;
	if(!url)
		res.end('<h1> no uri specified </h1>');
	else
		res.end('<img src="'+url+'" />');
}

function saveImage(req,res,txt)
{
	tim.saveToTemp(txt).then(function(resp)
	{
		displayImage(req,res,resp.uri);
	});
}