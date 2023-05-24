import req from './http'
export const getLotteryItems = () => {
  return req('get','GetItem.php')
}
export const getLotteryWinner = ()=> {
    return req('get','GetWinner.php')
}