const searches = [
  "حمص",
  "باب التركمان",
  "الكورنيش",
  "غربي",
  "دمشق",
  "كفر سوسة"
];
const FavoriteSearchesCard = () => (
  <div className="bg-white rounded-[var(--spacing-2xl)] shadow p-[var(--spacing-xl)] min-h-[300px] flex flex-col justify-between">
    <h2 className="text-[24px] font-semibold text-right mb-[var(--spacing-lg)] text-black">عمليات البحث المفضلة لدي</h2>
    <ul className="flex-1 flex flex-col gap-[var(--spacing-lg)] pr-[var(--spacing-md)]">
      {searches.map((item, idx) => (
        <li key={idx} className="text-right text-lg text-black font-normal">{item}</li>
      ))}
    </ul>
  </div>
);

export default FavoriteSearchesCard; 