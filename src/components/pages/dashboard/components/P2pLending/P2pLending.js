import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";

import "./lending.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { isEmpty } from "lodash";

import { getPeerToPeerLendingArticles } from "../../../../../api-integrations/modules/landing-apis";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: 230,
        width: 54,
        display: "block",
        boxSizing: "border-box"
      }}
      onClick={onClick}
    >
      <div className="arrow-img">
        <img
          src={require("../../../../../assets/images/right-arrow.png")}
          alt="logo"
        ></img>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: 230,
        width: 54,
        display: "block",
        boxSizing: "border-box"
      }}
      onClick={onClick}
    >
      <div className="arrow-img">
        <img
          src={require("../../../../../assets/images/left-arrow.png")}
          alt="logo"
        ></img>
      </div>
    </div>
  );
}

const P2pLending = () => {
  const [p2pArticles, setP2pArticles] = useState({});

  useEffect(() => {
    getPeerToPeerLendingArticles().then(p2pArticles => {      
      if (p2pArticles != undefined) {
        setP2pArticles(p2pArticles.blog);
      }
    });
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (isEmpty(p2pArticles)) {
    return <div></div>;
  } else {
    return (
      <div className="lending">
        <div className="dashboard-secondary-heading">
          <h1> More on P2P Lending </h1>
          <span></span>
        </div>
        <div className="lending-card-wrap">
          <Slider {...settings}>            
            {p2pArticles.map((key, i) => {
              return (
                <div key={`article-${i}`} className="lending-card">
                  <div className="lending-card-left lending-card-inner">
                    <label>{key.head}</label>
                    <br />
                    <Link to={key.url}>Read More</Link>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
};

export default P2pLending;
