import React, { useState, useEffect, useId } from 'react';

// --- Custom Hook: useCurrencyInfo ---
// Fetches currency conversion data from an API.
function useCurrencyInfo(currency) {
    // State to store the fetched currency data.
    const [data, setData] = useState({});

    // useEffect hook to perform the API call when the currency changes.
    useEffect(() => {
        // Fetching data from the currency API.
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json()) // Parsing the response as JSON.
            .then((res) => setData(res[currency])) // Updating the state with the relevant currency data.
            .catch((error) => console.error("Failed to fetch currency data:", error)); // Basic error handling
    }, [currency]); // Dependency array: re-run the effect if 'currency' changes.

    // Returning the fetched data.
    return data;
}


// --- UI Component: InputBox ---
// A reusable component for currency input fields.
function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = 'usd',
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    // useId hook to generate a unique ID for accessibility.
    const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    // Ensure onAmountChange is called only if it exists.
                    // Convert the input value to a Number.
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    // Ensure onCurrencyChange is called only if it exists.
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {/* Mapping over currency options to create dropdown items. */}
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}


// --- Main App Component ---
function App() {
    // State for the amount to be converted.
    const [amount, setAmount] = useState(1);
    // State for the source currency.
    const [from, setFrom] = useState('usd');
    // State for the target currency.
    const [to, setTo] = useState('inr');
    // State for the result of the conversion.
    const [convertedAmount, setConvertedAmount] = useState(0);

    // Fetching currency information using the custom hook.
    const currencyInfo = useCurrencyInfo(from);
    // Getting the available currency options from the fetched data.
    const options = Object.keys(currencyInfo);

    // Function to swap the 'from' and 'to' currencies.
    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    // Function to perform the currency conversion.
    const convert = () => {
        if (currencyInfo[to]) {
            setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
        }
    };
    
    // useEffect to run conversion whenever amount, from, to, or currencyInfo changes
    useEffect(() => {
        convert();
    }, [amount, from, to, currencyInfo]);


    return (
        <div
            className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            }}
        >
            <div className='w-full'>
                <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // The conversion now happens automatically, but we can keep this for manual trigger if needed.
                            convert();
                        }}
                    >
                        <div className='w-full mb-1'>
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable // This disables the amount input for the 'To' field.
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;