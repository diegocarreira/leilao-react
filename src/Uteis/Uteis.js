// ## Funções uteis
const Uteis = {};

Uteis.getDateNow = function() {
  console.log('getDateNow');
  let data = new Date();

  let yyyy = data.getFullYear()
  let mm = ((data.getMonth() + 1) < 10) ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1)
  let dd = (data.getDate() < 10) ? "0" + data.getDate() : data.getDate()

  return yyyy + '-' + mm + '-' + dd;
}

Uteis.dateDb2DateClient = function(data) {
  if(data){
    data = data.slice(0, 10).split('-');
    return data[2] + '/' + data[1] + '/' + data[0];
  }else{
    return null;
  }
}


export default Uteis;
