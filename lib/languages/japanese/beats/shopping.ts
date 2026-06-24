import { composeBeats } from "../../../beats/index.ts";
import type { BeatLibrary, BeatRef } from "../../../beats/index.ts";
import type { ConversationBeat } from "../../../types.ts";

/**
 * Reusable shopping beats for Japanese scenarios.
 * Reference by id in scenarios via `shoppingBeats(...)`.
 *
 * Namespaces:
 * - retail.*  — any shop (greet, bag, payment, browsing)
 * - konbini.* — convenience-store checkout
 * - clothing.* — apparel stores
 * - taxFree.* — visitor tax-free purchases
 * - drugstore.* — drugstore product advice
 */
export const SHOPPING_BEATS: BeatLibrary = {
  // --- retail (shared across shop types) ---
  "retail.greetOfferHelp": {
    speaker: "agent",
    intent: "Greet and offer assistance.",
    example: "いらっしゃいませ！何かお探しですか？",
  },
  "retail.greetAndScan": {
    speaker: "agent",
    intent: "Greet the customer and scan their item(s).",
    example: "いらっしゃいませ。こちらお預かりします。",
  },
  "retail.askBag": {
    speaker: "agent",
    intent: "Ask if they need a bag.",
  },
  "retail.userRespondBag": {
    speaker: "user",
    intent: "Respond about the bag.",
  },
  "retail.stateTotalPayment": {
    speaker: "agent",
    intent: "State the total and ask about payment method.",
  },
  "retail.confirmTotal": {
    speaker: "agent",
    intent: "Confirm the total.",
  },
  "retail.userDecidePayment": {
    speaker: "user",
    intent: "Decide how to pay.",
  },
  "retail.userPayAndThank": {
    speaker: "user",
    intent: "Pay and thank the cashier.",
  },
  "retail.justLooking": {
    speaker: "user",
    intent:
      "Politely say you're fine and just browsing — no help needed for now.",
    example: "大丈夫です、見ているだけです。ありがとうございます。",
  },
  "retail.acceptBrowsing": {
    speaker: "agent",
    intent: "Accept gracefully and invite you to browse at your own pace.",
    example: "かしこまりました。ごゆっくりどうぞ。",
  },
  "retail.seeOffWarmly": {
    speaker: "agent",
    intent: "See you off warmly and invite you to come back anytime.",
  },
  "retail.declineThisTime": {
    speaker: "user",
    intent:
      "Politely decline — it doesn't feel right this time — and thank them for their help.",
    example: "今回は大丈夫です。ありがとうございます。",
  },
  "retail.agentNoWorries": {
    speaker: "agent",
    intent:
      "Tell them no worries and invite them to come back if they want to try anything else.",
  },

  // --- konbini ---
  "konbini.askPointCard": {
    speaker: "agent",
    intent: "Greet the customer and ask if they have a point card.",
  },
  "konbini.userPointCardAndHeat": {
    speaker: "user",
    intent:
      "Respond about the point card and ask to have the bento heated.",
  },
  "konbini.ageConfirmation": {
    speaker: "agent",
    intent:
      "Ask the customer to confirm their age by tapping the button on the register screen.",
    example:
      "お酒が含まれていますので、画面のボタンで年齢確認をお願いします。二十歳以上の方は「はい」を押してください。",
  },
  "konbini.userConfirmAge": {
    speaker: "user",
    intent:
      "Confirm you understand and say you've pressed the age-confirmation button on the screen.",
  },

  // --- clothing ---
  "clothing.userAskSize": {
    speaker: "user",
    intent: "Say you like an item and ask if they have a different size.",
  },
  "clothing.checkStockOfferSize": {
    speaker: "agent",
    intent:
      "Check stock and offer to bring the right size or suggest another colour.",
  },
  "clothing.userDecideOnItem": {
    speaker: "user",
    intent:
      "Decide whether to take the item or pass, and thank them for the help.",
  },
  "clothing.userAskTryOn": {
    speaker: "user",
    intent: "Point out an item you like and ask if you may try it on.",
  },
  "clothing.directToFittingRoom": {
    speaker: "agent",
    intent:
      "Agree and direct you to the fitting room, or offer to bring a different size.",
  },
  "clothing.userTryOnReturn": {
    speaker: "user",
    intent: "Try on the item and return to the shop floor.",
  },
  "clothing.askHowItFits": {
    speaker: "agent",
    intent: "Ask how it fits and whether you'd like to take it.",
    example: "いかがですか？お気に入りですか？",
  },

  // --- tax-free ---
  "taxFree.greetBrowse": {
    speaker: "agent",
    intent: "Greet the customer and offer to help them browse.",
    example: "いらっしゃいませ！どのようなお時計をお探しですか？",
  },
  "taxFree.userAskPrice": {
    speaker: "user",
    intent: "Say you're interested in a specific item and ask the price.",
  },
  "taxFree.presentPrice": {
    speaker: "agent",
    intent:
      "Present the price and mention that tax-free shopping may be available for visitors.",
  },
  "taxFree.userAskEligibility": {
    speaker: "user",
    intent:
      "Ask whether the purchase qualifies for tax-free and what the tax-free price would be.",
  },
  "taxFree.explainEligibility": {
    speaker: "agent",
    intent:
      "Explain tax-free eligibility, passport requirement, and that the item must leave Japan.",
  },
  "taxFree.userConfirmPassport": {
    speaker: "user",
    intent:
      "Confirm you have your passport and ask about payment or warranty details.",
  },
  "taxFree.proceedPurchase": {
    speaker: "agent",
    intent:
      "Confirm documents needed, explain the tax-free procedure, and offer to proceed with purchase.",
  },

  // --- drugstore ---
  "drugstore.userAskHangoverHelp": {
    speaker: "user",
    intent:
      "Explain you have a drinking party tonight and want something for hangover prevention or recovery.",
  },
  "drugstore.recommendProducts": {
    speaker: "agent",
    intent:
      "Recommend popular options like ウコンの力 or ヘパリーゼ and explain whether to take before or after drinking.",
  },
  "drugstore.userCompareProducts": {
    speaker: "user",
    intent:
      "Ask about the difference between products or which is better for drinking tonight.",
  },
  "drugstore.compareBriefly": {
    speaker: "agent",
    intent:
      "Compare the products briefly — turmeric-based vs liver support — and mention how many to take.",
  },
  "drugstore.userAskPriceOptions": {
    speaker: "user",
    intent:
      "Ask about price, single-dose vs multi-pack, or whether there's a smaller trial size.",
  },
  "drugstore.showPriceOptions": {
    speaker: "agent",
    intent:
      "Give the price, show single and multi-pack options, and confirm which one you'd like.",
  },
  "drugstore.userChooseAndPay": {
    speaker: "user",
    intent: "Choose a product and proceed to pay.",
  },
};

/** Compose shopping beats from library refs, inline beats, or overrides. */
export function shoppingBeats(...refs: BeatRef[]): ConversationBeat[] {
  return composeBeats(SHOPPING_BEATS, refs);
}
