import { SlUser } from "react-icons/sl";

const ExternalLinksCard = () => {
  const users = [
    { name: "بلال الصابوني", time: "11:00pm" },
    { name: "عبد الله بحلاق", time: "12:00AM" },
    { name: "همام صافي", time: "8:00pm" },
    { name: "احمد قيسون", time: "7:00pm" },
    { name: "عبد الله دعاس", time: "3:30pm" },
  ];

  return (
    <div className="bg-tertiary-bg rounded-[var(--spacing-2xl)] shadow-primary-shadow p-[var(--spacing-lg)] min-h-[300px] flex flex-col">
      <h2 className=" text-size24 font-semibold text-right mb-[var(--spacing-lg)] text-secondary-fg">
        أخر نشاط العملاء
      </h2>
      <div className="flex flex-col gap-4 p-3">
        {users.map((user) => (
          <div className="flex items-center justify-between">
            <p className="flex gap-3"><SlUser /> {user.name} </p>
            <p>{user.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExternalLinksCard;
