import React from 'react'
import { useEffect, useState } from 'react'

const useCurrencyinfo = (currency) => {
    const [data, setData] = useState({})
    
    useEffect(() => {
        // Using a more reliable and updated API
        const fetchCurrencyData = async () => {
            try {
                // Option 1: Using exchangerate-api.com (free tier available)
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency.toUpperCase()}`)
                
                if (!response.ok) {
                    throw new Error('Failed to fetch currency data')
                }
                
                const result = await response.json()
                setData(result.rates || {})
                
            } catch (error) {
                console.error('Error fetching currency data:', error)
                
                // Fallback: Use a different API or provide default data
                try {
                    const fallbackResponse = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
                    const fallbackResult = await fallbackResponse.json()
                    setData(fallbackResult[currency.toLowerCase()] || {})
                } catch (fallbackError) {
                    console.error('Fallback API also failed:', fallbackError)
                    
                    // Ultimate fallback: provide some default exchange rates
                    const defaultRates = {
                        usd: currency.toLowerCase() === 'usd' ? 1 : 0.012,
                        inr: currency.toLowerCase() === 'inr' ? 1 : 83.12,
                        eur: currency.toLowerCase() === 'eur' ? 1 : 0.011,
                        gbp: currency.toLowerCase() === 'gbp' ? 1 : 0.0095,
                        jpy: currency.toLowerCase() === 'jpy' ? 1 : 1.78,
                        cad: currency.toLowerCase() === 'cad' ? 1 : 0.016,
                        aud: currency.toLowerCase() === 'aud' ? 1 : 0.018,
                    }
                    setData(defaultRates)
                }
            }
        }
        
        if (currency) {
            fetchCurrencyData()
        }
    }, [currency])
    
    console.log('Currency data:', data)
    return data
}

export default useCurrencyinfo