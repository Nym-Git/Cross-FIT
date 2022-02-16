export const getDataFROMls = () => {
    const data = localStorage.getItem('cart');
    if(data){
        return JSON.parse(data);
    }else{
        return []
    }
};
//not using
