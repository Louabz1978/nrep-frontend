const news = [
  { title: "عنوان", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
  { title: "عنوان", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
  { title: "عنوان", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
  { title: "عنوان", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
];
const NewsNotificationsCard = () => (
  <div className="bg-white rounded-[var(--spacing-2xl)] shadow p-[var(--spacing-xl)] min-h-[600px] flex flex-col justify-between">
    <h2 className="text-[24px] font-semibold text-right mb-[var(--spacing-lg)] text-black">الأخبار و التنبيهات</h2>
    <div className="flex-1 flex flex-col gap-6">
      {news.map((item, idx) => (
        <div key={idx} className="text-right">
          <div className="font-bold text-lg mb-1 text-black">{item.title}</div>
          <div className="text-sm text-gray-700 leading-relaxed mb-1 text-justify">{item.desc}</div>
          <a href="#" className="text-green-600 text-xs font-medium hover:underline">← متابعة القراءة</a>
        </div>
      ))}
    </div>
  </div>
);

export default NewsNotificationsCard; 