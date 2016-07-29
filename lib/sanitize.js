var htt=require('html-to-text');
var sentence=require('sentence-case');

function Sanitize(text){
	this.text=text;
}
Sanitize.prototype.getString=function()
{
	return this.text;
}
Sanitize.prototype.removeTags=function()
{
	this.text=htt.fromString(this.text);
	return this;
}
Sanitize.prototype.toTitleCase=function()
{
    this.text=this.text.replace(/\w\S*/g, function(word){
    		return word.charAt(0)
    				  .toUpperCase() + 
    				  word.substr(1).
    				  toLowerCase();
    			});
    return this;
}
Sanitize.prototype.toSentenceCase=function()
{
    this.text=sentence(this.text);
    return this;
}
Sanitize.prototype.removeWhiteSpace=function()
{
	this.text=this.text.replace(/\s+/g,' ');
	return this;
}
Sanitize.prototype.removeSpChars=function(skip)
{
	skip = skip || '';
	var exp=new RegExp('[^ A-Z0-9,\'\"\\?\\.'+skip+']+','ig');
	this.text=this.text.replace(exp, "");
	return this;
}
module.exports=Sanitize;