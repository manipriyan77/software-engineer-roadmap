function detectDataType(data){
   return Object.prototype.toString.call(data).slice(8,-1).toLocaleLowerCase()
}

detectDataType(new Date())