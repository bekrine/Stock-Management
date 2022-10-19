


export const checkQntProduct=(state)=>{

    let QntState=state.filter(prod=>prod.Qnt <=10)
    if(QntState.length > 0){
        return QntState
    } return []
    
 
}