$(document).ready(function () {

    var loadCategories = function () {
        $.ajax({
                url: "resources/categories.json",
                dataType: "json",
                async: false
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
        data.forEach(function (item) {
            /*var category = '<a class="btn btn-default btn-lg" href="' + item.url + '" role="button">' + item.name +'</a>';*/
            var category = '<a id="' + item.name + '" class="btn btn-default btn-lg" href="#" >' + item.name + '</a>';
            $('#category_grid').append(category);
        });
    };

    loadCategories();

    var loadNews = function () {
        $.ajax({
                url: "resources/news.json",
                dataType: "json",
                async: false
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
        $('#news_grid').empty();
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
                '<div class="brief_description">' + item.brief_description + '</div>' +
                '</div>' +
                '<div class="pull-right signature_row">' +
                '<div class="col-md-4">' + item.author + '</div>' +
                '<div class="col-md-4">' + item.created_date + '</div>' +
                '</div>' +
                ' </div>';
            $('#news_grid').append(news);
        });
    };

    loadNews();

    //To highlight menu navigation buttons on click
    $(".btn").each(function () {
        $(this).click(function (){
            $(".btn").removeClass("active");
            $(this).addClass("active");
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