function stockBuySell(prices){
    let buy =prices[0]
    let profit =0
    for (let i = 1; i < prices.length; i++){
        if (prices[i]>buy && (profit < prices[i]-buy)){
            profit = prices[i] -buy
        }else if (prices[i]<buy){
            buy = prices[i]
        }
    }
    return profit
}

stockBuySell([7,6,4,3,1])