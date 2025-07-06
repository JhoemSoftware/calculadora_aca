import React, { useState, ChangeEvent, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface ApiResponse {
    resultado?: number;
    error?: string;
}

const App: React.FC = () => {
    const [displayValue, setDisplayValue] = useState<string>('0');
    const [storedValue, setStoredValue] = useState<number | null>(null);
    const [currentOperator, setCurrentOperator] = useState<string | null>(null);
    const [isOn, setIsOn] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOn) {
            setDisplayValue('');
            setStoredValue(null);
            setCurrentOperator(null);
            setError(null);
        }
    }, [isOn]);

    const handleNumberInput = (num: string) => {
        if (!isOn) return;

        setDisplayValue(prev =>
            prev === '0' || currentOperator === '=' ? num : prev + num
        );
        if (currentOperator === '=') {
            setCurrentOperator(null);
        }
    }

    const handleOperator = (operator: string) => {
        if (!isOn) return;

        if (operator === '=') {
            calculateResult();
            return;
        }

        setStoredValue(parseFloat(displayValue));
        setCurrentOperator(operator);
        setDisplayValue('0');
    };

    const calculateResult = async () => {
        if (!storedValue || !currentOperator) return;

        try {
            const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

            const response = await fetch(`${apiUrl}/calcular`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num1: storedValue,
                    num2: parseFloat(displayValue),
                    operador: currentOperator
                })
            });

            console.log('URL API en producción:', import.meta.env.VITE_API_URL);

            const data: ApiResponse = await response.json();

            if (response.ok) {
                setDisplayValue(data.resultado?.toString() || '0');
                setCurrentOperator('=');
                setError(null);
            } else {
                setError(data.error || 'Error desconocido');
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    const handleClear = () => {
        if (!isOn) return;
        setDisplayValue('0');
        setStoredValue(null);
        setCurrentOperator(null);
    };

    const handleDecimal = () => {
        if (!isOn) return;
        if (!displayValue.includes('.')) {
            setDisplayValue(prev => prev + '.');
        }
    };

    const handleBackspace = () => {
        if (!isOn) return;
        setDisplayValue(prev =>
            prev.length > 1 ? prev.slice(0, -1) : '0'
        );
    };

    return (
        <>
            <figure>
                <img src="./rust.png" alt="Logo Rust" id='logoRust' />
            </figure>

            <div className="calculator">
                <div className={`pantalla ${isOn ? 'encendido' : 'apagado'}`}>
                    <p>{error || displayValue}</p>
                </div>

                <div className="row">
                    <div className="col-8 numbers-keys">
                        <div className="row justify-content-center">
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('1')}>1</button>
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('2')}>2</button>
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('3')}>3</button>
                        </div>
                        <div className="row justify-content-center">
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('4')}>4</button>
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('5')}>5</button>
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('6')}>6</button>
                        </div>
                        <div className="row justify-content-center">
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('7')}>7</button>
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('8')}>8</button>
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('9')}>9</button>
                        </div>
                        <div className="row justify-content-center">
                            <button className="btn btn-secondary col-3" onClick={() => handleNumberInput('0')}>0</button>
                            <button className="btn btn-secondary col-3" onClick={handleDecimal}>,</button>
                            <button className="btn btn-secondary col-3" onClick={handleBackspace}>&lt;&lt;</button>
                        </div>
                    </div>

                    <div className="col-4 operators-keys">
                        <div className="row justify-content-evenly">
                            <div className="row col-5">
                                <button className="btn btn-warning" onClick={() => handleOperator('+')}>+</button>
                                <button className="btn btn-warning" onClick={() => handleOperator('-')}>-</button>
                                <button className="btn btn-warning" onClick={() => handleOperator('*')}>×</button>
                                <button className="btn btn-warning" onClick={() => handleOperator('/')}>÷</button>
                            </div>
                            <div className="row col-5 align-self-end">
                                <button className="btn btn-warning" onClick={handleClear}>C</button>
                                <button className="btn btn-danger mb-4" style={{ height: '110px' }} onClick={() => handleOperator('=')}>=</button>
                                <div className="form-check form-switch ms-lg-1">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={isOn}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsOn(e.target.checked)}
                                    />
                                    <small className="text-info">ON</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;