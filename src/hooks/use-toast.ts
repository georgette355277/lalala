export function useToast() {
  return {
    toast: (data: any) => console.log(data),
    toasts: []
  }
}
