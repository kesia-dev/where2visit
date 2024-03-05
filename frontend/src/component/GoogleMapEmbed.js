import React from "react";
import Card from "@mui/material/Card";

const GoogleMapEmbed = ({ googleEmbedMapUrl }) => {

  return (
    <Card
      sx={{
        justifyContent: "center",
        alignItems: "center",
        m: 1,
        p: 0,
        borderRadius: "16px",
        border: "2px solid black",
        boxSizing: "border-box",
      }}
    >
      <iframe
        src={googleEmbedMapUrl}
        title="Google Map Embed"
        width="100%"
        height="300"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Card>
  );
};

export default GoogleMapEmbed;
