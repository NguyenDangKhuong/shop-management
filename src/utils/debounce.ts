export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    // Nếu có timeout cũ đang chờ thì huỷ nó đi
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Thiết lập timeout mới
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
