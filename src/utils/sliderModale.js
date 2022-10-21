

export const moveRight=(productsNeedQnt ,setChangePosition,ChangePosition )=>{
    
if(productsNeedQnt.length <= ChangePosition )
 {
 
  return setChangePosition(1)
 }
 return setChangePosition(ChangePosition+1)

}
export const moveLeft=(productsNeedQnt ,setChangePosition,ChangePosition )=>{
    
if(ChangePosition === 1 )
 {
 
  return setChangePosition(productsNeedQnt.length)
 }
 return setChangePosition(ChangePosition-1)

}