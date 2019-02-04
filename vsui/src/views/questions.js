import React from 'react'; // eslint-disable-line no-unused-vars
import type { Question } from '../../src/shrTypes';
import type { ComponentType } from 'react';
import { map } from 'ramda';

export const Rows = ({questions}: {questions: Array<Question>}): ComponentType =>
  QuestionTable(Body(questions), Head(['TITLE','STATE','BOUNTY']));

const QuestionTable = (body, head) => 
  <table class="table is-responsive" style={TableStyle}>
    <thead>
      <tr>
        {head}
      </tr>
    </thead>
    <tbody>
      {body}
    </tbody>
  </table>;

const Body = (questions: Array<Question>) =>
  map(question =>
    <tr>
      <a href={question.link}>
        <td>
          {question.title}
        </td>
      </a>
      <td>
        {question.state}
      </td>
      <td>
        {question.bounty}
      </td>
    </tr>
    , questions
  );

const Head = (fields) => map(field => <th>{field}</th>, fields);

const TableStyle =
  { maxWidth: '75%'
  , margin: 'auto'
  };
