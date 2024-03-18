// TODO -- include file size limit, etc. here
// Use strong types
export const PLANS = [
  // TODO -- think about OpenAI tokens
  // option for custom plan?
  {
    name: 'Free',
    slug: 'free',
    quota: 10,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  // TODO -- Rename 'Pro' to 'Advanced', and implement a Pro plan with 100 quota (unlimited?), LLM picker etc.
  // For this we need to:
  // - move off from Uploadthing, or increase the plan
  // - increase Pinecone plan / recreate Db
  // - Gemini Api
  {
    name: 'Pro',
    slug: 'pro',
    quota: 50,
    price: {
      amount: 10,
      priceIds: {
        test: 'price_1Ovlv1KIwILaJbyEwzq2tnrZ',
        production: '',
      },
    },
  },
];
