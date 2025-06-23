# Extending GCBASIC for Blockly: A Developer’s Guide

This guide explains how to extend GCBASIC for Blockly by editing the `custom_blocks.js` file to add new blocks and implement JavaScript for specific GCBASIC capabilities. The `custom_blocks.js` file exists specifically for this purpose, allowing developers to define custom blocks, code generators, and toolbox configurations without modifying the original HTML file (e.g., `GCBASIC_Blockly.html`). It uses the JavaScript API exclusively for block and toolbox definitions and is designed for developers familiar with Python. 

The guide provides steps to add blocks, update the toolbox programmatically in `custom_blocks.js`, use the Help for Syntax, and test changes. Code generation and event handlers (e.g., `onchange`) are defined within `Blockly.JavaScript.forBlock[]`.  The process involves working with JavaScript and Blockly’s framework to create custom blocks that generate GCBASIC code, compatible with microcontrollers such as PIC, AVR, and LGT.

## Prerequisites

To follow this guide, ensure you have:

- A text editor (e.g., GC Code) for editing JavaScript files.
- A very basic knowledge of JavaScript and Python (for programming logic and local testing).
- Access to the GCBASIC for Blockly source code, including the `custom_blocks.js` file, available via [GCBASIC Download](https://sourceforge.net/projects/gcbasic/).
- A local web server (e.g., Python’s `http.server`) to test changes in a browser.
- Some familiarity with Blockly’s JavaScript API for block and toolbox creation ([Blockly Developer Guide](https://developers.google.com/blockly/guides/create-custom-blocks/overview)).
- A browser with developer tools for debugging JavaScript.


## Understanding the Source Structure

GCBASIC for Blockly is a web-based tool built on Google’s Blockly framework, hosted in an HTML file with JavaScript for block definitions, toolbox configuration, and code generation. The key components relevant to this guide are:

- **HTML File**: The main file (e.g., `GCBASIC_Blockly.html`) loads Blockly and includes `custom_blocks.js`, which is always present in the project directory for extending functionality.
- **custom_blocks.js**: A dedicated JavaScript file where developers define custom blocks, code generators, and toolbox configurations to extend the tool’s capabilities. It includes a console log to confirm loading.
- **Toolbox Configuration**: Defined in JavaScript within `custom_blocks.js`, manipulating the `<xml id="toolbox">` element to add blocks to categories like `Commands`.
- **GCBASIC Code Generator**: JavaScript functions in `custom_blocks.js` within `Blockly.JavaScript.forBlock[]` that convert blocks to GCBASIC code, with all event handlers (e.g., `onchange`) defined in the same structure.

The `custom_blocks.js` file is the primary entry point for customization, designed to allow developers to add new blocks, code generators, and toolbox updates without touching other source files.

## Step 1: Setting Up the Development Environment

1. **Clone or Download the Source**:
   - Download the GCBASIC for Blockly source from [GitHub](https://github.com/GreatCowBASIC/Blockly).
   - Extract the files to a local directory (e.g., `gcbasic-blockly`).

2. **Set Up a Local Web Server**:
   - Use Python to serve the HTML file locally for testing.
   - Navigate to the project directory in a terminal and run:
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000/GCBASIC_Blockly.html` in a browser to view the GCBASIC for Blockly interface.

3. **Locate and Edit custom_blocks.js**:
   - Find the `custom_blocks.js` file in the project directory, typically alongside `GCBASIC_Blockly.html`.
   - Open the file in your text editor to add or modify blocks, code generators, and toolbox configurations.

## Step 2: Confirming custom_blocks.js is Loaded

To verify that `custom_blocks.js` is loaded correctly:

- Ensure `custom_blocks.js` includes a console log at the start:
  ```javascript
  console.log('custom_blocks.js loaded successfully.');
  ```
- Open the browser’s developer tools (F12, Console tab) after loading the page.
- Look for the message `custom_blocks.js loaded successfully.`. If missing, check:
  - The file path in the HTML’s `<script src="custom_blocks.js"></script>` tag matches the file’s location.
  - No JavaScript errors in the console prevent the file from loading.
  - The browser cache is cleared (Ctrl+Shift+R) to ensure the latest file is loaded.
  - You may see other messages or errors but you are looking for those related to to 'custom_blocks.js'.

## Step 3: Using the Help for Syntax

The GCBASIC Help for Syntax provides detailed documentation on commands, constants, and syntax for generating valid GCBASIC code. This is critical for creating blocks that produce correct microcontroller code.

- **Access the Help**:
  - Visit the [GCBASIC Blockly Guide](https://www.gcbasic.com/GCBASIC_Blockly_Guide.html) for an overview.
  - Refer to the [GCBASIC Help](http://gcbasic.sourceforge.net/help/) for detailed syntax, including commands like `SET`, `WAIT`, or `LCD`.
  - Example: For a block implementing the `SET PORTx.y ON` command, check the Help for the syntax: `SET PORTx.y ON` or `SET PORTx.y OFF`.

- **Using Syntax in Block Development**:
  - Match block inputs to GCBASIC syntax. For example, a `SET` command requires a port (e.g., `PORTB.0`) and a state (`ON` or `OFF`).
  - Use the Help to validate parameters, such as valid port names or timing values for `WAIT`.

- **Tips**:
  - Search the Help for microcontroller-specific details (e.g., PIC16F877A port configurations).
  - Note case sensitivity: GCBASIC commands are typically uppercase (e.g., `SET`, `WAIT`).

## Step 4: Adding New Blocks with the JavaScript API

Blocks are defined using Blockly’s JavaScript API in `custom_blocks.js`. Below is an example of creating a block for the GCBASIC `SET PORTx.y ON/OFF` command, which sets a microcontroller pin state.

1. **Define the Block**:
   - In `custom_blocks.js`, add or modify:
     ```javascript
      Blockly.Blocks['set_port'] = {
        init: function() {
          this.appendDummyInput()
              .appendField('SET')
              .appendField(new Blockly.FieldTextInput('PORTB.0'), 'PORT')
              .appendField(new Blockly.FieldDropdown([['ON', 'ON'], ['OFF', 'OFF']]), 'STATE');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip('Sets a microcontroller port pin to ON or OFF.');
          this.setHelpUrl('http://gcbasic.sourceforge.net/help/_SET.html');
          this.setColour(200); // Adds the color hue
          // Attach onchange here instead
          this.setOnChange(function(event) {
            if (!this.workspace) return; // avoid detached blocks
            var portValue = this.getFieldValue('PORT');
            if (!/^PORT[A-Z]\.\d+$/.test(portValue)) {
              this.setWarningText('Invalid port format. Use PORTx.y (e.g., PORTB.0).');
            } else {
              this.setWarningText(null);
            }
          });
        }
      };
     ```

2. **Generate GCBASIC Code and Define Events**:
   - Add the code generator and event handlers within `Blockly.JavaScript.forBlock['set_port']`:
     ```javascript
      // Define code generator and events for set_port
      Blockly.JavaScript.forBlock['set_port'] = function(block) {
        var port = block.getFieldValue('PORT');
        var state = block.getFieldValue('STATE');
        var code = 'SET ' + port + ' ' + state + '\n';
        return tab() + code;
      };

     ```

     The `tab()` maintains the level of indentation automatically.  See within the HTML source for example of complex indentation.

## Step 5: Updating the Toolbox in custom_blocks.js

The toolbox is configured programmatically in `custom_blocks.js` using the JavaScript API, allowing you to add new blocks to existing categories like `Constants` (colour `#4CAF50`).

1. **Add a Block to a Category**:
   - In `custom_blocks.js`, use the public utility function to add the block:
     ```javascript
        addBlockToToolbox(blockType, categoryName [, extraAttributes] ) 
     ```

   - In `custom_blocks.js`, specfic to the example add the block:
     ```javascript

        // Add set_port block to Commands category
        addBlockToToolbox('set_port', 'Commands');
     ```

2. **Benefits of JavaScript Toolbox Configuration**:
   - Centralizes all extensions (blocks, generators, toolbox) in `custom_blocks.js`.
   - Eliminates HTML modifications, streamlining development.
   - Supports dynamic toolbox updates (e.g., based on user settings or chip selection).

## Step 6: Testing Your Changes

1. **Run the Local Server**:
   - Ensure the Python server is running:
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000/GCBASIC_Blockly.html` in a browser.

2. **Test the Blocks and Toolbox**:
   - Verify the toolbox includes `set_port` in `Commands` (purple hue, TOOLBOX_COLOUR_COMMANDS ).
   - Drag blocks to the workspace and configure inputs (e.g., `PORTB.0` and `ON.
   - Check that event handlers (e.g., `onchange` warnings) trigger correctly (e.g., invalid port format).
   - Generate GCBASIC code and check the output (e.g., `SET PORTB.0 ON`).

3. **Debug Issues**:
   - Use browser developer tools (F12, Console tab) to check for JavaScript errors.
   - Confirm console logs show:
     ```
     custom_blocks.js loaded successfully.
     Adding block "set_port" to category "Commands".
     Block "set_port" added to "Commands".
     ```
   - Compare generated code with the [GCBASIC Help](http://gcbasic.sourceforge.net/help/) for accuracy.
   - If blocks appear black, ensure the `colour` attribute is set in the HTML (e.g., `<category name="Commands" colour="200">`).

4. **Test on a Microcontroller**:
   - Export the GCBASIC code.
   - Compile it using the GCBASIC IDE and upload to a microcontroller (e.g., PIC16F877A).
   - Test the behaviour (e.g., pin state changes).

## Step 8: Best Practices

- **Use the Help for Syntax**: Cross-reference the [GCBASIC Help](http://gcbasic.sourceforge.net/help/) to ensure valid GCBASIC code.
- **Keep Blocks Simple**: Match GCBASIC’s straightforward syntax with minimal inputs.
- **Validate Inputs**: Check ports, values, or units within `Blockly.JavaScript.forBlock[]` to prevent errors.
- **Document Blocks**: Include tooltips and help URLs linking to GCBASIC Help.
- **Manage Toolbox Dynamically**: Use the `addBlockToToolbox` utility to add blocks to categories with appropriate colours.
- **Define Events in forBlock**: Place all event handlers (e.g., `onchange`) within `Blockly.Block[]` for consistency.
- **Test Incrementally**: Test each block and toolbox change before adding more.
- **Engage with the Community**: Share extensions on the [GCBASIC  Developer Blockly Forum](https://github.com/GreatCowBASIC/Blockly).


## Step 9: Toolbox Category Colours

The toolbox categories and their colours, defined in the HTML’s `<xml id="toolbox">`, are as follows. Blocks inherit the colour of their parent category unless explicitly overridden:

- **Setup**: `#FFD700` (gold)
- **Constants**: `#4CAF50` (green)
- **Logic**: `#D1C4E9` (light purple)
- **Math**: `#2196F3` (blue)
- **Variables**: `#EF9A9A` (light red/pink)
- **Loops**: `#A5D6A7` (light green)
- **Text**: `#FFCA28` (yellow-orange)
- **Lists**: `#D4A017` (dark yellow)
- **Subroutines**: `#D7CCC8` (light brown)
- **Commands**: `200` (purple hue)
  - **Subcategory: Wait**: `200` (purple hue)
- **Containers**: `#64B5F6` (light blue)

Ensure the `colour` attribute is set correctly in the HTML (e.g., `<category name="Constants" colour="#4CAF50">`) to avoid blocks appearing black.

## Example: Adding a Complex Block

For a block supporting the GCBASIC `Print` command to display text on an LCD:

1. **Block Definition**:
   - Add to `custom_blocks.js`:
     ```javascript
      Blockly.Blocks['lcd_display'] = {
        init: function() {
          this.appendDummyInput()
              .appendField('LCD Print')
              .appendField(new Blockly.FieldTextInput('Hello'), 'TEXT');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setTooltip('Displays text on an LCD screen.');
          this.setHelpUrl('http://gcbasic.sourceforge.net/help/_LCD.html');
          this.setColour(TOOLBOX_COLOUR_COMMANDS);

          // Properly attach onchange handler
          this.setOnChange(function(event) {
            if (!this.workspace) return;
            var textValue = this.getFieldValue('TEXT');
            this.setWarningText(textValue.trim() === '' ? 'Text cannot be empty.' : null);
          });
        }
      };

     ```

2. **Code Generator and Events**:
   - Add to `custom_blocks.js`:
     ```javascript
     Blockly.JavaScript.forBlock['lcd_display'] = function(block) {
       var text = block.getFieldValue('TEXT');
       var code = 'Print ' + JSON.stringify(text) + '\n';
       return tab() + code;
     };
     ```

3. **Add to Toolbox**:
   - Append to the `Commands` category (colour `200`, purple hue):
     ```javascript
     addBlockToToolbox('lcd_display', 'Commands');
     ```

## Troubleshooting Common Issues

- **Toolbox Not Updating**: Check `custom_blocks.js` for correct `addBlockToToolbox` calls and verify `<xml id="toolbox">` in HTML.
- **Block Not Appearing**: Confirm the block type matches in `Blockly.Blocks` and `addBlockToToolbox`.
- **Block Appears Black**: Ensure the category has a valid `colour` attribute in HTML (e.g., `<category name="Constants" colour="#4CAF50">`).
- **Invalid Code Output**: Verify the generator in `Blockly.JavaScript.forBlock[]` aligns with GCBASIC syntax.
- **Event Handlers Not Triggering**: Confirm event handlers (e.g., `onchange`) are defined within `Blockly.JavaScript.forBlock[]`.
- **JavaScript Errors**: Debug syntax or reference errors in browser developer tools.
- **Microcontroller Failure**: Verify chip support and code compilation in the GCBASIC IDE.

## Resources

- [GCBASIC Help](http://gcbasic.sourceforge.net/help/) for command syntax.
- [GCBASIC Blockly Guide](https://www.gcbasic.com/GCBASIC_Blockly_Guide.html) for tool overview.
- [GCBASIC Blockly Examples](https://www.gcbasic.com/GCBASIC_Blockly_Examples.html) for sample projects.
- [GCBASIC Blockly Demos](https://www.gcbasic.com/GCBASIC_Blockly_Demos.html) for practical applications.
- [Blockly Developer Guide](https://developers.google.com/blockly/guides/create-custom-blocks/overview) for JavaScript API.
- [Blockly Developer Forum](https://groups.google.com/g/blockly) for community support.
- [GCBASIC Download](https://sourceforge.net/projects/gcbasic/) for source code.

This guide enables developers to extend GCBASIC for Blockly by editing the `custom_blocks.js` file, which is designed for adding custom blocks, code generators, and toolbox configurations using `Blockly.JavaScript.forBlock[]` for all code generation and event handling, with blocks inheriting colours from the toolbox categories.
