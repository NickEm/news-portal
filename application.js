$(document).ready(function () {

    var news;
    var categories = [];

    $('#editNewsModal').on('show.bs.modal', function(e) {
        /*var bookId = $(e.relatedTarget).data('book-id');*/
        var categoriesBlock ='';
        categories.forEach(function (item) {
            categoriesBlock += '<option>' + item.name+ '</option>';
        });
        $(e.currentTarget).find('#categories').append(categoriesBlock);
        $(e.currentTarget).find('#edit_title').val(news.title);
        $(e.currentTarget).find('#edit_description').val(news.description);
        $(e.currentTarget).find('#edit_author').val(news.author.name);
        $(e.currentTarget).find('#edit_video_url').val(news.video);
    });

    var selectedNewsItem = function(news_id, title, description, author, createdDate, main_image, video, images) {
        this.title = title;
        this.newsId = news_id;
        this.description = description;
        this.author = author;
        this.createdDate = createdDate;
        this.mainImage = main_image;
        this.video = video;
        this.images = images;
        this.pureHtml = function() {
            news = this;
            var basicBlock =
                '<div class="image_container">' +
                    '<div class="custom_border"><img src="'+ this.mainImage +'" class="img-responsive" width="320" height="180"/></div>' +
                '</div>' +
                '<div class="pull-right">' +
                    '<div><a href="#" data-toggle="tooltip" data-placement="left" title="Remove news"><span class="glyphicon glyphicon-remove news_delete"></span></a></div>' +
                    '<div><a href="#" data-toggle="modal" data-news-id="' + this.newsId + '" data-target="#editNewsModal">'+
                        '<span class="glyphicon glyphicon-pencil news_edit" data-toggle="tooltip" data-placement="left" title="Edit news"></span></a>' +
                    '</div>'+
                '</div>';
            var titleBlock = '<h3>' + this.title + '</h3>';
            var imagesBlock = '';
            var videoBlock = '';
            if(images instanceof Array && images.length > 0){
                    imagesBlock = returnCarouselContent(images);
                }
                if(video) {
                    videoBlock =
                        '<div class="mt20">' +
                            '<video width="100%" controls>' +
                            '<source src="' + this.video + '" type="video/mp4">' +
                            '</video>' +
                        '</div>';
                }
            var descriptionBlock = '<div class="description">' + this.description + '</div>';

            var closureBlock =
                '<div class="row mt20">' +
                    '<div class="col-md-3 col-md-offset-6">'+
                        '<div class="well well-sm centered" data-toggle="popover" data-placement="top" title="Author" data-content="' + this.author.description + '">' + this.author.name + '</div>'+
                    '</div>' +
                    '<div class="col-md-3 well well-sm centered">' + this.createdDate + '</div>'+
                '</div>';

            var newsContent = basicBlock + titleBlock + descriptionBlock + imagesBlock + videoBlock + closureBlock;
            var commentsContent = returnCommentContent();
            var tabBlock = returnNewsTabs();
            var tabContent = returnTabsContent(newsContent, commentsContent);

            return '<div class="col-md-12 custom_border news_block">' + tabBlock + tabContent + '</div>';
        }
    };

    var newsItem = function(news_id, title, description, author, createdDate, main_image) {
        this.title = title;
        this.newsId = news_id;
        this.description = description;
        this.author = author;
        this.createdDate = createdDate;
        this.mainImage = main_image;
        this.pureHtml = function() {
            var basicBlock =
                '<div class="image_container">' +
                    '<div class="custom_border"><img src="'+ this.mainImage +'" class="news_image"/></div>' +
                '</div>';
            var titleBlock = '<h3>' + '<a id="' + this.newsId + '" href="#" >' + this.title + '</a>' + '</h3>';
            var descriptionBlock = '<div class="description">' + this.description + '</div>';

            var closureBlock = ''+
                '<div class="row mt20">' +
                    '<div class="col-md-3 col-md-offset-6">'+
                        '<div class="well well-sm centered" data-toggle="popover" data-placement="top" title="Author" data-content="' + this.author.description + '">' + this.author.name + '</div>'+
                    '</div>' +
                    '<div class="col-md-3 well well-sm centered">' + this.createdDate + '</div>'+
                '</div>';

            var newsContent = basicBlock + titleBlock + descriptionBlock + closureBlock;
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
            addEmptyNewsNotification();
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
        initializeToggleFeatures();
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };

    var appendNews = function (item, isSelectedNews) {
        var news;
        if(isSelectedNews) {
            news = new selectedNewsItem(item.news_id, item.title, item.description, item.author, item.created_date, item.main_image, item.video, item.images);
        } else {
            news = new newsItem(item.news_id, item.title, item.description, item.author, item.created_date, item.main_image);
        }
        $('#news_grid').append(news.pureHtml());
        if(isSelectedNews){
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
            categories.push(item);
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

    var returnCommentContent = function () {
        return ''+
            '<div class="alert alert-warning centered mt20" role="alert">' +
                    '<span class="glyphicon glyphicon-info-sign"></span>Here you can see some comments to the news, but for now this functionality is not supported. Sorry for the inconveniences.' +
            '</div>';
    };

    var returnTabsContent = function (contentBlock, commentsBlock) {
       return '<div class="tab-content">'+
        '<div role="tabpanel" class="tab-pane active" id="content">' + contentBlock + '</div>'+
        '<div role="tabpanel" class="tab-pane" id="comments">' + commentsBlock + '</div>'+
        '</div>'
    };

    var addEmptyNewsNotification = function() {
        var notification = '<div class="alert alert-warning centered" role="alert">' +
            '<span class="glyphicon glyphicon-info-sign"></span>' +
            'This category currently doesn\'t contain news for now. Be patient and attend us from time to time. In the nearest future we will post here interesting topics.</div>';
        $('#news_grid').append(notification);
    };

    var initializeToggleFeatures = function() {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    }

});