import {nodeListToArray} from './array';

export const $ = (selector: string) => {
  return nodeListToArray(document.querySelectorAll(selector))
}
