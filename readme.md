##Text Image Merger

Merge Image Pattern with a text sentence
v 0.0.1

```var mip=require('text-image-merger');
mip.generateTextImage(text)
.then(function(imageURI)
{
	res.send('<img src="'+imageURI+'" />') ;
}).catch(err){
	throw err;
} 
```