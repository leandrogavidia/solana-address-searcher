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