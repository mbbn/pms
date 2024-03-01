export default class StringUtil{

    static hasText(object: any): boolean {
        return object != null && String(object).trim().length > 0;
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