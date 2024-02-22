import React from "react";
// import { getGoogleMapsEmbedUrl } from "../../../backend/services/mapService"
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "../App.css";
const GoogleMapEmbed = ({ googleEmbedMapUrl }) => {
  //   const embedUrl = getGoogleMapsEmbedUrl(restaurantLat, restaurantLng, key);

  return (
    <Card
      sx={{
        justifyContent: "center",
        alignItems: "center",
        m: 0,
        p: 0,
        borderRadius: "16px",
        border: "2px solid black",
      }}
    >
      <iframe
        src={googleEmbedMapUrl}
        width="130%"
        height="300"
        style={{
          border: "none",
        }}
        allowfullscreen=""
        loading="eager"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      {/* <Card
        sx={{
          justifyContent: "center",
          alignItems: "center",
          m: 1,
          p: 0,
          borderRadius: "16px",
          border: "2px solid black",
        }}
      >
        <CardMedia
          component="iframe"
          src={googleEmbedMapUrl}
          alt="Map"
          width="100dvb"
          height="350px"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
          allowFullScreen
          sx={{ border: "none" }}
          className="google-map-embed"
        />
      </Card> */}
    </Card>
  );
};

export default GoogleMapEmbed;
