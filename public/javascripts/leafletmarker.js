
let mymap=0; //a global variable. While nasty, without using directly embedded javascript, communicating between the two processes is quite difficult.
//While a solution would be geocoding on the server, the process seems a bit complex for simply adding markers without 
//any security.


const init_map = async () => { //Async to wait for the rest of the html to render.
	console.log("app initializing....");

	let mymap = L.map('map').setView([51.505, -0.09], 15); //The default map created using map box and leaflet. All properties are 'default' 
	//excluding the accessToken.
	//additionally, this variable is global, so it will be seen by process_input as well to be worked on.

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: "pk.eyJ1IjoicHdpZXJ6YmkiLCJhIjoiY2wxdXd6MG82MXU4dzNjbG1hcXBkeTB6eSJ9.kumke1ShdepZ2qtxtyAH6g"// Personal public mapbox token.
		}).addTo(mymap);	
	
	
	
	
	const contacts = document.querySelectorAll(".contact");
		await contacts.forEach((contact) => {
			//await add_marker(contact.dataset.lat, contact.dataset.long);
			//console.log(contact.dataset.lat,contact.dataset.long);
			let phone =contact.dataset.contactphone==="Yes" ? contact.dataset.phone:"No";
			let email =  contact.dataset.contactemail==="Yes" ? contact.dataset.email:"No";
			
			toolinfo= `
				Contact Name: ${contact.dataset.name} <br>
				Contact Address: ${contact.dataset.address}<br>
				Call by Phone?: ${phone}<br>
				Email? : ${email}<br>
				
			`
			
			if (contact.dataset.contactmail=="Yes") {
				contact.addEventListener("click", onClickedAddress)
					function onClickedAddress () {
						mymap.flyTo([ contact.dataset.long, contact.dataset.lat ], 8); 
					}
				L.marker([ contact.dataset.long, contact.dataset.lat ]).bindTooltip(toolinfo).addTo(mymap);
			}
		});

};
    //await axios.post('start', {}); //Calls server function
    //console.log("app initialized");


const add_marker = async (lat, long) => {
	//console.log(lat,long);
	L.marker([ long, lat ]).addTo(mymap); //Adds the coordinates to the global map initalized above from init_app.
}






