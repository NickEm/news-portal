$(document).ready(function ($) {

    var loadCategories = function () {
        $.ajax({
                url: "resources/categories.json",
                dataType: "json"
            }
        ).then(
            function (data, textStatus, jqXHR) {
                console.log('News received', data);
                updateCategories(data);
            },
            function (jqXHR, textStatus, errorThrown) {
                console.error('Error', textStatus);
                console.error('jqXHR', jqXHR);
                console.error('errorThrown', errorThrown);
            }
        );
    };

    var updateCategories = function (data) {
        $('.category_grid').empty();
        data.forEach(function (item, idx) {
            var navItem =
                '<div class="col-md-12 custom_border news_block">' +
                '<div class="image_container">' +
                '<div class="custom_border">' +
                '<img src="'+ item.image +'" class="news_image"/>' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<div class="pull-right">' +
                '<span class="glyphicon glyphicon-remove news_delete"></span>' +
                '<span class="glyphicon glyphicon-pencil news_edit"></span>' +
                '</div>' +
                '<div class="news_title">' + item.title + '</div>' +
                '<div class="brief_description">' + item.brief_description + '</div>' +
                '</div>' +
                '<div class="pull-right signature_row">' +
                '<div class="col-md-4">' + item.author + '</div>' +
                '<div class="col-md-4">' + item.created_date + '</div>' +
                '</div>' +
                ' </div>';
            $('.category_grid').append(navItem);
        });
    };

    loadCategories();

    var loadNews = function () {
        console.log('News are loadings');
        $.ajax({
                url: "resources/news.json",
                dataType: "json"
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

    var updateNews = function (data) {
        $('.news_grid').empty();
        data.forEach(function (item, idx) {
            var navItem =
                '<div class="col-md-12 custom_border news_block">' +
                '<div class="image_container">' +
                '<div class="custom_border">' +
                '<img src="'+ item.image +'" class="news_image"/>' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<div class="pull-right">' +
                '<span class="glyphicon glyphicon-remove news_delete"></span>' +
                '<span class="glyphicon glyphicon-pencil news_edit"></span>' +
                '</div>' +
                '<div class="news_title">' + item.title + '</div>' +
                '<div class="brief_description">' + item.brief_description + '</div>' +
                '</div>' +
                '<div class="pull-right signature_row">' +
                '<div class="col-md-4">' + item.author + '</div>' +
                '<div class="col-md-4">' + item.created_date + '</div>' +
                '</div>' +
                ' </div>';
            $('.news_grid').append(navItem);
        });
    };


    loadNews();

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