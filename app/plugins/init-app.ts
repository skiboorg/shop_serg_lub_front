//init app

export default defineNuxtPlugin({
  name: 'init-app',
  dependsOn: ['fetch'],
  parallel: true,
  async setup(app){
      const {$api} = useNuxtApp()
    const sessionUUID = useCookie('session_uuid')
      const cartCount = useState('cartCount')

    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
          /[xy]/g,
          function (c) {
            const r = (Math.random() * 16) | 0
            const v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
          }
      )
    }
    if (!sessionUUID.value) {
      sessionUUID.value = uuidv4()
    }

      cartCount.value = await $api.repo.cart({session_id:sessionUUID.value,method:'get'})
  }
});