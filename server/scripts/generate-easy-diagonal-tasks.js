/**
 * Easy task generator for diagonal reflection tasks with restricted number ranges
 * 
 * This script generates easier diagonal reflection tasks with restricted number ranges (0-4, 5-9, or 2-7)
 * and saves them with specific IDs (e.g., SEC-010, SEC-011).
 * 
 * @author Cascade
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create a random grid with numbers only from a specified range
 * @param {number} size Grid size
 * @param {number} minValue Minimum value (inclusive)
 * @param {number} maxValue Maximum value (inclusive)
 * @returns {Array<Array<number>>} Generated grid
 */
function createRestrictedGrid(size, minValue, maxValue) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      // Random integer between minValue and maxValue (inclusive)
      const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      row.push(value);
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Apply primary diagonal reflection (top-left to bottom-right)
 * @param {Array<Array<number>>} grid Input grid
 * @returns {Array<Array<number>>} Transformed grid
 */
function applyPrimaryDiagonalReflection(grid) {
  const size = grid.length;
  const result = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(grid[j][i]);
    }
    result.push(row);
  }
  return result;
}

/**
 * Apply secondary diagonal reflection (top-right to bottom-left)
 * @param {Array<Array<number>>} grid Input grid
 * @returns {Array<Array<number>>} Transformed grid
 */
function applySecondaryDiagonalReflection(grid) {
  const size = grid.length;
  const result = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(grid[size - 1 - j][size - 1 - i]);
    }
    result.push(row);
  }
  return result;
}

/**
 * Create task definition with restricted number ranges
 * @param {Object} category Category data
 * @param {string} transformationType Transformation type
 * @param {number} gridSize Grid size
 * @param {number} minValue Minimum value for grid numbers
 * @param {number} maxValue Maximum value for grid numbers
 * @param {string} id Task ID
 * @returns {Object} Task definition
 */
function createTaskDefinition(category, transformationType, gridSize, minValue, maxValue, id) {
  // Create an input grid with restricted numbers
  const input = createRestrictedGrid(gridSize, minValue, maxValue);
  
  // Apply the transformation to get the output
  const transformFn = transformationType === 'primary_diagonal_reflection' ?
    applyPrimaryDiagonalReflection : applySecondaryDiagonalReflection;
  const output = transformFn(JSON.parse(JSON.stringify(input))); // Deep clone
  
  // Create example pairs
  const example1Input = createRestrictedGrid(gridSize, minValue, maxValue);
  const example1Output = transformFn(JSON.parse(JSON.stringify(example1Input)));
  
  const example2Input = createRestrictedGrid(gridSize, minValue, maxValue);
  const example2Output = transformFn(JSON.parse(JSON.stringify(example2Input)));
  
  // Kid-friendly hints
  const hints = transformationType === 'primary_diagonal_reflection' ?
    [
      "Imagine a line going from the top-left corner to the bottom-right corner of the grid ↘️. Flip the grid over this line.",
      "The top-right corner will swap with the bottom-left corner, like looking in a mirror diagonally.",
      "Think about swapping rows and columns - the first row becomes the first column, the second row becomes the second column, and so on."
    ] :
    [
      "Imagine a line going from the top-right corner to the bottom-left corner of the grid ↙️. Flip the grid over this line.",
      "The top-left corner will swap with the bottom-right corner, like a different kind of mirror.",
      "Think of this as \"flipping the grid upside down\" and then \"flipping it left to right\" all at once."
    ];
  
  // Create the full task definition
  return {
    id: id,
    title: `Easy ${transformationType === 'primary_diagonal_reflection' ? 'Primary' : 'Secondary'} Diagonal Reflection Task`,
    description: `Reflect the grid across the ${transformationType === 'primary_diagonal_reflection' ?
      'primary diagonal (top-left to bottom-right)' :
      'secondary diagonal (top-right to bottom-left)'} using only numbers ${minValue}-${maxValue}.`,
    category: category.fullName,
    difficulty: "Basic",
    gridSize: gridSize,
    timeLimit: null,
    basePoints: 75, // Reduced points for easier task
    requiredRankLevel: 1,
    emojiSet: category.emojiSet,
    examples: [
      { input: example1Input, output: example1Output },
      { input: example2Input, output: example2Output }
    ],
    testInput: input,
    testOutput: output,
    hints: hints,
    transformationType: transformationType,
    generated: true
  };
}

