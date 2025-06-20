import { Link } from "react-router-dom";
import { useUserInformationContext } from "../../../../contexts/common/UserInformationContextProvider";

// gets: flag to specify if button cuase routing or not, the destination url if the button is routing button, state that passed in link
//   optional icon appears in button, title of button, type of button style, optional custom color of button, and width of button,
//   optional onclick function if the button is not routing button or submit button,
//   flag to specify if the button is submit button, form id that this button submit, flag to specify if the button is disabled or enabled
//   customStyle for append any custom style of button, hoverTitle for title to show on hover on button

// returns: full customized button
const Button = ({
  isLink,
  goto,
  linkState,
  Icon,
  title,
  styleType = "solid",
  color = "mainColor",
  width,
  onClickFun,
  isSubmit,
  formId,
  disabled,
  customStyle,
  hoverTitle,
  addingStyle,
  permissions,
}) => {
  // check permissions method
  const { checkPermissions } = useUserInformationContext();

  const bgColors = {
    mainColor: "bg-mainColor",
    secondColor: "bg-secondColor",
    thirdColor: "bg-thirdColor",
    errorColor: "bg-errorColor",
    fourthColor: "bg-fourthColor",
    fifthColor: "bg-fifthColor",
    backgroundColor: "bg-backgroundColor",
    secondBackgroundColor: "bg-secondBackgroundColor",
    secondFontColor: "bg-secondFontColor",
  };
  const borderColors = {
    mainColor: "border-mainColor",
    secondColor: "border-secondColor",
    thirdColor: "border-thirdColor",
    errorColor: "border-errorColor",
    fourthColor: "border-fourthColor",
    fifthColor: "border-fifthColor",
    backgroundColor: "border-backgroundColor",
    secondBackgroundColor: "border-secondBackgroundColor",
    secondFontColor: "border-secondFontColor",
  };
  const hoverTextColors = {
    mainColor: "hover:text-mainColor",
    secondColor: "hover:text-secondColor",
    thirdColor: "hover:text-thirdColor",
    errorColor: "hover:text-errorColor",
    fourthColor: "hover:text-fourthColor",
    fifthColor: "hover:text-fifthColor",
    backgroundColor: "hover:text-backgroundColor",
    secondBackgroundColor: "hover:text-secondBackgroundColor",
    secondFontColor: "hover:text-secondFontColor",
  };
  const textColors = {
    mainColor: "text-whiteColor",
    secondColor: "text-whiteColor",
    thirdColor: "hover:text-thirdColor",
    errorColor: "hover:text-errorColor",
    fourthColor: "hover:text-fourthColor",
    fifthColor: "hover:text-fifthColor",
    backgroundColor: "text-fontColor",
    secondBackgroundColor: "text-fontColor",
    secondFontColor: "text-whiteColor",
  };

  const STYLE = ` ${addingStyle ? addingStyle : ""} ${
    customStyle
      ? `${customStyle} relative`
      : //solid button style

      styleType == "solid"
      ? `border-solid rounded-[6px] border ${width ?? "w-fit"} ${
          bgColors[color]
        } ${textColors[color]} ${borderColors[color]} ${
          disabled || (permissions && !checkPermissions(permissions))
            ? "hover:bg-opacity-100 brightness-75 cursor-not-allowed"
            : "hover:bg-opacity-80 brightness-100 cursor-pointer"
        } transition-all py-2 px-4 relative`
      : // table button style
      styleType == "form"
      ? `border-solid rounded p-1 border ${
          width ?? "sm:w-[182px] sm:min-w-[182px] w-full min-w-full"
        } ${bgColors[color]} ${textColors[color]} ${borderColors[color]} ${
          disabled || (permissions && !checkPermissions(permissions))
            ? "hover:bg-opacity-100 brightness-75 cursor-not-allowed"
            : "hover:bg-opacity-80 brightness-100 cursor-pointer"
        } transition-all relative`
      : // regular button style
        `rounded-[5px] mb-4 ${
          width ?? "w-auto"
        } flex items-center justify-center gap-1 px-4 py-2 text-center ${
          textColors[color]
        } ${bgColors[color]} border border-solid ${
          borderColors[color]
        } duration-100 ${
          disabled || (permissions && !checkPermissions(permissions))
            ? "brightness-75 cursor-not-allowed"
            : "hover:bg-transparent brightness-100 cursor-pointer"
        } ${
          disabled || (permissions && !checkPermissions(permissions))
            ? ""
            : `${hoverTextColors[color]}`
        } relative `
  } ${addingStyle ? addingStyle : ""} `;

  return isLink ? (
    // link button section
    <Link
      title={
        permissions && !checkPermissions(permissions)
          ? "لا تملك صلاحية"
          : hoverTitle
      }
      role={"button"}
      to={goto}
      state={linkState}
      disabled={disabled || (permissions && !checkPermissions(permissions))}
      className={STYLE}
    >
      <span>{title}</span> {Icon && <span>{Icon}</span>}
      <button
        role={"button"}
        title={
          permissions && !checkPermissions(permissions)
            ? "لا تملك صلاحية"
            : hoverTitle
        }
        disabled={disabled || (permissions && !checkPermissions(permissions))}
        className={`absolute top-0 right-0 h-full w-full ${
          disabled || (permissions && !checkPermissions(permissions))
            ? "cursor-not-allowed"
            : ""
        }`}
      ></button>
    </Link>
  ) : isSubmit ? (
    // submit button section
    <button
      title={
        permissions && !checkPermissions(permissions)
          ? "لا تملك صلاحية"
          : hoverTitle
      }
      role={"button"}
      disabled={disabled || (permissions && !checkPermissions(permissions))}
      id={formId} // for submitting the form that has id (formId)
      onClick={onClickFun ? onClickFun : () => {}}
      className={STYLE}
    >
      <span>{title}</span> {Icon && <span>{Icon}</span>}
    </button>
  ) : (
    // normal button section
    <button
      title={hoverTitle}
      role={"button"}
      onClick={
        disabled || (permissions && !checkPermissions(permissions))
          ? null
          : (e) => {
              e.preventDefault();
            }
      }
      disabled={disabled || (permissions && !checkPermissions(permissions))}
      className={STYLE}
    >
      {title ? <span>{title}</span> : null} {Icon && <span>{Icon}</span>}
      <div
        role={"button"}
        title={
          permissions && !checkPermissions(permissions)
            ? "لا تملك صلاحية"
            : title
        }
        onClick={
          disabled || (permissions && !checkPermissions(permissions))
            ? null
            : (e) => {
                e.preventDefault();
                onClickFun();
              }
        }
        className={` absolute top-0 right-0 h-full w-full opacity-0 ${
          disabled || (permissions && !checkPermissions(permissions))
            ? "cursor-not-allowed"
            : ""
        }`}
      ></div>
    </button>
  );
};

export default Button;
