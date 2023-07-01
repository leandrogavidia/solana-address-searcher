import { FormEvent } from "react";

export const showErrorMessage = (message: string, duration: number) => {
    const connectedValidation = document.querySelector(
      "#address-validation"
    ) as HTMLSpanElement;
    connectedValidation.classList.remove("hidden");
    connectedValidation.innerText = message;
    setTimeout(() => {
      connectedValidation.classList.add("hidden");
    }, duration);
}

export const addressRequired = (event: FormEvent<HTMLInputElement>) => {
  event.preventDefault();
  showErrorMessage("You need to enter a solana address first", 3000);
};

export const searchAddressByKey = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.code == "KeyS") {
    e.preventDefault();
    const submitButton = document.querySelector(
      "#submit_button"
    ) as HTMLInputElement;
    submitButton.click();
  }
}