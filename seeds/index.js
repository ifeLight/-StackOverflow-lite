import createAnswersTable from './answers';
import createCommentsTable from './comments';
import createQuestionsTable from './questions';
import createUsersTable from './users';
import createVotesTable from './votes';

(async () => {
  try {
    await createUsersTable;
    await createQuestionsTable;
    await createAnswersTable;
    await createCommentsTable;
    await createVotesTable;
  } catch (e) {
    throw e;
  }
})()
  .catch((e) => {
    console.error(e.stack);
  });
