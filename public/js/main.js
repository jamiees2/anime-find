var list = {};
var filterStatus = function(animelist, status) {
	return _.filter(animelist["myanimelist"]["anime"], function(item){
    	return parseInt(item["my_status"][0]) === status
	});
}
var getAnime = function(animelist) {
	if (typeof animelist.ptw === "undefined")
		animelist.ptw = filterStatus(animelist, 6)
	if (typeof animelist.completed === "undefined"){
		animelist.completed = filterStatus(animelist,2);
		animelist.rewatch = _.filter(animelist.completed, function(item){ return parseInt(item["my_score"]) >= 9});
	}
	var toWatch;
	if (Math.random() < 0.9) {
	    toWatch = _.sample(animelist.ptw);
	    $('h2 span.title').text("you should fucking watch ")
	} else {
		toWatch = _.sample(animelist.rewatch);
	    $('h2 span.title').text("you should fucking rewatch ")
	}

	$('h2 span.anime')
	    .html("<a href='http://myanimelist.net/anime/" + toWatch.series_animedb_id[0] + "'>"+toWatch.series_title[0]+"</a>");
}
$(document).on('ready',function(){
    $('#form').on('submit', function(e){
        e.preventDefault();

        $("h2").show();
        var username = $('input[name=username]').val().toLowerCase();
        if (typeof list[username] === "undefined") {
        	$(".loader").show();
	        $.getJSON('/getanime', {name: username }, function(data){
	        	$(".loader").hide();
	            if (data === null)
	                return $("h2 span.title").text("myanimelist is being a cluster of faggots, please try again later")
	           	list[username] = data;
	           	getAnime(list[username]);
	        });
	   	} else {
	   		getAnime(list[username]);
	   	}
    });
});