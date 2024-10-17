"use server";

export const fetcher = async (endpoint: string) => {
  try {
    const resp = await fetch(`${process.env.NEXTAUTH_URL}${endpoint}`, {
      credentials: "include",
    });
    if (!resp.ok) {
      throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    }
    console.log(resp);
    const receivedData = await resp.json();
    return receivedData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    console.log(`[ERROR in ${endpoint}]`, errorMessage);
    return { error: errorMessage };
  }
};
