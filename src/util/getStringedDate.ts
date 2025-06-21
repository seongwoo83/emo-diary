export const getStringedDate:(targetDate:Date)=>string = (targetDate)=>{
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth()+1;
    const date = targetDate.getDate();

    return `${year}-${month < 10 ? "0"+String(month) : month }-${date < 10 ? "0"+String(date) : date}`
}