var tim=require('../lib/tim');
var Q=require('q');
var fs=require('fs');
module.exports={
	generateTextImage:function(text)
	{
		return tim.textImage(text);
	}
}