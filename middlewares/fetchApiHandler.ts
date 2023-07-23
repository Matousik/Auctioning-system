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
        console.log(data);
        return data;
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
}

export function handleFetchError (error: unknown) {
    if (error instanceof Error) {
        console.error(`Fetch error: ${error.message}`);
        console.error(`Stack trace: ${error.stack}`);
    } else {
        console.error(`Unknown error: ${error}`);
    }
}