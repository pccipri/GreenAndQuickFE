import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "warning";

export function notify(message: string, type: ToastType, options?: ToastOptions) {
  const config: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "warning":
      toast.warning(message, config);
      break;
    default:
      toast(message, config);
  }
}
