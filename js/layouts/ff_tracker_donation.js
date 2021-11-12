let res;

$(document).ready(function() {
    	$.ajax({
        	url: "http://stream.fastestfurs.com:3000/donate/total",
        	type: "GET",
        	dataType: 'json',
        	success: function(data, status){
        		res = data;
        		console.log("got data " + res.total);
       			$("#donation-total-ff").text("$" + res.total);
       			document.getElementById("donation-total")
        	},
        	error: function(data, status, error){
        		
        		console.log("FUUUUUUUCK " + status);
        		console.log("SHIIIIIIT  " + error);
        	} 
    	});
});


