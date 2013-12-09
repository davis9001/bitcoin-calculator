$(document).ready(function() {
    var ref = new Firebase("https://publicdata-bitcoin.firebaseio.com/");
    
    ref.child("last").on("value", setUSDRate);

    document.bid = 0;
    document.ask = 0;
    document.averagePrice = 0;
    document.lastUpdatedField = '';
    document.lastDirectionWasUp = '';
    document.lastPrice = '';

    function setUSDRate(snapshot) {
        if (document.lastPrice !== '') {
            if (snapshot.val() > document.lastPrice) {
                document.lastDirectionWasUp = true;
            } else {
                document.lastDirectionWasUp = false;
            }
        }
        document.lastPrice = snapshot.val();
        last = document.lastUpdatedField;
        if (last === '' || last === 'bitcoin') {
            calculateFromBitcoin();
        } else if (last === 'megabitcoin') {
            calculateFromMegaBitcoin();
        } else if (last === 'millibitcoin') {
            calculateFromMilliBitcoin();
        } else if (last === 'usdollar') {
            calculateFromUSDollar();
        }
        if (document.lastDirectionWasUp !== '') {
            flashFields();
        }
    }

    if (allBlank()) {
        $('input[name=bitcoin]').val('1');
        calculateFromBitcoin();
    }

    $('input').keydown(function(event) {
        // if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
        //     event.preventDefault();
        // }
    });

    $('input[name=bitcoin]').keyup(function() {
        calculateFromBitcoin();
    });
    $('input[name=millibitcoin]').keyup(function() {
        calculateFromMilliBitcoin();
    });
    $('input[name=microbitcoin]').keyup(function() {
        calculateFromMicroBitcoin();
    });
    $('input[name=usdollar]').keyup(function() {
        calculateFromUSDollar();
    });





    function allBlank() {
        if ($('input[name=bitcoin]').val() === '') {
            if ($('input[name=millibitcoin]').val() === '') {
                if ($('input[name=microbitcoin]').val() === '') {
                    if ($('input[name=usdollar]').val() === '') {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function updateField(name, value) {
        if          (name === 'bitcoin') {
            $('input[name='+name+']').val(value.toFixed(8));
        } else if   (name === 'microbitcoin') {
            $('input[name='+name+']').val(value.toFixed(8));
        } else if   (name === 'millibitcoin') {
            $('input[name='+name+']').val(value.toFixed(8));
        } else if   (name === 'usdollar') {
            $('input[name='+name+']').val(value.toFixed(2));
        }
    }

    function calculateFromBitcoin() {
        bitcoin = $('input[name=bitcoin]').val();
        usdrate = document.lastPrice;

        updateField('millibitcoin', bitcoin*1000);
        updateField('microbitcoin', bitcoin*1000000);
        updateField('usdollar', bitcoin*usdrate);

        document.lastUpdatedField = 'bitcoin';
        return true;
    }
    function calculateFromMilliBitcoin() {
        millibitcoin = $('input[name=millibitcoin]').val();
        bitcoin = millibitcoin/1000;
        usdrate = document.lastPrice;
        
        updateField('bitcoin', bitcoin);
        updateField('microbitcoin', bitcoin*1000000);
        updateField('usdollar', bitcoin*usdrate);
        
        document.lastUpdatedField = 'millibitcoin';
        return true;
    }
    function calculateFromMicroBitcoin() {
        microbitcoin = $('input[name=microbitcoin]').val();
        bitcoin = microbitcoin/1000000;
        usdrate = document.lastPrice;
        
        updateField('bitcoin', bitcoin);
        updateField('millibitcoin', bitcoin/1000);
        updateField('usdollar', bitcoin*usdrate);

        document.lastUpdatedField = 'microbitcoin';
        return true;
    }
    function calculateFromUSDollar() {
        usd = $('input[name=usdollar]').val();
        usdrate = document.lastPrice;
        bitcoin = usd/usdrate;

        updateField('microbitcoin', bitcoin*1000000);
        updateField('millibitcoin', bitcoin/1000);
        updateField('bitcoin', bitcoin);

        document.lastUpdatedField = 'usdollar';
        return true;
    }

    function flashFields() {
        $('.refreshable').each(function() {
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
    $(document).on('close.fndtn.alert-box', function(event) {
      alert('An alert box has been closed!');
    });
});

