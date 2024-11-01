export const submitContactForm = async (formData: any) => {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        ...formData
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to send message');
    return data;
  } catch (error) {
    throw error;
  }
}; 