$(document).ready(function() {
    var ref = new Firebase("https://publicdata-bitcoin.firebaseio.com/");
    ref.child("bid").on("value", setPrices);
    ref.child("ask").on("value", setPrices);

    document.bid = 0;
    document.ask = 0;
    document.averagePrice = 0;
    document.lastUpdatedField = '';

    function setPrices(snapshot) {
        if (snapshot.name() === 'bid') {
            document.bid = Number(snapshot.val());
        }
        if (snapshot.name() === 'ask') {
            document.ask = Number(snapshot.val());
        }
        if (document.ask !== 0 && document.bid !== 0) {
            var sum = document.bid + document.ask;
            var average = sum/2;
            document.averagePrice = Number(average);
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
            $('input[name='+name+']').val(value.toFixed(7));
        } else if   (name === 'millibitcoin') {
            $('input[name='+name+']').val(value.toFixed(5));
        } else if   (name === 'usdollar') {
            $('input[name='+name+']').val(value.toFixed(2));
        }
    }

    function calculateFromBitcoin() {
        bitcoin = $('input[name=bitcoin]').val();
        usdrate = document.averagePrice;

        updateField('millibitcoin', bitcoin*1000);
        updateField('microbitcoin', bitcoin*1000000);
        updateField('usdollar', bitcoin*usdrate);

        document.lastUpdatedField = 'bitcoin';
        return true;
    }
    function calculateFromMilliBitcoin() {
        millibitcoin = $('input[name=millibitcoin]').val();
        bitcoin = millibitcoin/1000;
        usdrate = document.averagePrice;
        
        updateField('bitcoin', bitcoin);
        updateField('microbitcoin', bitcoin*1000000);
        updateField('usdollar', bitcoin*usdrate);
        
        document.lastUpdatedField = 'millibitcoin';
        return true;
    }
    function calculateFromMicroBitcoin() {
        microbitcoin = $('input[name=microbitcoin]').val();
        bitcoin = microbitcoin/1000000;
        usdrate = document.averagePrice;
        
        updateField('bitcoin', bitcoin);
        updateField('millibitcoin', bitcoin/1000);
        updateField('usdollar', bitcoin*usdrate);

        document.lastUpdatedField = 'microbitcoin';
        return true;
    }
    function calculateFromUSDollar() {
        usd = $('input[name=usdollar]').val();
        usdrate = document.averagePrice;
        bitcoin = usd/usdrate;

        updateField('microbitcoin', bitcoin*1000000);
        updateField('millibitcoin', bitcoin/1000);
        updateField('bitcoin', bitcoin);

        document.lastUpdatedField = 'usdollar';
        return true;
    }
});