/**
 * Format a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @param {boolean} includeTime - Whether to include the time in the formatted date
 * @returns {string} - The formatted date string
 */
const formatDate = (dateString, includeTime = false) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export default formatDate;