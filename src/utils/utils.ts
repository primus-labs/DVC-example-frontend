export const copy = (textToCopy: string) => {
  if ("clipboard" in navigator) {
    navigator.clipboard.writeText(textToCopy);
  } else {
    function copyTextToClipboard(text: string) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        console.log("Copying text command was " + msg);
      } catch (err) {
        console.error("Unable to copy text: ", err);
      }
      document.body.removeChild(textArea);
    }
    // console.error("Clipboard API is not supported in this browser.");
    copyTextToClipboard(textToCopy);
  }
};
