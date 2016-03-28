$(function() {
    'use strict';
    // SHOP ELEMENT
    var shop = document.querySelector('#shop');
    var data = comicSetData;

    // INITIALIZE
    (function init() {
        for (var i = 0; i < data.length; i++) {
            addRatingWidget(buildShopItem(data[i]), data[i]);
        }
    })();

    // Create Html
    function createHtml(data, statRating){
        if(data.length === 0) return '';
        else
            var title = data[0].comicSetTitle;

        function plural(numberofR){
            if(numberofR < 2) return numberofR + ' rating';
            else return numberofR + ' ratings';
        }

        var before = '<div class="c-shop-item__details">' +
            '<div class = "c-rating-title">' + '<h3 class="c-shop-item__title">' + title + '</h3>' +
            '&nbsp'+ '&nbsp'+'&nbsp'+ '&nbsp' +
            '<p id = "rateStat">' + '~ ' + statRating.avgRate.toFixed(2) + ' avg rating' + ' - ' + plural(statRating.numberofR) + ' ~' + '</p>' +
            '&nbsp'+ '&nbsp'+'&nbsp'+ '&nbsp' +
            '</div>' +
            '<p class="c-shop-item__description">' + title + ' dolor sit amet, consectetur adipisicing elit.' +
            'Commodi consectetur similique ullam natus ut debitis praesentium. Commodi consectetur similique ullam natus ut debitis praesentium.' + '</p>';

        var link = '';
        for(var i = 0; i < Math.min(4, data.length); i++){
            link += '<a href="/comic_page/' + title + '">';
            link += '<img src=' + data[i].imageUrl + ' style="width:200px;height:200px;border:0;">' + '</a>';
            link += '&nbsp'+ '&nbsp'+'&nbsp'+ '&nbsp';
        }
        if(data.length < 4){
            for(var i = 4; i > data.length; i--){
                link += '<a href="/edit_comic/' + title + '">';
                link += '<img src=' + '../images'+ '/add.jpg' + ' style="width:200px;height:200px;border:0;">' + '</a>';
                link += '&nbsp'+ '&nbsp'+'&nbsp'+ '&nbsp';
            }
        }
        var after = '<div class="c-rating">' + '<p id = "prate">Rate This Comic: </p>' + '&nbsp'+ '&nbsp' + '</div>' + '</div>';

        return before + link + after;
    }


    // BUILD SHOP ITEM
    function buildShopItem(data) {
        var shopItem = document.createElement('anything');
        var html = createHtml(data.imageList, data);
        shopItem.classList.add('c-shop-item');
        shopItem.innerHTML = html;
        shop.appendChild(shopItem);
        return shopItem;
    }
    // ADD RATING WIDGET
    function addRatingWidget(shopItem, data) {
        var ratingElement = shopItem.querySelector('.c-rating');
        var ratingElementTitle = shopItem.querySelector('.c-rating-title');
        var currentRating = data.avgRate;
        var maxRating = 5;
        var callback = function(rating) {
            $.ajax({
             url: '/updateRating',
             type: 'POST',
             contentType: 'application/json',
             data : JSON.stringify({title: data.title,
                                    UserRating: rating,
                                    numberOfRate: data.numberofR,
                                    totalRate: data.totalRate})
            })
        };

        //function callback(arg) {alert(arg);}
        var r = rating(ratingElement, 0, maxRating, callback);
        var s = rating_title(ratingElementTitle, currentRating, maxRating, null);
        //$('#form').html(r.getRating);
    }
});

