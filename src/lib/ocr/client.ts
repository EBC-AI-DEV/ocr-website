export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
