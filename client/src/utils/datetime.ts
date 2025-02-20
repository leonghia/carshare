export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month and pad
  const year = date.getFullYear(); // Get the full year

  return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
};

export const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeStyle: "short",
});
