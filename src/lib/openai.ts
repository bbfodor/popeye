import OpenAI from 'openai';

// TODO -- implement some kind of caching here
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
