export async function fetchApi(
    url: string,
    method: string,
    body?: any,
    headers: HeadersInit = {
        'Content-Type': 'application/json',
    }
) {
    try {
        const res = await fetch (url, {
            method,
            body: JSON.stringify(body),
            headers,
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
}