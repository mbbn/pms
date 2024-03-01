export default class StringUtil{

    static hasText(object: any): boolean {
        return object != null && String(object).trim().length > 0;
    }

    /**
     * @param input input string
     * @return first letter of input string will be upper-cased.
     */
    static toFirstUpper(input: string): string {
        if (!StringUtil.hasText(input)) {
            return input;
        }
        return input.substring(0, 1).toUpperCase() + (input.length >= 1 ? input.substring(1) : '');
    }

    /**
     * @param {string} input input string
     * @return {string} first letter of input string will be lower-cased.
     */
    static toFirstLower(input: string): string {
        if (!StringUtil.hasText(input)) {
            return input;
        }
        return input.substring(0, 1).toLowerCase() + (input.length >= 1 ? input.substring(1) : '');
    }
}