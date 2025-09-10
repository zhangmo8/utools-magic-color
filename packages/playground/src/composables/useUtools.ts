export const useUtools = createGlobalState(() => {
  const isUtools = ref(!!window.utools)

  return {
    isUtools,
  }
})
