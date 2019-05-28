class Resource {
  constructor(name, resource) {
    this.name = name;
    this.limit = 500;
    this.total = 0;
    this.unlock = resource.unlock;
    this.lockBy = resource.lockBy;
  }

  increment(number) {
    if (this.total === this.limit) {
      return;
    }

    this.total += number;

    if (this.total > this.limit) {
      this.total = this.limit;
    }
  }

  decrement(number) {
    if (this.total === 0 || this.total - number < 0) {
      return;
    }

    this.total -= number;
  }
}
export default Resource;
