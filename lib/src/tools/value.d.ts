/**
 * Useful class to deal with range numbers
 */
declare class RangeValue {
    private value;
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
    constructor(value?: string);
    /**
     * The the range value lower than the given value
     * @param value The result will be lower than this value
     * @param strict If strict, the given value will be excluded
     */
    lowerThan(value: number, strict?: boolean): this;
    /**
     * The the range value upper than the given value
     * @param value The result will be upper than this value
     * @param strict If strict, the given value will be excluded
     */
    upperThan(value: number, strict?: boolean): this;
    /**
     * Set the range value strictly equal to the given value
     */
    equalTo(value: number): this;
    render(): string;
    /**
     * Get the current formated value
     */
    get: () => string;
}
export { RangeValue };
