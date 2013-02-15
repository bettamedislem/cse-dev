/* 
	CSE RSS FETCHCER BY SMAHI Zakaria
	version O.1
	zakaria08esi@gmail.com
*/

/* 
TODO
	#thumnails to be added
*/

$(document).ready(function(){

	// résultats limitée à 2	
	var query = "SELECT * FROM feed WHERE url='http://feeds.feedburner.com/cse-club' LIMIT 3";
	
	
	var now = (new Date()).getTime()/1000;


	// If there is no cache set in localStorage, or the cache is older than 1 hour:
	if(!localStorage.cache || now - parseInt(localStorage.time) > 1*60*60)
	{
		$.get("http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(query)+"&format=json&callback=?",function(msg){
		
			// msg.query.results.item is an array:
			var items = msg.query.results.item;
			var htmlString = "";
		
			for(var i=0;i<items.length;i++)
			{
				var art = items[i];
				
				// Extracting the post ID from the permalink:
				var id = art.guid.content.match(/(\d+)$/)[0];
				
				// Looping and generating the markup of the articles:
				
				htmlString += '<div class="article">\
								<img src="./images/icon.png" />\
								<h2>'+art.title+'</h2>\
								<p>'+art.description+'</p>\
								<a href="'+art.link+'" target="_blank">Read more</a>\
								</div>';
			}
			
			// Setting the cache
			localStorage.cache	= htmlString;
			localStorage.time	= now;
			
			// Updating the content div:
			$('#content').html(htmlString);
		},'json');
	}
	else{
		// The cache is fresh, use it:
		$('#content').html(localStorage.cache);
	}
});
