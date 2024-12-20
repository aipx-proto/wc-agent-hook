import { zodResponseFormat } from "https://esm.sh/openai@4.77.0/helpers/zod?bundle-deps";

export const agent = {
  getTools: () => [],
  getState: () => "",
};

window.agent = agent;

const toolMap = new Map();

window.addEventListener("message", async (event) => {
  const data = event.data;
  switch (data.type) {
    case "getTools":
      const tools = await agent.getTools();
      const serializableTools = [];
      tools.forEach((tool) => {
        const { run, ...rest } = tool;
        toolMap.set(rest.name, tool);

        const serializable = {
          ...rest,
          parameters: null,
          schema: zodResponseFormat(rest.parameters, rest.name).json_schema.schema,
        };

        serializableTools.push(serializable);
      });
      event.ports[0].postMessage(serializableTools);
      break;
    case "getState":
      const state = await agent.getState();
      event.ports[0].postMessage(state);
      break;
    case "run": {
      const toolName = data.name;
      const output = await toolMap.get(toolName).run(data.args);
      event.ports[0].postMessage(output);
      break;
    }
  }
});
