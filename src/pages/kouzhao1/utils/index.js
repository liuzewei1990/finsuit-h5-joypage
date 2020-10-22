export default {
    /**创建用户参与状态 */
    createUserStatus (data = {}) {
        return {
            memberInvestStatus: data.memberInvestStatus,
            logisticsName: data.logisticsName,
            addressee: data.addressee,
            district: data.district,
            detailAddress: data.detailAddress,
            contactPhone: data.contactPhone,
            logisticsNumber: data.logisticsNumber,
            investRemainDay: data.investRemainDay,
        }
    }
}