class helper {

    parseCurrency(value: number = 0) {
        if (isNaN(value)) value = 0
        return Number(value.toFixed(2))
    }
}
export default new helper()