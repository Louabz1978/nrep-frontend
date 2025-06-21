import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

// gets: input type, input placeholder, register method of react hook form, key name of input field in schema, input label, validation errors from react hook form, custom element beside checkbox input, and flag to specify if the input is disabled or not
// returns: input component controlled by react hook form
function Input({
  type,
  placeholder,
  register,
  name,
  label,
  errors,
  element,
  disabled,
  addingStyle = "",
  addingInputStyle = "",
  customInput,
  step = 1,
  setValue = () => {},
  trigger = () => {},
  watch = () => {},
  numberRegex = /^\d*$/,
  onClick = () => {},
  onFocus = () => {},
  onChange = () => {},
  onBlur = () => {},
  min,
  max,
}) {
  // to show password
  const [show, setShow] = useState(false);

  function getError(errors, name) {
    let res = false;
    let currentErrors = errors;
    let names = name?.split(".");
    names?.map((subName) => {
      res = currentErrors?.[subName];
      currentErrors = currentErrors?.[subName];
    });
    return res;
  }
  return (
    <>
      {/* checkbox input with its style */}
      {type == "checkbox" ? (
        <div className={`flex flex-col ${addingStyle}`}>
          <label
            htmlFor={name}
            className={`flex items-center gap-2 cursor-pointer ${addingInputStyle}`}
          >
            <input
              type={type}
              className="peer hidden"
              id={name}
              {...register(name)}
              disabled={disabled}
              onChange={(e) => {
                setValue(name, e?.target?.checked ? 1 : 0);
                trigger(name);
                onChange({ trigger });
              }}
              checked={watch(name) ? true : false}
            />
            {/* checkbox presentation */}
            <div className="w-[20px] max-w-[20px] min-w-[20px] h-[20px] max-h-[20px] min-h-[20px] bg-secondBackgroundColor rounded-sm right-[2px] peer-checked:bg-secondFontColor transition-all duration-[0.1s]"></div>

            <div>{label}</div>
            {element ? element : null}
          </label>
          {errors[name] ? <span>{errors[name].message}</span> : null}
        </div>
      ) : (
        // other normal inputs
        <div
          className={`flex flex-col w-full ${addingStyle}`}
          onClick={onClick}
        >
          {/* input label  */}
          {label ? (
            <label htmlFor={name} className="text-fontColor mb-2">
              {label}
            </label>
          ) : null}

          {/* input container to link icon to its position */}
          <div className="relative w-full flex flex-col gap-2">
            {/* input with react hook form register control  */}
            {type == "custom" ? (
              <div className="custom-input">{customInput}</div>
            ) : type == "number" ? (
              <input
                type={"number"}
                placeholder={placeholder}
                id={name}
                {...register(name)}
                disabled={disabled}
                className={`custom-input ${addingInputStyle}`}
                onChange={(e) => {
                  if (
                    numberRegex.test(e.target.value) &&
                    (!min || e.target.value >= min) &&
                    (!max || e.target.value <= max)
                  ) {
                    if (e.target.value === "") {
                      setValue(name, undefined);
                    } else {
                      setValue(name, Number(e.target.value));
                    }
                    trigger(name);
                  }
                }}
                value={watch(name) ?? undefined}
                step={step}
              />
            ) : (
              <input
                type={show ? "text" : type}
                placeholder={placeholder}
                id={name}
                {...register(name)}
                disabled={disabled}
                className={`custom-input ${addingInputStyle}`}
                step={step}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            )}

            {/* show input content with password input type */}
            {type == "password" ? (
              <div
                className="text-fontColor text-opacity-80 hover:text-opacity-100 transition-all absolute h-max w-max left-4 top-[16px] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  if (type == "password") setShow(!show);
                }}
              >
                {/* toggle icon depending on show value */}
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
            ) : null}

            {/* validation errors  */}
            {getError(errors, name) ? (
              <span className="text-errorColor text-size14">
                {getError(errors, name).message}
              </span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
