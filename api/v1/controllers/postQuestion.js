import db from "../../../config/db";
const postQuestion = function postAQuestionController (req, res) {
    const { title, content } = req.body;
    const userId = req.app.get("userId");
    if (!title || ! content) { 
        return res.status(400).json({
        message : "Question can not be empty",
        success : false
    })}

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
            let query = `INSERT INTO questions (title, content, user_id) VALUES ($1, $2, $3) RETURNING question_id`;
            const resp = await client.query(query, [title, content, userId]);
            res.status(200).json({
                message : "Question successfully uploaded",
                data : {
                createdOn : Date.now(),
                questionId : resp.rows[0].question_id,
                title,
                content
                }
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

export default postQuestion;