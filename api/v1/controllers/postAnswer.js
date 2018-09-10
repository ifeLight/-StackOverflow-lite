import db from '../../../config/db';

/* eslint-disable-next-line */
const postAnswer = function postAnAnswerController(req, res) {
  const userId = req.app.get('userId');
  const { content } = req.body;
  const { questionId } = req.params;

  if (!content) {
    return res.status(400).json({
      message: 'Answer can not be empty',
      success: false,
    });
  }

  if (!userId) {
    console.error('User id was not set');
    return res.status(500).json({
      message: 'An error encountered on the server',
      success: false,
    });
  }

  /* eslint-disable-next-line */
  (async () => {
    try {
      const checkQuery = 'SELECT * FROM questions WHERE question_id = $1';
      const checkResponse = await db.query(checkQuery, [questionId]);
      if (checkResponse.rows.length < 1) {
        return res.status(400).json({
          message: 'This question does not exist anymore',
        });
      }
      const insertQuery = 'INSERT INTO answers (content, question_id, user_id) VALUES ($1, $2, $3) RETURNING *';
      const resp = await db.query(insertQuery, [content, questionId, userId]);
      // console.log(resp.rows[0]);
      res.status(200).json({
        message: 'Answer successfully posted',
        data: resp.rows[0],
      });
    } catch (err) {
      throw err;
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

export default postAnswer;
