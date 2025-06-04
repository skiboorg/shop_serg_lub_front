
export function createBlankRepository(appFetch: typeof $fetch){

    return {
        categories(){
            return appFetch('/api/shop/categories')
        },
        products(){
            return appFetch('/api/shop/category/all')
        },
        styles(){
            return appFetch('/api/shop/styles')
        },
        style(slug){
            return appFetch(`/api/shop/style/${slug}`)
        },
        popular(){
            return appFetch('/api/shop/popular')
        },
        cart(params:{session_id:string,method:string,payload?:any}){
            if (params.method === 'get'){
                return appFetch('/api/cart/?session_id='+params.session_id)
            }else {
                return appFetch('/api/cart/?session_id='+params.session_id,{
                    method:params.method,
                    body:{...params.payload},
                })
            }

        },
        product(slug:string){
            return appFetch('/api/shop/product/'+slug,{})
        }
    }

}
