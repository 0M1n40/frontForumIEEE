import { useEffect, useState } from "react";
import axios from "../../api/axios.js"
import ReplyContainer from "../containers/replyContainer/ReplyContainer.jsx";

const Question = ({ question }) => {

    const [ question, setQuestion ] = useState({});

    useEffect(() => {

        if (!question) {
            axios.get(`/duvidas/${question.id}`)
                .then(response => {
                    setQuestion(response.data);
                })
                .catch(error => {
                    console.error("Error fetching question:", error);
                });
            setQuestion(question);
        }

    })

    return (
        <div className="question bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
            <div className="question-header flex items-center justify-between mb-2">
                <span className="question-author font-semibold text-blue-700">{question.author}</span>
                <span className="question-date text-xs text-gray-500">{new Date(question.date).toLocaleString()}</span>
                <span className="question-likes text-sm text-gray-600">Curtidas</span>
                <div>
                    <ReplyContainer questionId={question.id} />
                </div>
            </div>
        </div>
    )

}

export default Question;