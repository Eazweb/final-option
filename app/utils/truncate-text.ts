export const truncateText = (str: string) => {
  if (str.length > 40) {
    return str.substring(0, 40) + "...";
  }
  return str;
}; 