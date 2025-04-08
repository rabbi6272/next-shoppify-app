"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function HeroSlideshow() {
  return (
    <div className="w-full h-[45vh] md:h-[80vh] xl:h-[100vh]">
      <Splide
        options={{
          type: "loop",
          rewind: true,
          rewindSpeed: 3000,
          autoplay: true,
          interval: 2500,
          arrows: false,
          pagination: true,
          speed: 300,
          pauseOnHover: false,
        }}
        className="w-full h-full"
      >
        <SplideSlide className="relative w-full h-screen">
          <img
            src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459706/0-online-shopping-sales-infographics___media_library_original_1600_900_ikndda.jpg"
            alt="Slide 1"
            className="absolute w-fullobject-cover"
          />
        </SplideSlide>

        <SplideSlide className="relative w-full h-screen">
          <img
            src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459792/0-sales-strategy-and-digital-marketing___media_library_original_1600_900_uvgv8v.jpg"
            alt="Slide 2"
            className="absolute w-full object-cover"
          />
        </SplideSlide>

        <SplideSlide className="relative w-full h-screen">
          <img
            src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459846/0-online-minimarket-social-media-strategy___media_library_original_1600_900_hnbhmr.jpg"
            alt="Slide 3"
            className="absolute w-full object-cover"
          />
        </SplideSlide>

        <SplideSlide className="relative w-full h-screen">
          <img
            src="https://res.cloudinary.com/ddtd7avvo/image/upload/v1740459939/0-shopping-center-sales___media_library_original_1600_900_jies32.jpg"
            alt="Slide 4"
            className="absolute w-full object-cover"
          />
        </SplideSlide>
      </Splide>
    </div>
  );
}
