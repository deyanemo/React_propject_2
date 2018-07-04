import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import {RECEIVE_QUESTIONS,ANSWER_QUESTION, ADD_QUESTION  } from './types'

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return function(dispatch, getState) {
    const { authedUser } = getState();

    const questionInfo = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    return saveQuestion(questionInfo)
      .then(function(question) { dispatch(addQuestion(question)) });
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion(question, answer) {
  return function(dispatch, getState) {
    const { authedUser } = getState();

    const answerInfo = {
      authedUser,
      qid: question.id,
      answer,
    };

    return saveQuestionAnswer(answerInfo)
      .then(function() { dispatch((answerQuestion(authedUser, question, answer))) })
  }
}
