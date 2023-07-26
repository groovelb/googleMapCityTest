import React from "react";
import MapWithSearch from "./Page/MapWithSearch";
import { GoogleApiWrapper } from 'google-maps-react';


function App({props}) {


	return (
		<div style={{ height: "100vh", width: "100%" }}>
      <MapWithSearch />
		</div>
	);
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDwkHTkAQR7wpmEeHRCRfHErZB23tz0oOQ', // Replace with your actual API key
})(App);