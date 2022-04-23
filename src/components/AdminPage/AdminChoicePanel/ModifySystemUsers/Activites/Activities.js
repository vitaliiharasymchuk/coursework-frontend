import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

const Activities = () => {

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    const activities = useLocation().state;


    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        window.print();
    }

    return (
        verify()?.result.role === 'admin' ?
            <div onClick={handleClick}>
                <h1>Дії користувачів :</h1>
                {activities.reverse().map(activity => {

                    return (<div>
                        <h4>{activity.name}</h4>
                        <p>{activity.description}</p>
                    </div>)
                })}
            </div>
            : <Redirect to='/' />
    )
}

export default Activities
