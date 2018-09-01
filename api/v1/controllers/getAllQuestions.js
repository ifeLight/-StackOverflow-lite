import { isNumber } from 'util';
import db from '../../../config/db';

/* eslint-disable */
const getAllQuestions = function getAllQuestionsController (req, res) {
  /**
     * Accepting Sorting query
     * date : ASC or DESC, page : Number, limit : Number
     */
  const {
    date,
    page = 1,
    limit = 10,
  } = req.query;

  let query = `SELECT q.question_id, u.display_name, u.user_id, q.title, q.created_on  FROM questions AS q
            INNER JOIN users AS u
            ON q.user_id = u.user_id
            ORDER BY`;

  if (date && (date == 'ASC' || date == 'DESC')) {
    query = `${query } q.created_on ${date}`;
  } else {
    query += ' q.created_on ASC';
  }

  if ((page && isNumber(parseInt(page))) && (limit && isNumber(parseInt(limit)))) {
    const offset = limit * (page - 1);
    query = `${query} LIMIT ${limit.toString()} OFFSET ${offset.toString()}`;
  } else {
    return res.status(400).json({
      message: 'Unable to parse queries',
    });
  }

  (async () => {
    const client = await db.connect();
    try {
      // console.log(query);
      const resp = await client.query(query);
      res.status(200).json({
        page,
        limit,
        message: 'Questions successfully fetched',
        count: resp.rowCount,
        data: resp.rows,
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

export default getAllQuestions;
