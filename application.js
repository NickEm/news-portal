$(document).ready(function () {

    var newsItem = function(title, description, author, createdDate, image) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.createdDate = createdDate;
        this.image = image;
        this.pureHtml = function() {
            return '<div class="col-md-12 custom_border news_block">' +
                '<div class="image_container">' +
                '<div class="custom_border">' +
                '<img src="'+ this.image +'" class="news_image"/>' +
                '</div>' +
                '</div>' +
                '<div class="pull-right">' +
                '<span class="glyphicon glyphicon-remove news_delete"></span>' +
                '<span class="glyphicon glyphicon-pencil news_edit"></span>' +
                '</div>' +
                '<h3>' + this.title + '</h3>' +
                '<div class="description">' + this.description + '</div>' +
                '<div class="pull-right">' +
                '<div class="col-md-6">' + this.author + '</div>' +
                '<div class="col-md-6">' + this.createdDate + '</div>' +
                '</div>' +
                '</div>';
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
        data.forEach(function (item, idx) {
            var news = new newsItem(item.title, item.description, item.author, item.created_date, item.image);
            $('#news_grid').append(news.pureHtml());
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
                case "Nature":
                    categoryUrl = "resources/news_nature.json";
                    break;
                case "Science":
                    categoryUrl = "resources/news_science.json";
                    break;
                //TODO: In the same case can be implemented other category
            }
            loadNews(categoryUrl);
        });
    };

    var categoryItem = function(name) {
        this.name = name;
        this.pureHtml = function() {
            return '<a id="' + this.name + '" class="btn btn-default btn-lg btn-menu" href="#' + this.name + '" >' + this.name + '</a>';
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
            var category = new categoryItem(item.name);
            $('#category_grid').append(category.pureHtml());
        });

        //Highlight first menu tab
        var initialCategory = '#Nature';
        $(initialCategory).addClass("active");
        //Change navigation url to the first menu tab
        /*history.pushState(null, '', initialCategory);*/
        history.pushState(null, '', initialCategory);
        addRoutingListeners();
    };

    loadCategories();

    loadNews("resources/news_nature.json");

    //TODO: Difference for listeners.
    //TODO: Add routing to particular news.
    //TODO: Add media.
    //TODO: Add image expanding.
    //TODO: Implement on node server.

});