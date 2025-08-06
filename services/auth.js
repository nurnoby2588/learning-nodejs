const secionIdUserMap = new Map();

const setUser =  (id,user) => {
   
   return secionIdUserMap.set(id,user)
}
const getUser =  (id) => {
     
    return secionIdUserMap.get(id)
}
module.exports={
    setUser,
    getUser
}