/**
 * Save a task file to disk
 * @param {Object} task Task definition object
 * @param {string} taskId Task ID to use for filename
 */
function saveTask(task, taskId) {
  // Ensure the tasks directory exists
  const tasksDir = path.join(__dirname, '..', 'data', 'tasks');
  if (!fs.existsSync(tasksDir)) {
    fs.mkdirSync(tasksDir, { recursive: true });
  }
  
  // Create the full path for the task file
  const filePath = path.join(tasksDir, `${taskId}.json`);
  
  // Write the task to file
  fs.writeFileSync(filePath, JSON.stringify(task, null, 2));
  console.log(`✅ Task ${taskId} saved successfully`);
}

// Category mapping with proper full names and emoji sets
const categories = [
  { code: 'OS', fullName: '🛡️ O₂ Sensor Check', emojiSet: 'tech_set2' },
  { code: 'PL', fullName: '🚀 Pre-Launch Ops', emojiSet: 'celestial_set1' },
  { code: 'FS', fullName: '⚡ Fuel Systems', emojiSet: 'tech_set1' },
  { code: 'NAV', fullName: '🧭 Navigation', emojiSet: 'celestial_set2' },
  { code: 'COM', fullName: '📡 Communications', emojiSet: 'tech_set1' },
  { code: 'PWR', fullName: '⚡ Power Systems', emojiSet: 'tech_set2' },
  { code: 'SEC', fullName: '🔒 Security', emojiSet: 'status_alerts' }
];

// Define the number ranges to use
const numberRanges = [
  { min: 0, max: 4, name: 'lower' },
  { min: 5, max: 9, name: 'upper' }
];

/**
 * Main function to generate all the easy diagonal reflection tasks
 */
async function generateAllEasyTasks() {
  console.log('Generating easy diagonal reflection tasks...');
  
  // For each category, generate tasks
  for (const category of categories) {
    console.log(`\nProcessing category: ${category.code} (${category.fullName})`);
    
    // Generate primary diagonal reflection task with numbers 0-4
    const primaryTaskId = `${category.code}-010`;
    const primaryTask = createTaskDefinition(
      category,
      'primary_diagonal_reflection',
      3, // Use 3x3 grid for easier tasks
      0, // min value
      4, // max value
      primaryTaskId
    );
    saveTask(primaryTask, primaryTaskId);
    
    // Generate secondary diagonal reflection task with numbers 5-9
    const secondaryTaskId = `${category.code}-011`;
    const secondaryTask = createTaskDefinition(
      category,
      'secondary_diagonal_reflection',
      3, // Use 3x3 grid for easier tasks
      5, // min value
      9, // max value
      secondaryTaskId
    );
    saveTask(secondaryTask, secondaryTaskId);
    
    // Generate third task with numbers 0-2 on a 5x5 grid
    const thirdTaskId = `${category.code}-012`;
    const thirdTask = createTaskDefinition(
      category,
      'primary_diagonal_reflection', // Using primary diagonal for this set
      5, // Using 5x5 grid as specified
      0, // min value
      2, // max value - only digits 0-2
      thirdTaskId
    );
    saveTask(thirdTask, thirdTaskId);
  }
  
  console.log('\nAll easy diagonal reflection tasks generated successfully!');
}

// Run the generation process
generateAllEasyTasks().catch(err => {
  console.error('Error generating tasks:', err);
  process.exit(1);
});
