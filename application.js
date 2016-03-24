$(document).ready(function () {

    var newsItem = function(news_id, title, description, author, createdDate, main_image, video, images, selected) {
        this.title = title;
        this.newsId = news_id;
        this.description = description;
        this.author = author;
        this.createdDate = createdDate;
        this.mainImage = main_image;
        this.video = video;
        this.images = images;
        this.pureHtml = function() {
            var basicBlock = '<div class="image_container">' +
                '<div class="custom_border">' +
                '<img src="'+ this.mainImage +'" class="news_image"/>' +
                '</div>' +
                '</div>' +
                '<div class="pull-right">' +
                '<div>' +
                '<a href="#" data-toggle="tooltip" data-placement="left" title="Remove news"><span class="glyphicon glyphicon-remove news_delete"></span></a>' +
                '</div>' +
                '<div>' +
                '<a href="#" data-toggle="modal" data-target="#editModal_' + this.newsId +'">'+
                '<span class="glyphicon glyphicon-pencil news_edit" data-toggle="tooltip" data-placement="left" title="Edit news"></span></a>' +
                '</div>' +
                '</div>';
            var titleBlock = '';
            var videoBlock = '';
            //Actually carousel
            var imagesBlock = '';
            if(selected) {
                titleBlock = '<h3>' + this.title + '</h3>';
                if(images instanceof Array && images.length > 0){
                    imagesBlock = returnCarouselContent(images);
                }
                if(video) {
                    videoBlock = '<div><div class="mt20">' +
                        '<video width="100%" controls>' +
                        '<source src="' + this.video + '" type="video/mp4">' +
                        '</video></div></div>';
                }
            } else {
                titleBlock = '<h3>' + '<a id="' + this.newsId + '" href="#" >' + this.title + '</a>' + '</h3>';
            }
            var descriptionBlock = '<div class="description">' + this.description + '</div>';
            var closureBlock = '<div class="row mt20">' +
                '<div class="col-md-3 col-md-offset-6">' + this.author + '</div>' +
                '<div class="col-md-3">' + this.createdDate + '</div>' +
                '</div>';

            var newsContent = basicBlock + titleBlock + descriptionBlock + imagesBlock + videoBlock + closureBlock;
            if(selected){
                var tabBlock = returnNewsTabs();
                var tabContent = returnTabsContent(newsContent, '<div>Comments</div>');
                newsContent = tabBlock + tabContent;
            }

            return '<div class="col-md-12 custom_border news_block">' + newsContent + '</div>';
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
                appendNews(item, false);
            });
        } else {
            appendNews(data, true);
        }
        addExpandNewsListeners();
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };

    var appendNews = function (item, selected) {
        var news = new newsItem(item.news_id, item.title, item.description, item.author, item.created_date, item.main_image, item.video, item.images, selected);
        $('#news_grid').append(news.pureHtml());
        if(selected){
            $('.carousel').carousel();
        }
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
            /*return '<a id="category_' + this.categoryId + '" class="btn btn-default btn-lg btn-menu" href="#">' + this.name + '</a>';*/
            return '<li id="category_' + this.categoryId + '" class="btn-menu"><a href="#">' + this.name + '</a></li>';
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

    var returnCarouselContent = function (images) {
        var navigationItems = '<li data-target="#image-carousel" data-slide-to="0" class="active"></li>';
        var carouselItems = '<div class="item active"><img src="' + images[0].image_url + '"></div>';
        for (var i = 1; i < images.length; i++) {
            navigationItems += '<li data-target="#image-carousel" data-slide-to="' + i + '"></li>';
            carouselItems += '<div class="item"><img src="' + images[i].image_url + '"></div>';
        }

        return '<div id="image-carousel" class="mt20 carousel slide" data-ride="carousel">'+
        '<ol class="carousel-indicators">'+ navigationItems + '</ol>'+

        '<div class="carousel-inner" role="listbox">' + carouselItems + '</div>'+

        '<a class="left carousel-control" href="#image-carousel" role="button" data-slide="prev">'+
        '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
        '<span class="sr-only">Previous</span>'+
        '</a>'+
        '<a class="right carousel-control" href="#image-carousel" role="button" data-slide="next">'+
        '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
        '<span class="sr-only">Next</span>'+
        '</a>'+
        '</div>';
    };

    var returnNewsTabs = function () {
        return '<ul class="nav nav-tabs" role="tablist">' +
            '<li role="presentation" class="active"><a href="#content" aria-controls="content" role="tab" data-toggle="tab">Content</a></li>' +
            '<li role="presentation"><a href="#comments" aria-controls="comments" role="tab" data-toggle="tab">Comments</a></li>' +
            '</ul>';
    };

    var returnTabsContent = function (contentBlock, commentsBlock) {
       return '<div class="tab-content">'+
        '<div role="tabpanel" class="tab-pane active" id="content">' + contentBlock + '</div>'+
        '<div role="tabpanel" class="tab-pane" id="comments">' + commentsBlock + '</div>'+
        '</div>'
    };

});