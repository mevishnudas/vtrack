type parameters = {
    path:string,
    method:string,
    body:object,
    content_type?:string
};

const openRequest = async (params:parameters) =>{

    let response = {
        request:false,
        data:null
    }
    
    try {
        
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}`+params.path, {
            method: params.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params.body),
        });

        response.request = true;
        response.data = await res.json();
        
        return response;   

    } catch (err) {

        response.request = false;
        //response.data = err;

        return response;
    }

};

export {openRequest};