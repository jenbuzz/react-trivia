import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classNames from 'classnames';
import Result from './Result';

const reorderAnswers = question => {
    const answers = [question.correct, ...question.incorrect];

    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const tmp = answers[i];
        answers[i] = answers[j];
        answers[j] = tmp;
    }

    return answers;
};

export default function QuestionBox({ questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const question = questions[currentQuestionIndex];
        setCurrentQuestion(question);
        setAnswers(reorderAnswers(question));
    }, [currentQuestionIndex]);

    const selectAnswer = answer => {
        setIsSubmitting(true);
        setSelectedAnswer(answer);

        if (answer === currentQuestion.correct) {
            setCountCorrectAnswers(countCorrectAnswers + 1);
        }

        setTimeout(() => {
            const newQuestionIndex = currentQuestionIndex + 1;

            if (newQuestionIndex === questions.length) {
                setIsDone(true);
            } else {
                setCurrentQuestionIndex(newQuestionIndex);
                setIsSubmitting(false);
                setSelectedAnswer(null);
            }
        }, 750);
    };

    if (isDone) {
        return <Result countCorrectAnswers={countCorrectAnswers} />;
    }

    return (
        <>
            <div>
                {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className="mb-4">
                <strong dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </div>
            <div>
                <ListGroup className={classNames({ disabled: isSubmitting })}>
                    {answers.map((a, i) => {
                        const isSelectedAndSubmitted = isSubmitting && a === selectedAnswer;

                        return (
                            <ListGroup.Item
                                key={i}
                                className={classNames({
                                    correct:
                                        isSelectedAndSubmitted && a === currentQuestion.correct,
                                    incorrect:
                                        isSelectedAndSubmitted && a !== currentQuestion.correct,
                                })}
                                onClick={() => selectAnswer(a)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: a }} />
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </>
    );
}
