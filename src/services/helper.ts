class helper {

    parseCurrency(value: number = 0, digitAfterComma: number = 6) {
        if (isNaN(value)) value = 0;

        const valueArr = value.toString().split(".");
        const fixedValue = valueArr[1] ? Number(valueArr[0] + "." + valueArr[1]?.substring(0, digitAfterComma)) : Number(valueArr[0])

        return fixedValue
        // let strArr = value.toString().split(".");
        // return Number(strArr[0] + "." + strArr[1].substring(0, 6))
    }
    operatonByDirection = (direction: string) => direction === "long" ? 1 : -1;

}
export default new helper()
