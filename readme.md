##Text Image Merger

Merge Image Pattern with a text sentence


```
var tim=require('text-image-merger');
tim.generateTextImage(text)
.then(function(imageURI)
{
	res.send('<img src="'+imageURI+'" />') ;
}).catch(err){
	throw new Error(err);
}

```