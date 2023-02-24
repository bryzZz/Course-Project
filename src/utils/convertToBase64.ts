export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        res(reader.result.toString());
      }

      rej(new Error("err"));
    };

    reader.readAsDataURL(file);
  });
};
