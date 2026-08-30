export class ListenerRegistry {
  constructor() {
    this.cleanups = [];
  }
  add(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    this.cleanups.push(() => target.removeEventListener(event, handler, options));
  }
  dispose() {
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
  }
}
