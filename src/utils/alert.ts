import Swal from "sweetalert2";

export enum SwalIcon {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
  Question = "question",
}

type Props = {
  title: string;
  text: string;
  icon?: SwalIcon;
  positiveButton?: string;
  negativeButton?: string;
  positiveCallback?: () => void;
  negativeCallback?: () => void;
  dismissible?: boolean;
};

const showAlert = ({
  positiveButton = "Okay",
  negativeButton,
  positiveCallback,
  negativeCallback,
  dismissible = true,
  ...rest
}: Props) => {
  Swal.fire({
    confirmButtonText: positiveButton,
    showDenyButton: !!negativeButton,
    denyButtonText: negativeButton,
    allowOutsideClick: dismissible,
    ...rest,
  }).then(async (result) => {
    if (result.isConfirmed) positiveCallback?.();
    else negativeCallback?.();
  });
};

export const showSuccessAlert = (
  title: string,
  text: string,
  positiveButton = "Great"
) => {
  showAlert({ title, text, positiveButton, icon: SwalIcon.Success });
};

export const showErrorAlert = (title: string, text: string) => {
  showAlert({ title, text, icon: SwalIcon.Error });
};

export const showWarningAlert = (title: string, text: string) => {
  showAlert({ title, text, icon: SwalIcon.Warning });
};

export const showInfoAlert = (title: string, text: string) => {
  showAlert({ title, text, icon: SwalIcon.Info });
};

export const showQuestionAlert = (
  title: string,
  text: string,
  positiveCallback?: () => void,
  positiveButton = "Yes",
  negativeButton = "No"
) => {
  showAlert({
    title,
    text,
    icon: SwalIcon.Question,
    positiveButton,
    positiveCallback,
    negativeButton,
  });
};
