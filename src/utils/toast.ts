import Swal, { SweetAlertPosition } from "sweetalert2";

import { SwalIcon } from "./alert";

type Props = {
  title: string;
  icon?: any;
  position?: SweetAlertPosition;
};

const showToast = ({ title, icon, position = "top-end" }: Props) => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({ icon, title });
};

export const showSuccessToast = (
  title: string,
  position?: SweetAlertPosition
) => {
  showToast({ title, icon: SwalIcon.Success, position });
};

export const showErrorToast = (
  title: string,
  position?: SweetAlertPosition
) => {
  showToast({ title, icon: SwalIcon.Error, position });
};

export const showWarningToast = (
  title: string,
  position?: SweetAlertPosition
) => {
  showToast({ title, icon: SwalIcon.Warning, position });
};

export const showInfoToast = (title: string, position?: SweetAlertPosition) => {
  showToast({ title, icon: SwalIcon.Info, position });
};

export const showQuestionToast = (
  title: string,
  position?: SweetAlertPosition
) => {
  showToast({ title, icon: SwalIcon.Question, position });
};
