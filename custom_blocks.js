/* toolbox category colours as available constants
    TOOLBOX_COLOUR_SETUP = '#FFD700'; // Gold
    TOOLBOX_COLOUR_CONSTANTS = '#4CAF50'; // Green
    TOOLBOX_COLOUR_LOGIC = '#D1C4E9'; // Light purple
    TOOLBOX_COLOUR_MATH = '#2196F3'; // Blue
    TOOLBOX_COLOUR_VARIABLES = '#EF9A9A'; // Light red/pink
    TOOLBOX_COLOUR_LOOPS = '#A5D6A7'; // Light green
    TOOLBOX_COLOUR_TEXT = '#FFCA28'; // Yellow-orange
    TOOLBOX_COLOUR_LISTS = '#D4A017'; // Dark yellow
    TOOLBOX_COLOUR_SUBROUTINES = '#D7CCC8'; // Light brown
    TOOLBOX_COLOUR_COMMANDS = '200'; // Purple hue
    TOOLBOX_COLOUR_WAIT = '200'; // Purple hue (same as Commands)
    TOOLBOX_COLOUR_CONTAINERS = '#64B5F6'; // Light blue
*/

// Confirm custom_blocks.js is loaded
console.log('custom_blocks.js loaded successfully.');

// Define the set_port block
Blockly.Blocks['set_port'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('SET')
        .appendField(new Blockly.FieldTextInput('PORTB.0'), 'PORT')
        .appendField(new Blockly.FieldDropdown([['ON', 'ON'], ['OFF', 'OFF']]), 'STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Sets a microcontroller port pin to ON or OFF.');
    this.setHelpUrl('http://gcbasic.sourceforge.net/help/_set.html');
    this.setColour(TOOLBOX_COLOUR_COMMANDS); // Adds the color hue
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

// Define code generator and events for set_port
Blockly.JavaScript.forBlock['set_port'] = function(block) {
  var port = block.getFieldValue('PORT');
  var state = block.getFieldValue('STATE');
  var code = 'SET ' + port + ' ' + state + '\n';
  return tab() + code;
};

// Add set_port block to Commands category
addBlockToToolbox('set_port', 'Commands');

Blockly.Blocks['lcd_display'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('LCD Print String')
        .appendField(new Blockly.FieldTextInput('Hello'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Displays text on an LCD screen.');
    this.setHelpUrl('https://gcbasic.sourceforge.io/help/_print.html');
    this.setColour(TOOLBOX_COLOUR_COMMANDS);

    // Properly attach onchange handler
    this.setOnChange(function(event) {
      if (!this.workspace) return;
      var textValue = this.getFieldValue('TEXT');
      this.setWarningText(textValue.trim() === '' ? 'Text cannot be empty.' : null);
    });
  }
};

Blockly.JavaScript.forBlock['lcd_display'] = function(block) {
  var text = block.getFieldValue('TEXT');
  var code = 'Print ' + JSON.stringify(text) + '\n';
  return tab() + code;
};
addBlockToToolbox('lcd_display', 'Commands');


