const ExternalLinksCard = () => (
  <div className="bg-white rounded-[var(--spacing-2xl)] shadow p-[var(--spacing-lg)] min-h-[300px] flex flex-col">
    <h2 className="text-[24px] font-semibold text-right mb-[var(--spacing-lg)] text-black">
      روابط خارجية
    </h2>
    <div className="text-sm text-gray-500 leading-relaxed text-justify">
      <p className="text-size16 font-normal pl-[var(--spacing-3xl)]">
        يمكنك الاطلاع على خرائط المنطقة التفصيلية عبر موقع البلدية:
        <a href="#" className="text-blue-600 hover:underline mr-1">
          www.municipality.gov.sa/maps
        </a>
      </p>
      <p className="text-size16 font-normal pl-[var(--spacing-3xl)] mt-4">
        دليل القوانين العقارية في الدولة:
        <a href="#" className="text-blue-600 hover:underline mr-1">
          www.realestate-laws.gov.sa
        </a>
      </p>
      <p className="text-size16 font-normal pl-[var(--spacing-3xl)] mt-4">
        أسعار المواد الإنشائية (تحديث أسبوعي):
        <a href="#" className="text-blue-600 hover:underline mr-1">
          www.builders.com/pricing
        </a>
      </p>
      <p className="text-size16 font-normal pl-[var(--spacing-3xl)] mt-4">
        حاسبة التمويل العقاري:
        <a href="#" className="text-blue-600 hover:underline mr-1">
          www.banks.com/mortgage-calculator
        </a>
      </p>
      <p className="text-size16 font-normal pl-[var(--spacing-3xl)] mt-4">
        دليل المدارس والخدمات في المنطقة:
        <a href="#" className="text-blue-600 hover:underline mr-1">
          www.neighborhood-services.edu.sa
        </a>
      </p>
    </div>
  </div>
);

export default ExternalLinksCard;
