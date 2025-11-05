import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

interface HomeImagesProps {
  images: { url: string; is_main?: boolean; predicted_price: number }[];
}
export default function HomeImages({
  images,
  predicted_price,
}: HomeImagesProps) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate initial slide based on image count
  const getInitialSlide = () => {
    const totalImages = images.length;

    if (totalImages >= 5) {
      return 2; // Start with third image (index 2)
    } else if (totalImages === 4 || totalImages === 3) {
      return 1; // Start with second image (index 1)
    } else {
      return 0; // Start with first image (index 0)
    }
  };

  const initialSlide = getInitialSlide();

  const handleBulletClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="w-full md:col-span-6 bg-card-bg rounded-2xl flex flex-col justify-center items-center pt-6xl">
      <div className="w-[85%] h-[520px] relative">
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
          initialSlide={initialSlide ?? 0}
          slidesPerView={"auto"}
          loop={false}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 150,
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
              className="swiper-slide-custom rounded-[40px] overflow-hidden bg-tertiary-bg shadow-lg !w-[412px] !h-[412px]"
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
      <div className="flex items-center gap-md text-success text-size20 font-black mb-10 -mt-5 ">
        <span className="whitespace-nowrap">القيمة التقديرية للعقار  :</span>
        <span className="font-black whitespace-nowrap">
          {predicted_price != null ? `$ ${predicted_price}` : "$ ---"}
        </span>
      </div>
    </div>
  );
}
