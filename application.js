$(document).ready(function () {

    var loadCategories = function () {
        $.ajax({
                url: "resources/categories.json",
                dataType: "json",
                async: false
            }
        ).then(
            function (data, textStatus, jqXHR) {
                updateCategories(data);
            },
            function (jqXHR, textStatus, errorThrown) {
                console.error('errorThrown', errorThrown);
            }
        );
    };

    var updateCategories = function (data) {
        data.forEach(function (item) {
            var category = '<a id="' + item.name + '" class="btn btn-default btn-lg" href="#' + item.name + '" >' + item.name + '</a>';
            $('#category_grid').append(category);
        });
        var initialCategory = '#Nature';
        $(initialCategory).addClass("active");
        history.pushState(null, '', initialCategory);
    };

    loadCategories();

    var loadNews = function (url) {
        if(url){
            $.ajax({
                    url: url,
                    dataType: "json",
                    async: false
                }
            ).then(
                function (data, textStatus, jqXHR) {
                    updateNews(data);
                },

                function (jqXHR, textStatus, errorThrown) {
                    console.error('errorThrown', errorThrown);
                }
            );
        } else {
            clearNews();
        }
    };

    var clearNews = function () {
        $('#news_grid').empty();
    };

    var updateNews = function (data) {
        clearNews();
        data.forEach(function (item, idx) {
            var news =
                '<div class="col-md-12 custom_border news_block">' +
                '<div class="image_container">' +
                '<div class="custom_border">' +
                '<img src="'+ item.image +'" class="news_image"/>' +
                '</div>' +
                '</div>' +
                '<div class="pull-right">' +
                '<span class="glyphicon glyphicon-remove news_delete"></span>' +
                '<span class="glyphicon glyphicon-pencil news_edit"></span>' +
                '</div>' +
                '<h3>' + item.title + '</h3>' +
                '<div class="description">' + item.description + '</div>' +
                '<div class="pull-right">' +
                '<div class="col-md-6">' + item.author + '</div>' +
                '<div class="col-md-6">' + item.created_date + '</div>' +
                '</div>' +
                '</div>';
            $('#news_grid').append(news);
        });
    };

    loadNews("resources/news_nature.json");

    //TODO: Ajax calls should not be sync.

    //To highlight menu navigation buttons on click
    $(".btn").each(function () {
        $(this).click(function (){
            $(".btn").removeClass("active");
            $(this).addClass("active");
            var category = $(this).attr("id");
            var categoryUrl = "";
            switch(category) {
                case "Nature":
                    categoryUrl = "resources/news_nature.json";
                    break;
                case "Science":
                    categoryUrl = "resources/news_science.json";
                    break;
                default:
                    categoryUrl = "";
            }
            loadNews(categoryUrl);
        })
    });

   /* '<div class="description display_none" style="display: none">' +
    '</div>' +
    '<div class="col-md-3">' +
    '<a data-expand_text="${newsExpand}" data-close_text="${newsClose}"' +
    'data-id="${current.newsId}" class="expand_news details" href="#">' +
    '<span id="toggle_text_${current.newsId}" data-id="${current.newsId}"></span>' +
    '<span id="operation_${current.newsId}" data-id="${current.newsId}"' +
    'class="glyphicon glyphicon-hand-down"></span>' +
    '</a>' +
    '</div>' +*/
});