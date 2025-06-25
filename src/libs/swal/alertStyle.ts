// default style of confirmation popup
const ALERT_STYLE = {
  icon: "warning" as const,
  showCancelButton: true,
  confirmButtonColor: "var(--primary)",
  cancelButtonColor: "var(--tertiary)",
  color: "var(--primary-foreground)",
  background: "var(--block-background)",
  customClass: {
    popup: " shadow-shadow",
  },
  confirmButtonText: "حذف",
  cancelButtonText: "إلغاء",
};

export default ALERT_STYLE;
