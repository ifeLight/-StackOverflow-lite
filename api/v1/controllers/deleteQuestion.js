import db from '../../../config/db';

const deleteQuestion = function deleteAQuestionController(req, res) {
  const { questionId } = req.params;
  const userId = req.app.get('userId');

  const deleteQuery = 'DELETE FROM questions WHERE question_id = $1';
  const deleteRelatedAnswers = 'DELETE FROM answers WHERE question_id = $1';
  const checkQuery = 'SELECT * FROM questions WHERE question_id = $1';

  /* eslint-disable-next-line */
(async () => {
    try {
      const checkResponse = await db.query(checkQuery, [questionId]);
      if (checkResponse.rows.length < 1) {
        return res.status(400).json({
          message: 'The question with such ID does not exist',
        });
      }

      if (checkResponse.rows[0].user_id !== userId) {
        return res.status(403).json({
          message: 'This user is not permitted to delete this message',
        });
      }

      await db.query(deleteRelatedAnswers, [questionId]);
      await db.query(deleteQuery, [questionId]);

      res.status(200).json({
        message: 'Question deleted successfully',
      });
    } catch (err) {
      throw err;
    }
  })()
    .catch((err) => {
      console.error(err.stack);
      return res.status(500).json({
        message: 'An error encountered on the server',
        success: false,
      });
    });
};

export default deleteQuestion;
