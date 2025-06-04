
export const useAuthStore = defineStore('auth', () => {

  const user = ref(null)

  return {
    user,
    }

})
