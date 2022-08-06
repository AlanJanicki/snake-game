export const debounce = (fn: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
};
