var tim=require('./../lib/tim');
var http=require('http');
var disp=require('httpdispatcher');
var port=3011;
var Sanitize=require('./../lib/sanitize');

 disp.beforeFilter(/\//, function(req, res, chain) { //any url
    console.log("Before filter");
    res.writeHead(200,{
		'Content-Type' :'text/html'
	});
    chain.next(req, res, chain);
});

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
	
	saveImage(req,res,txt);
});
disp.onGet('/text',function(req,res)
{
	var txt=req.params.text || 'Lorem Ipsum : Lorem ipsum';
	var s=new Sanitize(txt);
	txt=s.removeWhiteSpace()
			.removeTags()
			.removeSpChars()
			.toTitleCase()
			.getString();
	res.end(txt);
});



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
	console.log('called');
	tim.saveToTemp(txt).then(function(resp)
	{
		displayImage(req,res,resp.uri);
	});
}