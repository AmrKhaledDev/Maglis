export const formatLikes = (likes:number)=>{
    if(likes === 1) return `${likes} إعجاب`
    if(likes === 2) return `إعجابان`
    if(likes >= 3 && likes <= 10) return `${likes} إعجابات`
    if(likes == 0) return`لا توجد إعجابات`
    return `${likes} إعجاب`
}