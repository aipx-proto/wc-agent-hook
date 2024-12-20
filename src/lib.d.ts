export const agent: AgentHook;

export interface AgentHook {
  getTools: () => AgentTool[] | Promise<AgentTool[]>;
  getState: () => string | Promise<string>;
}

export interface AgentTool {
  name: string;
  description: string;
  /** zod object */
  parameters: any;
  run: (params: any) => string | Promise<string>;
}
