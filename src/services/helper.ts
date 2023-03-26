class helper {

    parseCurrency(value: number = 0) {
        if (isNaN(value)) value = 0
        return Number(value.toFixed(2))
    }
    operatonByDirection = (direction: string) => direction === "long" ? 1 : -1;

}
export default new helper()
