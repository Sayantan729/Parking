export class AppUtility
{
   static formatDate(date:Date):string
  {
    return this.setSubscript(date.getDate()) + " " +this.pickMonth(date.getMonth())+", "+date.getFullYear() +" "+this.formatAMPM(date);
  }

  static setSubscript(num: number): string {
    if (num / 10 != 1) {
      if (num % 10 == 1) return num + ' st';
      if (num % 10 == 2) return num + ' nd';
      if (num % 10 == 3) return num + ' rd';
      return num + ' th';
    }
    return num + ' th';
  }

  static pickMonth(num:number):string{
    let arr=["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    return arr[num];
  }

  static formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}