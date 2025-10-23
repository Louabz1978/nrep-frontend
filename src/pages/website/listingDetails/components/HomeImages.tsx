import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1599423300746-b62533397364",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1599423300746-b62533397364",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
];

interface HomeImagesProps {
  images: { url: string; is_main?: boolean }[];
}
export default function HomeImages({ images }: HomeImagesProps) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBulletClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="w-full flex justify-center items-center pt-6xl">
      <div className="w-[85%] h-[540px] relative">
        {/* Navigation Arrows */}

        {/* Custom Pagination */}
        <div className="absolute bottom-7xl left-1/2 transform -translate-x-1/2 z-10 !flex justify-center items-center gap-lg">
          <button className=" !static translate-y-[10px] !self-center swiper-button-prev before:hidden after:hidden z-10 !size-5xl flex items-center justify-center transition">
            <ArrowRight className="!size-3xl min-w-3xl text-carousal-bg" />
          </button>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleBulletClick(index)}
              className={`rounded-full transition-all cursor-pointer duration-300 ${
                index === activeIndex
                  ? "bg-carousal-bg-active size-xl"
                  : "size-lg bg-carousal-bg"
              }`}
            />
          ))}
          <button className=" !static translate-y-[10px] !self-center swiper-button-next before:hidden after:hidden z-10 !size-5xl flex items-center justify-center transition">
            <ArrowLeft className="!size-3xl min-w-3xl text-carousal-bg" />
          </button>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={false}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: 160,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination", // You can keep this or remove it
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="homeSwiper"
        >
          {images.map((item, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide-custom rounded-[40px] overflow-hidden bg-tertiary-bg shadow-lg !w-[700px] !h-[400px]"
            >
              <img
                src={item?.url}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
