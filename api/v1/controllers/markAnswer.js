import db from "../../../config/db"

const markAnswer = function markAnswerAsPreferredController (req, res) {
    const userId = req.app.get("userId");
    const { questionId, answerId} = req.params;

    if (!userId) {
        console.error("User id was not set");
        return res.status(500).json({
            message : "An error encountered on the server",
            success : false
        })
    }

    (async () => {
        const client = await db.connect()
        try {
            const isOwner = await client.query("SELECT user_id FROM questions WHERE question_id = $1", [questionId]);
            if (isOwner.rows.length < 1) { 
                return res.status(400).json({
                    message : "Question does not exist"
                })
            }
            
            if (isOwner.rows[0].user_id != userId) {
                return res.status(403).json({
                    message : "You are forbidden to set this answer as preferred"
                })
            }
            
            const answerExist = await client.query("SELECT * FROM answers WHERE answer_id = $1 AND question_id = $2", [answerId, questionId]);
            if (answerExist.rows.length < 1) {
                return res.status(400).json({
                    message : "The answer does not exist for this question"
                })
            }
            
            const insertresponse = client.query("UPDATE questions SET preferred_answer = $1 WHERE question_id = $2", [answerId, questionId])
            res.status(200).json({
                message : "Successfully set as preferred"
            })

        } catch (err) {
            throw err;
        } finally {
            client.release()
        }
    })()
    .catch((err) => {
        console.error(err);
        return res.status(500).json({
            message : "An error encountered on the server",
            success : false
        })
    })

}

export default markAnswer;