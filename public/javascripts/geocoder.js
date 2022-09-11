

async function geocode(templatevalue) {
	console.log(templatevalue);
	return 
}


const submitForm = async (event) => {
	//console.log("Hi!");
	const form = document.getElementById('stuff');
	event.preventDefault();
	let inputted_form = new FormData(form);
	let address = inputted_form.get('Street')+ ', ' + inputted_form.get('City') + ", " + inputted_form.get('State') + ", " + inputted_form.get('Zip');
	//console.log(address);
	let templatevalue= "https://api.mapbox.com/geocoding/v5/mapbox.places/<address entered>.json?access_token=<your mapbox token>";
	const access_token="pk.eyJ1IjoicHdpZXJ6YmkiLCJhIjoiY2wxdXd6MG82MXU4dzNjbG1hcXBkeTB6eSJ9.kumke1ShdepZ2qtxtyAH6g";
	let normalized = encodeURIComponent(address);
	templatevalue = templatevalue.replace("<address entered>", normalized); 
	templatevalue = templatevalue.replace("<your mapbox token>", access_token);
	
	let response = await axios.get(templatevalue);
	
	
	let data = response.data;
	try {
		let coords = data["features"][0]["center"];
		let place_name = data["features"][0]["place_name"];
		let lat = coords[0];
		let long = coords[1];
		document.getElementById('Address').value=place_name;
		document.getElementById('Lat').value=lat;
		document.getElementById('Long').value=long;	
	}
	
	catch {
		document.getElementById('Address').value="Invalid Address";
		document.getElementById('Lat').value="Invalid Lat";
		document.getElementById('Long').value="Invalid Long";	
	}
	
	
	
	//console.log(data);
	


	//console.log(document.getElementById('Address'));
	
	
	form.submit();

}



const startup = async () => {
	console.log("Hello");
	const form = document.getElementById('stuff');
	form.addEventListener('submit', submitForm);
	/*form.addEventListener("", function() {
    console.log("form is submitted"); 
}); */

}




