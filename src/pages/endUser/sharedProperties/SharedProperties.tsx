import { Heart } from "lucide-react";
import house from "../../../assets/images/house.jpg";
import { Button } from "@/components/global/form/button/Button";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import useGetSharedProperties from "@/hooks/endUser/useGetSharedProperties";
import { useAddToFavorites } from "@/hooks/endUser/useAddToFavorites";
import { useNavigate } from "react-router-dom";
const properties = [
  {
    id: 1,
    title: "شقة للبيع بحي المحطة",
    tags: [
      "مكيف",
      "مسبح",
      "مكان لركن السيارة",
      "جاكوزي",
      "مكيف",
      "مكيف",
      "مكيف",
    ],
    description:
      "هذة الإعلانات البانورامية المدهشة موجودة فعلاً! عشر ... في واحدة من أكثر المواقع طلباً في تورنتو",
    price: "50000 $",
    imageUrl: house,
  },
  {
    id: 2,
    title: "فيلا مطلة على البحر",
    tags: ["مكيف", "مسبح", "مسبح"],
    description:
      "هذة الإعلانات البانورامية المدهشة موجودة فعلاً! عشر ... في واحدة من أكثر المواقع طلباً في تورنتو",
    price: "120000 $",
    imageUrl: house,
  },
  {
    id: 3,
    title: "شقة دوبلكس فاخرة",
    tags: ["مكيف", "مسبح", "مكان لركن السيارة", "جاكوزي"],
    description:
      "هذة الإعلانات البانورامية المدهشة موجودة فعلاً! عشر ... في واحدة من أكثر المواقع طلباً في تورنتو",
    price: "75000 $",
    imageUrl: house,
  },
  {
    id: 4,
    title: "استوديو في وسط المدينة",
    tags: ["مكيف", "مكان لركن السيارة"],
    description:
      "هذة الإعلانات البانورامية المدهشة موجودة فعلاً! عشر ... في واحدة من أكثر المواقع طلباً في تورنتو",
    price: "30000 $",
    imageUrl: house,
  },
];

const SharedProperties = () => {
  const { sharedProperties } = useGetSharedProperties();
  const { handleAddToFavorites } = useAddToFavorites();
  const navigate = useNavigate();


  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-6 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold">العقارات المرسلة</h1>
          <p className=" mt-2 text-xl">
            يتم عرض جميع العقارات النشطة المرسلة اليك من قبل الوكيل العقاري
          </p>
          <hr className="mt-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8xl gap-y-4xl">
          {(properties).map((property) => (
            <div
              key={property.id}
              className="bg-[var(--card-bg)] rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row cursor-pointer"
              dir="ltr"
              onClick={() =>
                navigate(`/end-user/listing-details/${property.id}`)
              }
            >
              <div className="p-5 sm:w-7/12 w-full flex flex-col" dir="rtl">
                <h2 className="text-xl font-bold mb-3 text-[var(--login-bg-end)]">
                  {property.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-4 ">
                  {property.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium text-golden-medium border border-golden-medium rounded-lg px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col xs:flex-row justify-between  gap-4 mt-auto">
                  <p className="text-sm text-[var(--login-bg-end)]/50 font-semibold mb-5 leading-relaxed">
                    {property.description}
                  </p>
                  <span className="text-xl font-bold text-[var(--login-bg-end)]/50">
                    {property.price}
                  </span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorites(property.id)
                    }}
                    className="w-fit bg-umber-light text-tertiary-bg text-sm font-medium px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>اضافة الى المفضلة</span>
                    <Heart size={16} />
                  </Button>
                </div>
              </div>
              <div className="sm:w-7/12 w-64 h-64 sm:h-auto flex items-center">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="p-2xl h-full w-full object-cover !rounded-[2rem]"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6xl mb-2xl">
          <Button className="flex items-center !px-3xl !rounded-lg">
            تحميل المزيد
          </Button>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default SharedProperties;
