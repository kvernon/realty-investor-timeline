const getNextExpire = (current: Date, cacheExpireDate: Date, advanceInMonths: number) => {
  if (!current) {
    return cacheExpireDate;
  }

  return new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + advanceInMonths, 1));
};

export interface IValueCache<T> {
  renewalInMonths: number;
  expireDate: Date;
  readonly newDefault: unknown;

  setValue(value: T[], currentDate: Date): void;

  /**
   * if the cache is expired, then it will return the default value. otherwise
   * it will return the stored value
   */
  getValue(currentTime: Date): T[];

  /**
   * determines if the expiredDate is greater than
   * or equal to currentDate. if this is the case it
   * will be return true. Also if expiredDate is nothing,
   * then it will return true. Also if currentDate is null,
   * while expiredDate exists then it will be expired, aka true
   * @param {Date|null|undefined} currentDate
   * @returns {boolean}
   */
  isCacheExpired(currentDate?: Date): boolean;
}

export class ValueCache<T> implements IValueCache<T> {
  renewalInMonths: number;

  get expireDate(): Date {
    return this._expireDate;
  }

  set expireDate(value: Date) {
    if (value) {
      value = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), 1));
    }
    this._expireDate = value;
  }

  get newDefault(): T[] {
    if (Array.isArray(this._defaultValue)) {
      return [...this._defaultValue];
    }

    return JSON.parse(JSON.stringify(this._defaultValue));
  }

  constructor(expireDate: Date, defaultValue: T[], renewalInMonths: number) {
    this._expireDate = expireDate;
    this._defaultValue = defaultValue;
    this.renewalInMonths = renewalInMonths;
    this._value = this.newDefault;
  }

  public setValue(value: T[], currentDate: Date): void {
    if (this.isCacheExpired(currentDate)) {
      this.expireDate = getNextExpire(currentDate, this.expireDate, this.renewalInMonths);
      this._value = this.newDefault;
    }

    this._value = value;
  }

  /**
   * if the cache is expired, then it will return the default value. otherwise
   * it will return the stored value
   */
  public getValue(currentTime: Date): T[] {
    if (!this.isCacheExpired(currentTime)) {
      return this._value;
    }

    this.setValue(this.newDefault, currentTime);
    return this._value;
  }

  /**
   * determines if the expiredDate is greater than
   * or equal to currentDate. if this is the case it
   * will be return true. Also if expiredDate is nothing,
   * then it will return true. Also if currentDate is null,
   * while expiredDate exists then it will be expired, aka true
   * @param {Date|null|undefined} currentDate
   * @returns {boolean}
   */
  public isCacheExpired(currentDate?: Date): boolean {
    if (!this.expireDate) {
      return false;
    }

    if (this.expireDate && !currentDate) {
      return true;
    }

    return this.expireDate.getTime() < currentDate.getTime();
  }

  protected _value: T[];
  private _expireDate: Date;
  private readonly _defaultValue: T[];
}
