export const fetchData = async <T>(url: string): Promise<T> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Error fetching data');
    }
  };
  
  export const postData = async <T>(url: string, body: any): Promise<T> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Failed to post data to ${url}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Post error:', error);
      throw new Error('Error posting data');
    }
  };
  