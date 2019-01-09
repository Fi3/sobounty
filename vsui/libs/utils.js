import {compose, append, flatten, reduce} from 'ramda';

export const promisify = (f, ...args) => new Promise((res, rej) => f(args, res, rej));
export const appendSet = (el, list) => [...new Set(append(el, list))];
export const atLeastOne = (compare, list) => reduce((a, x) => compare(x) || a, false, list);
export const appendFlat = compose(flatten, append);
export const getJson = async(url) => {
  const res = await fetch(url);
  return await res.json();
};
