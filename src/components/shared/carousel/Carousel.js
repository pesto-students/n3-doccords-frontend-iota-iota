/* eslint-disable react/prop-types */

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

// eslint-disable-next-line react/prop-types
const MyCarousel = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-100-px"
      >
        {props.data.map((item, index) => {
          return (
            <GridListTile
              key={index}
              style={{ maxWidth: "500px", height: "300px", padding: "5px" }}
              // eslint-disable-next-line react/prop-types
              onClick={() => props.handleClick(item)}
            >
              <img src={item.picture} alt={item.title} />
              <GridListTileBar
                title={item.title}
                // subtitle={<span>by: {item.author}</span>}
              />
            </GridListTile>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
