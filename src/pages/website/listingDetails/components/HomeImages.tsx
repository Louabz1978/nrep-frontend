import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

interface HomeImagesProps {
  images: { url: string; predicted_price: number }[];
  predicted_price: number;
}

export default function HomeImages({ images, predicted_price }: HomeImagesProps) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBulletClick = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className="w-full md:col-span-6 bg-card-bg rounded-2xl flex flex-col justify-center items-center pt-6xl">
      <div className="w-[90%] h-[520px] relative rounded-2xl">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView={1}
          loop={false}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="homeSwiper w-full h-full"
        >
          {images.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center bg-tertiary-bg rounded-2xl shadow-lg !h-[452px] "
            >
              <img
                src={item.url}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-xl left-1/2 transform -translate-x-1/2 z-10 flex justify-center items-center gap-lg ">
          <button className="!static translate-y-[10px] !self-center swiper-button-prev before:hidden after:hidden z-10 !size-5xl flex items-center justify-center transition">
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
          <button className="!static translate-y-[10px] !self-center swiper-button-next before:hidden after:hidden z-10 !size-5xl flex items-center justify-center transition">
            <ArrowLeft className="!size-3xl min-w-3xl text-carousal-bg" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-md text-success text-size20 font-black mt-6 mb-10">
        <span className="whitespace-nowrap">القيمة التقديرية للعقار  :</span>
        <span className="font-black whitespace-nowrap">
          {predicted_price != null ? `$ ${predicted_price}` : "$ غير متوفر"}
        </span>
      </div>
    </div>
  );
}
