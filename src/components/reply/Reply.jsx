import { useEffect, useState } from "react";
import axios from "../../api/axios.js"


const Reply = ({ reply }) => {

    const [ reply, setReply ] = useState({});

    useEffect(() => {

        if (!reply) {
            axios.get(`/respostas/${reply.id}`)
                .then(response => {
                    setReply(response.data);
                })
                .catch(error => {
                    console.error("Error fetching reply:", error);
                });
            setReply(reply);
        }

    })

    return (
        <div className="reply bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
            <div className="reply-header flex items-center justify-between mb-2">
                <span className="reply-author font-semibold text-blue-700">{reply.author}</span>
                <span className="reply-date text-xs text-gray-500">{new Date(reply.date).toLocaleString()}</span>
                <span className="reply-likes text-sm text-gray-600">Curtidas</span>
            </div>
        </div>
    )

}

export default Reply;