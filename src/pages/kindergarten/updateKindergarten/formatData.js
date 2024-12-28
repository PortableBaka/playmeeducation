export const FormatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${date.getFullYear()}.${month}.${year}`;
};

export const  FormatPhoneNumber = (phone_number) => {
    const formattedNumber = phone_number?.replace("+998", "");
    return formattedNumber;
}