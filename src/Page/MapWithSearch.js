import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";

const MapWithSearch = ({ google }) => {
	const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center of the map (San Francisco)
	const [markerPosition, setMarkerPosition] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const handleMapClick = (_, map, clickEvent) => {
		const { latLng } = clickEvent;
		const lat = latLng.lat();
		const lng = latLng.lng();

		setMarkerPosition({ lat, lng });
	};

	const handleSearch = (query) => {
		setSearchQuery(query);

		if (query.trim() === "") {
			// Clear the marker if the search query is empty
			setMarkerPosition(null);
			return;
		}

		const service = new google.maps.places.PlacesService(
			document.createElement("div")
		);
		const request = {
			query,
			fields: ["name", "geometry"],
		};

		service.textSearch(request, (results, status) => {
			if (
				status === google.maps.places.PlacesServiceStatus.OK &&
				results.length > 0
			) {
				const { location } = results[0].geometry;
				setMarkerPosition({ lat: location.lat(), lng: location.lng() });
				setMapCenter({ lat: location.lat(), lng: location.lng() });
				console.log(results);
			} else {
				// Handle error or no results found
				console.error("Error fetching place details:", status);
			}
		});
	};

	const handlePlaceChanged = (place) => {
    // console.log('select!');
		// const place = autoComplete.getPlace();
    console.log(place);
		if (!place.geometry) {
			// Handle invalid search result
			console.error("No location found for input:", searchQuery);
			return;
		}

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

		setMapCenter({ lat, lng });
		setMarkerPosition({ lat, lng });
	};

	return (
		<div>
			{/* <input
				type="text"
				placeholder="Search for a location..."
				value={searchQuery}
				onChange={(e) => handleSearch(e.target.value)}
			/> */}
			<Autocomplete
				google={google}
        apiKey={'AIzaSyDwkHTkAQR7wpmEeHRCRfHErZB23tz0oOQ'}
				onPlaceSelected={handlePlaceChanged}
				options={{
					types: ["(cities)"],
				}}
				types={["geocode"]}
				componentRestrictions={{ country: "us" }} // Limit the results to a specific country (optional)
				placeholder="Search for a location..."
				value={searchQuery}
				onChange={(e) => {
          console.log(e.target.value);
          setSearchQuery(e.target.value)
        }}
			/>
			<Map
				google={google}
				zoom={14}
				initialCenter={mapCenter}
				center={markerPosition ? markerPosition : mapCenter}
				onClick={handleMapClick}
			>
				{markerPosition && <Marker position={markerPosition} />}
			</Map>
		</div>
	);
};

export default GoogleApiWrapper({
	apiKey: "AIzaSyDwkHTkAQR7wpmEeHRCRfHErZB23tz0oOQ", // Replace with your own API key
})(MapWithSearch);
