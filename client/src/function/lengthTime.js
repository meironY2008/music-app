
const lengthTime = (length)=>{
    let second = length % 60;
    let minute =Math.floor( length / 60);
    if(second < 10){
        second="0"+second;
    }
    if(minute < 10){
        minute="0"+minute;
    }
    let lengthStr=minute+':'+second;
    return lengthStr;
}
export default lengthTime;