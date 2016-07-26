var tim=require('../lib/tim');
module.exports={
	generateTextImage:function(text)
	{
		return tim.textImage(text);
			
	},
	saveToTemp: function(text){
		tim.textImage(text)
			.then(function(uri,temp)
			{
				temp=temp || '/var/tmp/img.txt';
				fs.writeFile(temp,imgURI);
			})
	}
}