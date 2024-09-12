export const fetchRates = async () => {
    const API_KEY = 'EPJlYOzUARIFS7bzPgCnFGwM9BObRTMI';  // oma API key
    const apiUrl = `https://api.apilayer.com/exchangerates_data/latest?symbols=&base=EUR`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'apikey': API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
