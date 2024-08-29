import * as types from '../Type/type';

export const getAllReq=()=>{
    return{
        type:types.GET_ALL_REQ
    }
}

export const getAllSuc=(data)=>{
    return{
        type:types.GET_ALL_SUC,
        payload:data
    }
}

export const getAllFail=(err)=>{
    return{
        type:types.GET_ALL_FAIL,
        payload:err
    }
}

export const getIdReq=(id)=>{
    return{
        type:types.GET_ID_REQ,
        payload:id,
    }
}

export const getIdSuc=(data)=>{
    return{
        type:types.GET_ID_SUC,
        payload:data
    }
}

export const getIdFail=(err)=>{
    return{
        type:types.GET_ID_FAIL,
        payload:err
    }
}

export const postReq=(data)=>{
    return{
        type:types.POST_REQ,
        payload:data
    }
}

export const postSuc=(data)=>{
    return{
        type:types.POST_SUC,
        payload:data
    }
}

export const postFail=(err)=>{
    return{
        type:types.POST_FAIL,
        payload:err
    }
}

export const updateReq=(data)=>{
    return{
        type:types.EDIT_REQ,
        payload:data
    }
}

export const updateSuc=(data)=>{
    return{
        type:types.EDIT_SUC,
        payload:data
    }
}

export const updateFail=(err)=>{
    return{
        type:types.EDIT_FAIL,
        payload:err
    }
}

export const deleteReq=(id)=>{
    return{
        type:types.DELETE_REQ,
        payload:id
    }
}

export const deleteSuc=(id)=>{
    return{
        type:types.DELETE_SUC,
        id:id,
    }
}

export const deleteFail=(err)=>{
    return{
        type:types.DELETE_FAIL,
        payload:err
    }
}




