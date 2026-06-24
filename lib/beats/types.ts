import type { ConversationBeat } from "../types.ts";

/** Partial override when referencing a library beat by id. */
export type BeatOverride = Partial<Pick<ConversationBeat, "intent" | "example">>;

/**
 * A beat reference — one of:
 * - string id into a BeatLibrary
 * - full inline ConversationBeat
 * - library id plus optional intent/example overrides
 */
export type BeatRef =
  | string
  | ConversationBeat
  | (BeatOverride & { id: string });

export type BeatLibrary = Record<string, ConversationBeat>;

function isInlineBeat(ref: BeatRef): ref is ConversationBeat {
  return typeof ref === "object" && "speaker" in ref && !("id" in ref);
}

function isOverrideBeat(
  ref: BeatRef,
): ref is BeatOverride & { id: string } {
  return typeof ref === "object" && "id" in ref;
}

/** Resolve beat references into a full ConversationBeat array. */
export function composeBeats(
  library: BeatLibrary,
  refs: BeatRef[],
): ConversationBeat[] {
  return refs.map((ref) => {
    if (typeof ref === "string") {
      const beat = library[ref];
      if (!beat) throw new Error(`Unknown beat: ${ref}`);
      return { ...beat };
    }
    if (isInlineBeat(ref)) {
      return { ...ref };
    }
    if (isOverrideBeat(ref)) {
      const { id, ...overrides } = ref;
      const beat = library[id];
      if (!beat) throw new Error(`Unknown beat: ${id}`);
      return { ...beat, ...overrides };
    }
    throw new Error("Invalid beat reference");
  });
}
