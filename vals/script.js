$(document).ready(function() {
    var ref = new Firebase("https://publicdata-bitcoin.firebaseio.com/");
    
    ref.child("last").on("value", setUSDValue);

    document.lastDirectionWasUp = '';
    document.lastPrice = '';

    function setUSDValue(snapshot) {
        if (document.lastPrice !== '') {
            if (snapshot.val() > document.lastPrice) {
                document.lastDirectionWasUp = true;
            } else {
                document.lastDirectionWasUp = false;
            }
        }
        document.lastPrice = snapshot.val();
        $('#usdvalueinbtc').html(snapshot.val());
        $('#usdvalueinmbtc').html(snapshot.val()/1000);
        $('#usdvalueinubtc').html(snapshot.val()/1000000);
        if (document.lastDirectionWasUp !== '') {
            flashFields();
        }
    }
    function flashFields() {
        $('.animateMyRefresh').each(function() {
            $(this).stop(true, true);
            $(this).animate({opacity: 0.2}, 100, function() {
                if (document.lastDirectionWasUp) {
                    $(this).css('color', 'green');
                } else {
                    $(this).css('color', 'red');
                }
            }).animate({opacity:1}, 300, function() {
                $(this).css('color', 'black');
            });
        });
    }
});