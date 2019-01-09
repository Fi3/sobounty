/* @flow */

import type { Question } from '../src/shrTypes.js';
import { getJson } from '../libs/utils.js';
import { join, map, toString, prop} from 'ramda';

const url = 'https://api.stackexchange.com/2.2/';
const urlEnd = '?order=desc&sort=activity&site=stackoverflow';
const joinArgs = (args: Array<string>): string => join('%3B', args);

// PARSERS

const parseQuestion = (result): Question => {
  return(
    { creation_date: result.creation_date
    , question_id: result.question_id
    , link: result.link
    , state: 'NOTKNOW'
    , bounty: 'NOTKNOW'
    , title: result.title
    }
  );
};

// FETCHERS
export const fetchQuestions = async(ids: Array<number>) => {
  const strIds = map(toString, ids);
  const res = await getJson(`${url}questions/${joinArgs(strIds)}/${urlEnd}`);
  return map(parseQuestion, prop('items', res));
}; 
