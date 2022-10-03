/**
 * Useful class to deal with range numbers
 */
class RangeValue {
    private value: string
    /**
     * 
     * @param value The init value of this range number
     * @example
     * ```js
     * const nb     = new RangeValue("..2")
     *              = new RangeValue("6")
     *              = new RangeValue("..-25..")
     * ```
     */
    constructor(value?: string) {
        this.value = value || ""
    }

    /**
     * The the range value lower than the given value
     * @param value The result will be lower than this value
     * @param strict If strict, the given value will be excluded
     */
    lowerThan(value: number, strict?: boolean): this {
        if(strict) value--
        const isFixedValue = !this.value.includes('..')
        const isLowerValue = this.value.startsWith('..')
        if(isFixedValue || isLowerValue) this.value = `..${value}`
        else {
            const splitedValue = this.value.split('..')

            this.value = `${splitedValue[0]}..${value}`
        }
        return this
    }
    /**
     * The the range value upper than the given value
     * @param value The result will be upper than this value
     * @param strict If strict, the given value will be excluded
     */
    upperThan(value: number, strict?: boolean): this {
        if(strict) value++
        const isFixedValue = !this.value.includes('..')
        const isUpperValue = this.value.endsWith('..')
        if(isFixedValue || isUpperValue) this.value = `${value}..`
        else {
            const splitedValue = this.value.split('..')

            this.value = `${value}..${splitedValue[1]}`
        }
        return this
    }

    /**
     * Set the range value strictly equal to the given value
     */
    equalTo(value: number): this {
        this.value = value.toString()
        return this
    }

    render(): string {
        if(!this.value) throw new Error(`The value "${this.value}" isn't a valid value!`)
        return this.value
    }
    /**
     * Get the current formated value
     */
    get = this.render
}

export {RangeValue}