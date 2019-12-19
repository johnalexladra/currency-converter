$('#loader').hide();

const url = "https://api.exchangeratesapi.io/";

$.getJSON(
	url + 'latest?',
	function(data) {

		$.each(data.rates, function(key, value){
			var option = new Option(key, key);
			$(option).html(key);
			$("select").append(option);
			console.log(key);
		});

	}
);

$("#app").on("keyup", function(e) {

	var form = $(this);
	var base = form[0][0].value;
	var symbols = form[0][2].value;
	var amount = form[0][1].value;
	var total = form[0][3].value;

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: symbols,
		minimumFractionDigits: 2
	});

	$.ajax({ 
		url: url + "latest?",
		data: form.serialize(),
		dataType: "json", 
		beforeSend: function() {
			$('#loader').show();
		},
		complete: function(){
			$('#loader').hide();
		},
		success: function(data) { 
			total = data['rates'][symbols] * amount.replace(/\D/gm,'');

			total = formatter.format(total);

			$("#currency").val(total);
			console.log(total);

		}
	}); 

});

$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});

function formatNumber(n) {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input, blur, currency = "$") {
  var input_val = input.val();

  if (input_val === "") { return; }
  
  var original_len = input_val.length;
  var caret_pos = input.prop("selectionStart");

  if (input_val.indexOf(".") >= 0) {
    var decimal_pos = input_val.indexOf(".");
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    left_side = formatNumber(left_side);
    right_side = formatNumber(right_side);
    
  if (blur === "blur") {
      right_side += "00";
    }

    right_side = right_side.substring(0, 2);
    input_val = currency + left_side + "." + right_side;

  } else {

    input_val = formatNumber(input_val);
    input_val = currency + input_val;

    if (blur === "blur") {
      input_val += ".00";
    }
  }

  input.val(input_val);

  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
