
import { useState, useEffect } from 'react';

const ConteoRegresivo = ({ targetDate }: { targetDate: Date }) => {
    const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime();
        let timeLeft: { days: number; hours: number; minutes: number; seconds: number } = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div className='Conteo'>
            <div className='Conteo_Content'>
                <div>
                    <span>{days}</span>
                    <h6>día</h6>
                </div>
                <div>
                    <span>{hours}</span>
                    <h6>horas</h6>
                </div>
                <div>
                    <span>{minutes}</span>
                    <h6>minutos</h6>
                </div>
                <div>
                    <span>{seconds}</span>
                    <h6>segundos</h6>
                </div>
            </div>
        </div>
    );
};

export default ConteoRegresivo;