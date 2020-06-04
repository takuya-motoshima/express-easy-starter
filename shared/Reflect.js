export default class {
  static getStaticMethods(clazz) {
    const methods = [];
    for(let obj = clazz; obj !== null && typeof obj.__proto__ === 'function'; obj = Object.getPrototypeOf(obj)) {
      let names = Object.getOwnPropertyNames(obj).filter(prop => {
        try {
          return typeof obj[prop] === 'function';
        } catch (ignore){}
        return false;
      });
      names.forEach(i => methods.push(i));
    }
    return methods;
  }
}