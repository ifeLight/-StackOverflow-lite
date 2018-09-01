import { isNumber } from 'util';
import db from '../../../config/db';

/* eslint-disable */
const getAnswer =  function getAnswerController(req, res) {
  /**
     * Accepting Sorting query
     * date : ASC or DESC, page : Number, limit : Number
     */
  const {
    date,
    page = 1,
    limit = 10,
  } = req.query;

  const { questionId } = req.params;

  let answerQuery = `SELECT a.answer_id, u.display_name, u.user_id, a.content,  u.email, a.created_on 
            FROM answers AS a
            INNER JOIN users AS u
            ON a.user_id = u.user_id
            WHERE a.question_id = $1
            ORDER BY`;

  if (date && (date === 'ASC' || date === 'DESC')) {
    answerQuery = `${answerQuery} a.created_on ${date}`;
  } else {
    answerQuery += ' a.created_on ASC';
  }

  if ((page && isNumber(parseInt(page))) && (limit && isNumber(parseInt(limit)))) {
    const offset = limit * (page - 1);
    answerQuery = `${answerQuery} LIMIT ${limit.toString()} OFFSET ${offset.toString()}`;
  } else {
    return res.status(400).json({
      message: 'Unable to parse queries',
    });
  }

  (async () => {
    const client = await db.connect();
    try {
      const checkQuery = 'SELECT * FROM questions WHERE question_id = $1';
      const checkResponse = await client.query(checkQuery, [questionId]);
      if (checkResponse.rows.length < 1) {
        return res.status(400).json({
          message: 'This question does not exist anymore',
        });
      }
      const answerResponse = await client.query(answerQuery, [questionId]);

      return res.status(200).json({
        page,
        limit,
        count: answerResponse.rowCount,
        message: 'Answers fully fetched',
        data: answerResponse.rows,
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

export default getAnswer;
