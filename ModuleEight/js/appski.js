var box = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json';
var inTheaters = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var opening = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json';
var upMovies = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json';
var topRent = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json';
var curRelease = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json';
var newRelease = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json';
var upDvds = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/upcoming.json';
var mSearch = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';

function testing(qqq) {
    var movieName = $("#tbSearch").val();
    var app = {};
    $("#container").empty();
    $(".full-movie-item").empty();
    $("#loader").css("display", "block");
    $.ajax({
        url: qqq,
        data: {
            q: movieName,
            apiKey: 'hcrurhsttexasrgfm2y6yahm'
        },
        dataType: 'jsonp',
        success: showResults
    });

    function getTemplate(template_id, context) {
        var template, $template, markup;
        template = $('#' + template_id);
        $template = Handlebars.compile(template.html());
        markup = $template(context);
        return markup;
    }

    function showResults(response) {
        $("#loader").css("display", "none");
        app.movies = response.movies;
        var movie, template, $template, markup;

        if(app.movies.length==0){
            $("#container").append('<h3 class="text-center">' + 'Sorry no results found. Try another one.' + '</h3>');
        } 
        else {
            for (var i = 0; i < app.movies.length; i++) {
                movie = app.movies[i];
                movie._index = i;
                $('#container').append(getTemplate('tpl-movie-item', movie));
            }
            $('#container>a').click(function(ev) {
                var data = $(ev.target).closest('a').data();
                var movie = app.movies[data.id];
                $('#container').html(getTemplate('tpl-full-movie-item', movie));

                var x = movie.links.clips;
                $.ajax({
                    url: x,
                    dataType: 'jsonp',
                    data: {
                        apikey: 'hcrurhsttexasrgfm2y6yahm',
                    }, success: showClips
                });

                function showClips(response){
                   
                    console.log('clips', response);
                    var clips = response.clips;

                    for (var i = 0; i < clips.length; i++) {
                        var clip = clips[i];
                        clip._index = i;
                        $('#rightSide').append(getTemplate('tpl-clips', clip));
                    }
                }
            });

            $("#homePage").click(function() {
                location.reload();
            });
        }
    }
}