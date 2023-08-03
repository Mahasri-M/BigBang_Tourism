import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import familyImage from "../../assets/asset/img/family.jpg";
import friendsImage from "../../assets/asset/img/friends.jpg";
import solo from "../../assets/asset/img/solo.jpg";
import adventure from "../../assets/asset/img/adventure.jpg";
import wildlife from "../../assets/asset/img/wildlife.jpg";
import water from "../../assets/asset/img/water.jpg";

const ExploreDestinations = () => {
  const destinations = [
    {
        title: "Wildlife",
        imageUrl: wildlife,
      },
    {
        title: "Family",
        imageUrl: familyImage,
      },{
        title: "Friends",
        imageUrl: friendsImage,
      },{
        title: "Solo",
        imageUrl: solo,
      },{
        title: "Adventure",
        imageUrl: adventure,
      },
      {
        title: "Fun",
        imageUrl: water,
      },
  ];

  return (
    <div className="container pl0 pr0 mb48 pt48" id="package_detail_show">
      <div className="container">
        <div className="row">
          <div className="col-md-12 pl0 pr0 at_bestsellerdesti">
            <div className="common-heading-sliders mb15 flex alignCenter spaceBetween">
              <h4 className="fw7">
                <span style={{ color: "#6f6573", top: 100, left: "50%", transform: "translateX(-50%)", fontSize: 30, fontWeight: 600 }}>Explore destinations by theme</span>
              </h4>
            </div>
            <div style={{ position: "relative" }}>
              <Grid container spacing={1}>
                {destinations.map((destination, index) => (
                  <Grid key={index} item lg={2}>
                    <Card>
                      <CardContent style={{ padding: "8px" }}>
                        <div className="relative wfull overflowh" style={{ height: "0", paddingBottom: "130%" }}>
                          <img
                            src={destination.imageUrl}
                            alt={destination.title}
                            data-src={destination.imageUrl}
                            className="imgGlobal lazyloaded"
                            style={{ Width: "100%", maxHeight: "187px" }}
                          />
                        </div>
                        <Typography variant="h6" component="h2">
                          {destination.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDestinations;
