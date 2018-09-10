
import db from '../../../config/db';

/* eslint-disable-next-line */
const getProfile = (req, res) => {
  const userId = req.app.get('userId');
  if (!userId) {
    console.error('User id was not set');
    return res.status(500).json({
      message: 'An error encountered on the server',
      success: false,
    });
  }
  (async () => {
    const client = await db.connect();
    try {
      const countAnswersQuery = 'SELECT COUNT(*) FROM answers WHERE user_id = $1';
      const countQuestionsQuery = 'SELECT COUNT(*) FROM questions WHERE user_id = $1';
      const recentQuestionsByUserQuery = `SELECT q.question_id, u.display_name, u.user_id, q.title, q.created_on  FROM questions AS q
          INNER JOIN users AS u
          ON q.user_id = u.user_id
          WHERE q.user_id = $1
          ORDER BY q.created_on DESC
          LIMIT 10`;
      const popularQuestionsByUserQuery = `SELECT q.question_id, u.display_name, u.user_id, q.title, q.created_on, (
            SELECT COUNT(*) FROM answers WHERE question_id = q.question_id
          ) AS no_answers FROM questions AS q
          INNER JOIN users AS u
          ON q.user_id = u.user_id
          WHERE q.user_id = $1
          ORDER BY no_answers DESC
          LIMIT 10`;
      const respAnswersNo = await client.query(countAnswersQuery, [userId]);
      const respQuestionsNo = await client.query(countQuestionsQuery, [userId]);
      const respRecentQuestions = await client.query(recentQuestionsByUserQuery, [userId]);
      const respPopularQuestions = await client.query(popularQuestionsByUserQuery, [userId]);
      res.status(200).json({
        message: 'Profile fully loaded',
        data: {
          answers_no: respAnswersNo.rows[0].count,
          questions_no: respQuestionsNo.rows[0].count,
          recent_questions: respRecentQuestions.rows,
          popular_questions: respPopularQuestions.rows,
        },
      });
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  })()
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: 'An error encountered on the server',
        success: false,
      });
    });
};

export default getProfile;
