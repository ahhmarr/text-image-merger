var tim=require('../lib/tim');
var Q=require('q');
var fs=require('fs');
var Sanitize=require('../lib/sanitize');
module.exports={
	generateTextImage:function(text)
	{
		return tim.textImage(text);
	},
	sanitize : function(text)
	{
		return new Sanitize(text);
	}
}