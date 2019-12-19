$('#loader').hide();

const url = "https://api.exchangeratesapi.io/";

$.getJSON(

	url + 'latest?',
	function(data) {

		if ( typeof fx !== "undefined" && fx.rates ) {

			fx.rates = data.rates;
			fx.base = data.base;

		} else {

			var fxSetup = {
				rates : data.rates,
				base : data.base
			}
		}

		$.each(data.rates, function(key, value){

			var option = new Option(key, key);
			$(option).html(key);
			$("select").append(option);

		});

		$("select#from").val("USD");
		$("select#to").val("PHP");

		$("#from-value").on({
			keyup: function() {

				fx.settings = { 
					from: $('#from option:selected').val(),
					to: $('#to option:selected').val()
				};

				$("#to-value").val(fx.convert($(this).val())); 

			},
			blur: function() { 

			}
		});

		$("#to-value").on({
			keyup: function() {

				fx.settings = { 
					from: $('#to option:selected').val(),
					to: $('#from option:selected').val()
				};

				$("#from-value").val(fx.convert($(this).val())); 

			},
			blur: function() { 

			}
		});

		$("#from").on({
			change: function() {
				fx.settings = { 
					from: $('#from option:selected').val(),
					to: $('#to option:selected').val()
				};

				$("#to-value").val(fx.convert($('#from-value').val())); 
			},
			
		});

		$("#to").on({
			change: function() {
				fx.settings = { 
					from: $('#to option:selected').val(),
					to: $('#from option:selected').val()
				};

				$("#from-value").val(fx.convert($('#to-value').val())); 
			}
		});

	}
);

