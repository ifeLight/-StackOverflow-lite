import createAnswersTable from './answers';
import createCommentsTable from './comments';
import createQuestionsTable from './questions';
import createUsersTable from './users';
import createVotesTable from './votes';

const createTables = async () => {
  try {
    /* eslint-disable no-unused-vars */
    const userTable = await createUsersTable();
    console.log('User Table Initialized');
    const questionTable = await createQuestionsTable();
    console.log('Question Table Initialized');
    const answerTable = await createAnswersTable();
    console.log('Answers Table Initialized');
    const commentsTable = await createCommentsTable();
    console.log('Comments Table Initialized');
    const VotesTable = await createVotesTable();
    console.log('Votes Table Initialized');
  } catch (e) {
    throw e;
  }
};

export default createTables;
