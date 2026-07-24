export const formatReplies = (replies:number)=>{
    if(replies === 1) return `${replies} رد`
    if(replies === 2) return `ردان`
    if(replies >= 3 && replies <= 10) return `${replies} ردود`
    if(replies == 0) return`لا يوجد ردود`
    return `${replies} رد`
}