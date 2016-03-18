$(document).ready(function () {

    var newsItem = function(news_id, title, description, author, createdDate, image, video) {
        this.title = title;
        this.newsId = news_id;
        this.description = description;
        this.author = author;
        this.createdDate = createdDate;
        this.image = image;
        this.video = video;
        this.pureHtml = function() {
            var basicBlock = '<div class="col-md-12 custom_border news_block">' +
                '<div class="image_container">' +
                '<div class="custom_border">' +
                '<img src="'+ this.image +'" class="news_image"/>' +
                '</div>' +
                '</div>' +
                '<div class="pull-right">' +
                '<span class="glyphicon glyphicon-remove news_delete"></span>' +
                '<span class="glyphicon glyphicon-pencil news_edit"></span>' +
                '</div>';
            var titleBlock = '';
            var videoBlock = '';
            if(video) {
                titleBlock = '<h3>' + this.title + '</h3>';
                videoBlock = '<video width="100%" controls>' +
                    '<source src="' + this.video + '" type="video/mp4">' +
                    '</video>';
            } else {
                titleBlock = '<h3>' + '<a id="' + this.newsId + '" href="#" >' + this.title + '</a>' + '</h3>';
            }
            var descriptionBlock = '<div class="description">' + this.description + '</div>';
            var closureBlock = '<div class="pull-right">' +
                '<div class="col-md-6">' + this.author + '</div>' +
                '<div class="col-md-6">' + this.createdDate + '</div>' +
                '</div>' +
                '</div>';

            return basicBlock + titleBlock + descriptionBlock + videoBlock + closureBlock;
        };
    };

    var clearNews = function () {
        $('#news_grid').empty();
    };

    var loadNews = function (url) {
        if (url) {
            $.ajax({
                url: url,
                dataType: "json"
            }).done(function (data, textStatus, jqXHR) {
                updateNews(data);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('errorThrown', errorThrown);
            });
        } else {
            clearNews();
        }
    };

    var updateNews = function (data) {
        clearNews();
        if(data instanceof Array) {
            data.forEach(function (item, idx) {
                appendNews(item);
            });
        } else {
            appendNews(data);
        }
        addExpandNewsListeners();
    };

    var appendNews = function (item) {
        var news = new newsItem(item.news_id, item.title, item.description, item.author, item.created_date, item.image, item.video);
        $('#news_grid').append(news.pureHtml());
    };

    var addExpandNewsListeners = function () {
        $('.news_block').on('click', 'a', function () {
            var newsId = $(this).attr("id");
            //TODO: In the same case can be implemented expanding of each news. Just particular json should exist.
            var newsUrl = "resources/news_" + newsId + ".json";
            loadNews(newsUrl);
        });
    };

    //To highlight menu navigation buttons on click
    var addRoutingListeners = function () {
        $('#category_grid').on('click', '.btn-menu', function () {
            $(".btn-menu").removeClass("active");
            $(this).addClass("active");
            var category = $(this).attr("id");
            var categoryUrl = "";
            switch (category) {
                case "category_1":
                    categoryUrl = "resources/news_nature.json";
                    break;
                case "category_2":
                    categoryUrl = "resources/news_science.json";
                    break;
                //TODO: In the same case can be implemented other category. Just particular json should exist.
            }
            loadNews(categoryUrl);
        });
    };

    var categoryItem = function(categoryId, name) {
        this.categoryId = categoryId;
        this.name = name;
        this.pureHtml = function() {
            return '<a id="category_' + this.categoryId + '" class="btn btn-default btn-lg btn-menu" href="#" >' + this.name + '</a>';
        };
    };

    var loadCategories = function () {
        $.ajax({
            url: "resources/categories.json",
            dataType: "json"
        }).done(function (data, textStatus, jqXHR) {
            updateCategories(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('errorThrown', errorThrown);
        });
    };

    var updateCategories = function (data) {
        data.forEach(function (item) {
            var category = new categoryItem(item.category_id, item.name);
            $('#category_grid').append(category.pureHtml());
        });

        //Highlight first menu tab
        $('#category_1').addClass("active");
        addRoutingListeners();
    };

    loadCategories();

    loadNews("resources/news_nature.json");

});