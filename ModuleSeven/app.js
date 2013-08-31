
$(document).ready(function(){

	$("#txtbox").focus(function(){
		$("#txtbox").val("");
		$("#txtbox").css("color", "#000");
	});

	$("#btnSearch").click(function(){

	    $("#searchbar").animate({bottom:'230px'});
	    $("#design").fadeOut();
	    $("#loader").css("display", "block");

	    var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
	    var movie_name = document.getElementById('txtbox').value;
	    var foo = '';

	    $.ajax({
	        url: server,
	        dataType: 'jsonp',
	        data: {
	            q: movie_name,
	            apiKey: 'hcrurhsttexasrgfm2y6yahm'
	        },
	        success: showMovies
	    });

	    function showMovies(response) {

	    	$("#queue").empty();
	    	$("#loader").css("display", "none");

	        console.log('response', response);
	        var movies = response.movies;

	        if(movies.length==0){
	        	$("#queue").append('<h3>' + 'Sorry no results found. Try another one.' + '</h3>');
	        }
	        else{
		        for (var i = 0; i < movies.length; i++) {
		            var movie = movies[i];

		            for (var h = 0; h < movie.abridged_cast.length; h++) {
		            	var cast = movie.abridged_cast[h];
		            	foo = foo + '<p>' + cast.name + '</p>';
		            }

		            $("#queue").append('<div class="pics"><img src="' + movie.posters.detailed + '"/>'
		            	+ '<div class="boo">' + '<div class="title">' + '<strong>' + movie.title 
		            	+ '</strong>' + '</div>' + '<hr>' + '<p>' + '<strong>' + "Release Date: " 
		            	+ '</strong>' + movie.release_dates.theater +'</p>'
		            	+'<p>' + '<strong>' + "Runtime: " + '</strong>' + movie.runtime + " minutes" + '</p>' 
		            	+ '<br>' + '<p>' + '<strong>' +"Cast:" + '</strong>' + '</p>' + foo
		            	+ '<br>' + '<p>' + '<i>' + movie.critics_consensus + '</i>' + '</p>');
		           	foo = '';
		        }
	        }
	    }
	});
});

function onEnter() {
    if(event.keyCode == 13){
        document.getElementById('btnSearch').click();
    }
}