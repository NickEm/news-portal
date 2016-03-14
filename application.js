$(document).ready(function($) {

    var loadNews = function () {
        console.log('News are loadings');
        $.ajax({
                url: "resources/news.json"
            }
        ).then(
            function (data, textStatus, jqXHR) {
                console.log('News received', data);
                updateNews(data);
            },

            function (jqXHR, textStatus, errorThrown) {
                console.error('Error', textStatus);
                console.error('jqXHR', jqXHR);
                console.error('errorThrown', errorThrown);
            }
        );
    };

    var updateNews = function () {
        console.log('News are loadings');
        $.ajax({
                url: "resources/news.json"
            }
        ).then(
            function (data, textStatus, jqXHR) {
                console.log('News received', data);
                updateNavigation(data);
            },

            function (jqXHR, textStatus, errorThrown) {
                console.error('Error', textStatus);
                console.error('jqXHR', jqXHR);
                console.error('errorThrown', errorThrown);
            }
        );
    };
});