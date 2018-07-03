import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Question from './question';

function QuestionPage(props) {
  const { id, questions } = props;
  const question = questions[id];
  if(question == null) {
    return <Redirect from='*' to='/not-found' />
  }

  return (
    <div>
      <h3 className='center'>Question</h3>
      {question &&
        <Question question={question} />
      }
    </div>
  );
}

function mapStateToProps({ authedUser, questions }, props) {
  const { id } = props.match.params;
  console.log(props.match)
  return {
    id,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionPage);