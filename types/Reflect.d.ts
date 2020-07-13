export default class {
    /**
     * Return class method name
     *
     * @example
     * import { Reflect } from 'nodejs-shared';
     *
     * class Sample {
     *   public static func1 () {}
     *   public static func2 () {}
     *   private static func3 () {}
     *   private static func4 () {}
     *   public func5 () {}
     *   public func6 () {}
     *   private func7 () {}
     *   private func8 () {}
     * }
     *
     * // Return class method name
     * Reflect.getStaticMethods(Sample);// Set(4) { 'func1', 'func2', 'func3', 'func4' }
     */
    static getStaticMethods(clazz: any): Set<string>;
    /**
     * Returns the instance method name
     *
     * @example
     * import { Reflect } from 'nodejs-shared';
     *
     * class Sample {
     *   public static func1 () {}
     *   public static func2 () {}
     *   private static func3 () {}
     *   private static func4 () {}
     *   public func5 () {}
     *   public func6 () {}
     *   private func7 () {}
     *   private func8 () {}
     * }
     *
     * const sample = new Sample();
     *
     * // Returns the instance method name
     * Reflect.getMethods(sample);// Set(5) { 'constructor', 'func5', 'func6', 'func7', 'func8' }
     */
    static getMethods(instance: any): Set<string>;
}
