export const agent: AgentHook;

export interface AgentHook {
  getTools: () => AgentTool[] | Promise<AgentTool[]>;
  getState: () => string | Promise<string>;
  getHint: () => string | Promise<string>;
}

export interface AgentTool {
  name: string;
  description: string;
  /** zod object */
  parameters: OpenAICompatibleSchema;
  run: (params: any) => string | Promise<string>;
}

export type OpenAICompatibleSchema = Zod.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
