

export const moveRight=(productsNeedQnt ,setChangePosition,ChangePosition )=>{
    
    
if(productsNeedQnt.length -1 === ChangePosition )
 {
 
  return setChangePosition(0)
 }
 return setChangePosition(ChangePosition+1)

}
export const moveLeft=(productsNeedQnt ,setChangePosition,ChangePosition )=>{
    
  
if(ChangePosition === 0 )
 {
  return setChangePosition(productsNeedQnt.length - 1)
 }
 return setChangePosition(ChangePosition-1)

}