export async function loginApi(username: string, password: string) {
  try {
    // Simulated API call - replace with actual API endpoint
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data as LoginResponse;
  } catch (error) {
    return {
      status: 3 as const,
      message: '认证系统暂时无法访问',
    };
  }
}