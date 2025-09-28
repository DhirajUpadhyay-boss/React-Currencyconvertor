import React, {useId} from 'react'

function InputBox({
    label,
    amount,
    onAmountchange,
    currencyDisable = false,
    amountDisable = false,
    onCurrencychange,
    currencyOption = [],
    selectCurrency = 'usd',
    className = "",
}) {
    const amountId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    value={amount || ''} // Handle undefined/null values
                    disabled={amountDisable}
                    onChange={(e) => onAmountchange && onAmountchange(Number(e.target.value) || 0)}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    disabled={currencyDisable}
                    onChange={(e) => onCurrencychange && onCurrencychange(e.target.value)}
                >
                    {/* Add a default option if no currencies are available */}
                    {currencyOption.length === 0 ? (
                        <option value="usd">Loading currencies...</option>
                    ) : (
                        currencyOption.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency.toUpperCase()}
                            </option>
                        ))
                    )}
                </select>
            </div>
        </div>
    );
}

export default InputBox;