import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import s from './GeneratedTicket.module.css';

function GeneratedTicket() {

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }


    const generatedTicket = useLocation().state;

    //console.log(useLocation());

    useEffect(() => {
        const timer = setTimeout(() => {
            window.print()
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        window.print();
    }

    return (
        verify()?.result.role === 'student' ?
            <div onClick={handleClick}>
                <div className={s.border}>
                    <h3>Перший рівень :</h3>
                    <strong>{generatedTicket.firstLevelQuestion.questionText}</strong>
                    <p><strong>A)</strong> {generatedTicket.firstLevelQuestion.answers.A}</p>
                    <p><strong>Б)</strong> {generatedTicket.firstLevelQuestion.answers.B}</p>
                    <p><strong>В)</strong> {generatedTicket.firstLevelQuestion.answers.C}</p>
                    <p><strong>Г)</strong> {generatedTicket.firstLevelQuestion.answers.D}</p>
                    <h3>Другий рівень :</h3>
                    <strong>{generatedTicket.secondLevelQuestion.questionText}</strong>
                    <p><strong>A)</strong> {generatedTicket.secondLevelQuestion.answers.A}</p>
                    <p><strong>Б)</strong> {generatedTicket.secondLevelQuestion.answers.B}</p>
                    <p><strong>В)</strong> {generatedTicket.secondLevelQuestion.answers.C}</p>
                    <p><strong>Г)</strong> {generatedTicket.secondLevelQuestion.answers.D}</p>
                    <h3>Третій рівень :</h3>
                    <strong>{generatedTicket.thirdLevelQuestion.questionText}</strong>
                    <p><strong>A)</strong> {generatedTicket.thirdLevelQuestion.answers.A}</p>
                    <p><strong>Б)</strong> {generatedTicket.thirdLevelQuestion.answers.B}</p>
                    <p><strong>В)</strong> {generatedTicket.thirdLevelQuestion.answers.C}</p>
                    <p><strong>Г)</strong> {generatedTicket.thirdLevelQuestion.answers.D}</p>
                    <h3>Четвертий рівень :</h3>
                    <strong>{generatedTicket.fourthLevelQuestion.questionText}</strong>
                    <p><strong>A)</strong> {generatedTicket.fourthLevelQuestion.answers.A}</p>
                    <p><strong>Б)</strong> {generatedTicket.fourthLevelQuestion.answers.B}</p>
                    <p><strong>В)</strong> {generatedTicket.fourthLevelQuestion.answers.C}</p>
                    <p><strong>Г)</strong> {generatedTicket.fourthLevelQuestion.answers.D}</p>
                </div>
            </div>
            : <Redirect to='/' />
    );
}

export default GeneratedTicket;
