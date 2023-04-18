class helper {

    parseCurrency(value: number = 0) {
        if (isNaN(value)) value = 0
        return Number(value.toFixed(2))
        // let strArr = value.toString().split(".");
        // return Number(strArr[0] + "." + strArr[1].substring(0, 6))
    }
    operatonByDirection = (direction: string) => direction === "long" ? 1 : -1;

}
export default new helper()
