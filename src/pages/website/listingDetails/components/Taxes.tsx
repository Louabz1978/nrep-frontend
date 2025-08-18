const RenderTaxesTab = () => {
  // Taxes table data and columns
  const taxesData = [
    { id: 1, year: 2024, tax: 98000, desc: "" },
    { id: 2, year: 2023, tax: 120000, desc: "" },
    { id: 3, year: 2022, tax: 110000, desc: "" },
    { id: 4, year: 2021, tax: 123000, desc: "" },
  ];

  return (
    <div className="p-6 border-2 border-quaternary-border h-full">
      <div className="bg-primary-bg rounded-md p-4">
        <table
          className="w-full text-right rtl border-separate border-spacing-0"
          dir="rtl"
        >
          <thead>
            <tr className="bg-primary-bg ">
              <th className="border border-primary-bg  py-2 px-4 font-normal">
                #
              </th>
              <th className="border border-primary-bg  py-2 px-4 font-normal">
                السنة
              </th>
              <th className="border border-primary-bg  py-2 px-4 font-normal">
                الضرائب
              </th>
              <th className="border border-primary-bg  py-2 px-4 font-normal">
                الوصف
              </th>
            </tr>
          </thead>
          <tbody className="bg-tertiary-bg">
            {taxesData.map((row) => (
              <tr key={row.id}>
                <td className="border border-primary-bg  py-2 px-4">
                  {row.id}
                </td>
                <td className="border border-primary-bg  py-2 px-4">
                  {row.year}
                </td>
                <td className="border border-primary-bg  py-2 px-4">
                  {row.tax}
                </td>
                <td className="border border-primary-bg  py-2 px-4">
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenderTaxesTab;
