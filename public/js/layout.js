field_label();

function field_label(){
	$('.field input').blur(function() {
	    if( $(this).val() !== '' ){
	        $(this).siblings('label').addClass('fixed');
	    }else {
	        $(this).siblings('label').removeClass('fixed');
	    }
	});
};