import { SlUser } from "react-icons/sl";
import SectionTitle from "./SectionTitle";

const ExternalLinksCard = () => {
  const users = [
    { name: "بلال الصابوني", time: "11:00pm" },
    { name: "عبد الله بحلاق", time: "12:00AM" },
    { name: "عبد الله دعاس", time: "1:30pm" },
    { name: "همام صافي", time: "8:00pm" },
    { name: "احمد قيسون", time: "7:00pm" },
  ];

  return (
    <div>
      <SectionTitle>اخر نشاط العملاء</SectionTitle>
      <div className="min-h-[350px] bg-[var(--card-bg)] rounded shadow-[var(--shadow-card)] p-[var(--spacing-lg)]  flex flex-col">
        <div className="flex flex-col gap-4 p-3">
          {users.map((user) => (
            <div className="flex items-center justify-between">
              <p className="flex gap-3"><SlUser /> {user.name} </p>
              <p>{user.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExternalLinksCard;
