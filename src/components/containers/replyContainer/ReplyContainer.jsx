import { useEffect, useState } from "react";
import axios from "../../../api/axios.js";
import Reply from "../../reply/Reply.jsx";

const ReplyContainer = ({ questionId }) => {

    const [replies, setReplies] = useState({});

    useEffect(() => {

        axios.get(`/respostas/${questionId}`)
            .then(response => {
                setReplies(response.data);
            })
            .catch(error => {
                console.error("Error fetching replies:", error);
            });

    })

    return (
        <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 space-y-4">
            {replies.map((reply) => (
                <Reply reply={reply} />
            ))}
        </div>
    )

}

export default ReplyContainer;