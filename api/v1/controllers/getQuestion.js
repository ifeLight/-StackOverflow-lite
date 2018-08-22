import db from "../../../config/db"
const getQuestion = function getQuestionController (req, res) {
    const { questionId } = req.params;

    let questionQuery = `SELECT q.question_id, u.display_name, u.user_id, q.content, q.title, u.email, q.created_on  FROM questions AS q
            INNER JOIN users AS u
            ON q.user_id = u.user_id
            WHERE q.question_id = $1
            LIMIT 1`;

    (async () => {
        const client = await db.connect()
        try {
            const questionResponse = await client.query(questionQuery, [questionId]);

            if (questionResponse.rows.length > 0) {
                res.status(200).json({
                    message : "Question fully fetched",
                    data : questionResponse.rows[0]
                })
            } else {
                res.status(400).json({
                    message : "Question with that ID don't exist",
                    data : null
                })
            }

        } catch (err) {
            throw err;
        } finally {
            client.release()
        }
    })()
    .catch((err) => {
        console.error(err);
        return res.status(500).json({
            message: "An error encountered on the server",
            success: false
        })
    })
}

export default getQuestion;