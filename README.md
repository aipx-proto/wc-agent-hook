# WC Agent Hook

Agentic upgrade for any web page

## Get started

In your HTML, add the following script tag, before your main script tag:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.2/p5.js"></script>
<script src="https://esm.sh/gh/aipx-proto/wc-agent-hook@v1.0.0" type="module"></script>
<script type="module">
  // Your P5.js promgram goes here. You must use instance mode
</script>
```

In your main script, you can use `agent` and `z` object to expose tools and state for agent.

```js
let boxWidth = 100;
let boxHeight = 100;
let boxColor = "red";

/** The agent will call `getTools()` to see what tools it can use */
agent.getTools = () => {
  /** You can define a tool like this */
  const setSizeTool = {
    name: "setSize",
    description: "Set the size of box",
    parameters: z.object({
      size: z.number().min(0).max(100).description("Size of the box, in pixel"),
    }),
    run: ({ size }) => {
      /* Do something when a new size is set by the agent */
      boxWidth = size;
      boxHeight = size;

      /* Give text feedback to the agent */
      return `Size is updated to ${size}`;
    },
  };

  /** You can define another tool */
  const changeColorTool = {
    name: "changeColor",
    description: "Change the color of box",
    parameters: z.object({
      color: z.enum(["red", "green", "blue"]).description("Color of the box"),
    }),
    run: ({ color }) => {
      /* Do something when a new color is set by the agent */
      boxColor = color;

      /* Give text feedback to the agent */
      return `Color is updated to ${color}`;
    },
  };

  /** In the end, show all the tools to the agent by returning them */
  return [setSizeTool, changeColorTool];
};

/** The agent will call `getState()` to see what the current state is, which can inform its tool use */
agent.getState = () => {
  /** Return a string that describes the current state */
  return `
The current box looks like this:
width: ${boxWidth}
height: ${boxHeight} 
color: ${boxColor}
      `;
};
```

## `z` reference

`z` is used to describe the tool for the agent. You can learn more using its [Official Documentation](https://zod.dev/?id=basic-usage). In addition, you can start with JSON and convert it to zod with this [online tool](https://transform.tools/json-to-zod)
