export const formatComments = (comments:number)=>{
    if(comments === 1) return `${comments} تعليق`
    if(comments === 2) return `تعليقان`
    if(comments >= 3 && comments <= 10) return `${comments} تعليقات`
    if(comments == 0) return`لا توجد تعليقات`
    return `${comments} تعليق`
}