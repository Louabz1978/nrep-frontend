<div>
{/* Row 1 */}
<div className="flex row mr-12 gap-35">
  <div className="w-75">
    <div className="flex items-center justify-center relative">
      <Input
        name="propertyStatus"
        type="text"
        label="حالة العقار"
        labelStyle="font-bold"
        placeholder="معروض للبيع"
        errors={form.formState.errors}
        addingInputStyle="mb-4 text-black"
      />
      <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]" />
    </div>
  </div>
  <div className="w-75">
    <Input
      name="offeredPrice"
      type="number"
      label="السعر المعروض"
      labelStyle="font-bold"
      placeholder="1,000,000 ل.س"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
  <div className="w-75">
    <Input
      name="yearBuilt"
      type="number"
      label="سنة البناء"
      labelStyle="font-bold"
      placeholder="2010"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
</div>
{/* Row 2 */}
<div className="flex row mr-12 gap-35">
  <div className="w-75">
    <Input
      name="totalArea"
      type="number"
      label="المساحة الإجمالية التقريبية"
      labelStyle="font-bold"
      placeholder=""
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
  <div className="w-75">
    <Input
      name="livingArea"
      type="number"
      label="المساحة التقريبية للمعيشة"
      labelStyle="font-bold"
      placeholder=""
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
  <div className="w-75">
    <Input
      name="furnished"
      type="text"
      label="مفروشة"
      labelStyle="font-bold"
      placeholder="غير مفروشة"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
</div>
{/* Row 3 */}
<div className="flex row mr-12 gap-35">
  <div className="w-75">
    <Input
      name="bedrooms"
      type="number"
      label="عدد غرف النوم"
      labelStyle="font-bold"
      placeholder="3"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
  <div className="w-75">
    <Input
      name="bathroomsWithShower"
      type="number"
      label="عدد دورات المياه (مع دش)"
      labelStyle="font-bold"
      placeholder="2"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
  <div className="w-75">
    <Input
      name="bathroomsWithoutShower"
      type="number"
      label="عدد دورات المياه (بدون دش)"
      labelStyle="font-bold"
      placeholder="1"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
</div>
{/* Row 4 */}
<div className="flex row mr-12 gap-35">
  <div className="w-75">
    <Input
      name="ceilingFans"
      type="number"
      label="عدد مراوح السقف"
      labelStyle="font-bold"
      placeholder="0"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
  <div className="w-75">
    <Input
      name="elevator"
      type="text"
      label="مصعد"
      labelStyle="font-bold"
      placeholder="لا يوجد"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
  <div className="w-75">
    <Input
      name="garageSpaces"
      type="number"
      label="عدد مواقف الكراج"
      labelStyle="font-bold"
      placeholder="1"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
</div>
{/* Row 5 */}
<div className="flex row mr-12 gap-35">
  <div className="w-75">
    <Input
      name="cableAvailable"
      type="text"
      label="الكابل متوفر (التلفزيون/الإنترنت)"
      labelStyle="font-bold"
      placeholder="لا يوجد"
      errors={form.formState.errors}
      addingInputStyle="mb-4 text-black"
    />
  </div>
</div>
</div>