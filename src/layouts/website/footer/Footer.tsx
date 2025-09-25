import newLogo from "../../../assets/images/new logo.png";

function Footer() {
  // Links for the top row as seen in the image
  const topRowLinks = [
    { name: "كتابة عقد بيع/شراء/ايجار", link: "/contracts/add" },
    { name: "تعديل عقد", link: "/contracts/edit" },
    { name: "الحساب الشخصي", link: "/profile" },
    { name: "البحث عن عقار", link: "/" },
    { name: "عقارات الشركة", link: "/" },
    { name: "عقارات الحساب", link: "/" },
  ];

  // Links for the bottom row as seen in the image
  const bottomRowLinks = [
    { name: "تسديد الإشتراكات", link: "/" },
    {
      name: "التواصل مع مجلس الوسطاء العقاريين في حمص",
      link: "/",
    },
  ];

  return (
    <footer className="bg-layout-bg py-8 px-4" dir="rtl">
      {/* Responsive container */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-8">
        {/* Right Section: Title and Links */}
        <div className="flex flex-col w-full lg:w-auto">
          <h1 className="text-golden-bold text-size24 sm:text-size28 md:text-size30 font-bold text-right mb-4">
            روابط ذات صلة
          </h1>

          {/* Top row of links */}
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-5 sm:mb-7">
            {topRowLinks.map((linkItem) => (
              <div
                key={linkItem.name}
                className="hover:border-b-2 border-golden-bold transition-all"
              >
                <a
                  href={linkItem.link}
                  className="text-tertiary-bg text-size16 sm:text-size18"
                >
                  {linkItem.name}
                </a>
              </div>
            ))}
          </div>

          {/* Bottom row of links */}
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-6xl">
            {bottomRowLinks.map((linkItem) => (
              <div
                key={linkItem.name}
                className="hover:border-b-2 border-golden-bold transition-all"
              >
                <a
                  href={linkItem.link}
                  className="text-tertiary-bg hover:underline text-size16 sm:text-size18"
                >
                  {linkItem.name}
                </a>
              </div>
            ))}
          </div>
          <hr className="border-golden-bold my-6 sm:my-8" />

          <div className="text-golden-bold text-size18 sm:text-size20 text-right">
            مجلس بلدية حمص
          </div>
        </div>
        {/* Left Section: Logo (centered on mobile, right on desktop) */}
        <div className="mb-4 lg:mb-0 flex-shrink-0 flex justify-center w-full lg:w-auto ml-5xl">
          <img
            src={newLogo}
            alt="Logo"
            className="h-34 sm:h-30 md:h-34 lg:h-40 xl:h-72 object-contain"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
