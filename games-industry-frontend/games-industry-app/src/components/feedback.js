import { toast } from "react-toastify";

const feedback = (text, time) => {
  toast.info(text, {
    position: "bottom-left",
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "dark",
  });
};

export default feedback;
