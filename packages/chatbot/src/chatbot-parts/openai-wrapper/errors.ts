const getOpenAIErrorMessage = (statusCode: number | undefined): string | undefined => {
  switch (statusCode) {
    case 400:
      return 'Invalid request. Check the request body, parameters of the request and the the length of the system prompt and messages.'
    case 401:
      return 'Invalid Authentication. Ensure the correct API key and requesting organization are being used. https://platform.openai.com/account/api-keys.'
    case 429:
      return 'Rate limit reached for requests. You are sending requests too quickly. https://platform.openai.com/docs/guides/rate-limits.'
    case 500:
      return 'The server had an error while processing your request. Retry your request after a brief wait and contact openAI if the issue persists. Check out the status page https://status.openai.com/.'
    default:
      return undefined
  }
}