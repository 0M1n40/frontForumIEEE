import { useState, useEffect } from 'react';
import axios from '../../../api/axios.js';
import Question from '../../question/Question.jsx';

const QuestionContainer = () => {

    const [questions, setQuestions] = useState({});

    useEffect(() => {
        axios.get('/duvidas')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error("Error fetching question:", error);
            });

    })

    return (
        <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 space-y-4">
            {questions.map((question) => (
                <Question question={question} />
            ))}
        </div>
    )

}

export default QuestionContainer;