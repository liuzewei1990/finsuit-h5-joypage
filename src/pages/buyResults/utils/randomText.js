export default () => {
    let titleArr = [{
            maintitle: "给时间加点料，财富这点事儿，就是积累，银行存款稳健",
            subtitle: "现在拼团还有额外收益"
        },
        {
            maintitle: "存款，也要比比谁家银行的收益更高",
            subtitle: "现在拼团还有额外收益"
        },
        {
            maintitle: "年龄一同增长的，还有选择的艰难，和不确认性的恐惧",
            subtitle: "银行存款稳健，现在拼团还有额外收益"
        },
        {
            maintitle: "该培养存钱意识了，别做月光族，银行存款收益稳定",
            subtitle: "转入转出都方便，现在拼团还有额外收益"
        },
        {
            maintitle: "第一桶金可以现在开始积累，银行存款保障本金安全",
            subtitle: "现在拼团还有额外收益"
        },
        {
            maintitle: "不只拿“死工资”，多一种收入，从存款开始",
            subtitle: "现在拼团还有额外收益"
        }
    ]
    return titleArr[Math.floor(Math.random() * titleArr.length)];
}
