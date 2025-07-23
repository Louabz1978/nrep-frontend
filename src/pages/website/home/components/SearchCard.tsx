const SearchCard = () => (
  <div className="bg-white rounded-[var(--spacing-2xl)] shadow p-[var(--spacing-xl)] min-h-[300px] flex flex-col justify-between">
    <h2 className="text-[24px] font-semibold text-right mb-[var(--spacing-lg)] text-black">البحث</h2>
    <form className="flex flex-col gap-[var(--spacing-lg)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--spacing-lg)] gap-y-[var(--spacing-lg)]">
        <div>
          <label className="block mb-[var(--spacing-md)] text-right font-medium text-black">المحافظة</label>
          <select className="w-full border border-gray-400 rounded-[12px] px-[var(--spacing-lg)] py-[var(--spacing-md)] text-right focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white appearance-none" title="المحافظة">
            <option>حمص</option>
            <option>دمشق</option>
            <option>حلب</option>
            <option>حماه</option>
            <option>حلب</option>
          </select>
        </div>
        <div>
          <label className="block mb-[var(--spacing-md)] text-right font-medium text-black">المدينة</label>
          <select className="w-full border border-gray-400 rounded-[12px] px-[var(--spacing-lg)] py-[var(--spacing-md)] text-right focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white appearance-none" title="المدينة">
            <option>الرياض</option>
            <option>جدة</option>
            <option>الدمام</option>
          </select>
        </div>
        <div>
          <label className="block mb-[var(--spacing-md)] text-right font-medium text-black">اسم الشارع</label>
          <input className="w-full border border-gray-400 rounded-[12px] px-[var(--spacing-lg)] py-[var(--spacing-md)] text-right focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="اسم الشارع" />
        </div>
        <div>
          <label className="block mb-[var(--spacing-md)] text-right font-medium text-black">الرمز البريدي</label>
          <input className="w-full border border-gray-400 rounded-[12px] px-[var(--spacing-lg)] py-[var(--spacing-md)] text-right focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="الرمز البريدي" />
        </div>
        <div>
          <label className="block mb-[var(--spacing-md)] text-right font-medium text-black">اتجاه الشارع</label>
          <select className="w-full border border-gray-400 rounded-[12px] px-[var(--spacing-lg)] py-[var(--spacing-md)] text-right focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white appearance-none" title="اتجاه الشارع">
            <option>شمال</option>
            <option>جنوب</option>
            <option>شرق</option>
            <option>غرب</option>
          </select>
        </div>
        <div>
          <label className="block mb-[var(--spacing-md)] text-right font-medium text-black">لاحقة الشارع</label>
          <select className="w-full border border-gray-400 rounded-[12px] px-[var(--spacing-lg)] py-[var(--spacing-md)] text-right focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white appearance-none" title="لاحقة الشارع">
            <option>أ</option>
            <option>ب</option>
            <option>ج</option>
          </select>
        </div>
      </div>
      <button type="submit" className="w-full bg-[#0066c5] text-white py-[var(--spacing-md)] rounded-[10px] flex items-center justify-center gap-[var(--spacing-md)] text-lg font-bold hover:bg-blue-700 transition mt-[var(--spacing-lg)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z" /></svg>
        بحث
      </button>
    </form>
  </div>
);

export default SearchCard;