/**
 * generate-014-diagonal-tasks.js
 * 
 * A dedicated script to generate a -014 series of diagonal reflection tasks for each category.
 * This script focuses on creating tasks with higher non-zero density to make patterns more obvious.
 * It generates new task files without modifying any existing ones.
 * 
 * Author: Cascade
 * Created: June 28, 2025
 */

// ES Module imports
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the categories with their full names and codes
const categories = [
  { code: 'OS', fullName: '🛡️ O₂ Sensor Check' },
  { code: 'PL', fullName: '🚀 Pre-Launch Ops' },
  { code: 'FS', fullName: '⚡ Fuel Systems' },
  { code: 'NAV', fullName: '🧭 Navigation' },
  { code: 'COM', fullName: '📡 Communications' },
  { code: 'PWR', fullName: '⚡ Power Systems' },
  { code: 'SEC', fullName: '🔒 Security' }
];

// Define emoji sets for each category (matching what's in spaceEmojis.ts)
const categoryEmojiSets = {
  'OS': 'celestial_set2',
  'PL': 'celestial_set1',
  'FS': 'tech_set1',
  'NAV': 'celestial_set2',
  'COM': 'tech_set2',
  'PWR': 'tech_set1',
  'SEC': 'status_alerts'
};

/**
 * Create a random grid with numbers and higher non-zero density
 * @param {number} size Grid size
 * @param {number} minValue Minimum value (inclusive)
 * @param {number} maxValue Maximum value (inclusive)
 * @param {number} nonZeroProbability Probability (0-1) of generating non-zero values
 * @returns {Array<Array<number>>} Generated grid
 */
function createDenseGrid(size, minValue, maxValue, nonZeroProbability = 0.8) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      // Higher probability of non-zero values
      if (Math.random() < nonZeroProbability && minValue === 0) {
        // Generate value between minValue+1 and maxValue to ensure non-zero
        row.push(Math.floor(Math.random() * (maxValue - minValue)) + (minValue + 1));
      } else {
        // Generate value between minValue and maxValue
        row.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
      }
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
  const result = Array(size).fill().map(() => Array(size).fill(0));
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Transpose the grid (swap i,j with j,i)
      result[j][i] = grid[i][j];
    }
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
  const result = Array(size).fill().map(() => Array(size).fill(0));
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Reflect over secondary diagonal
      result[size - 1 - j][size - 1 - i] = grid[i][j];
    }
  }
  
  return result;
}

/**
 * Performs a basic validation of the task structure
 */
function validateTask(task) {
  // Basic validation to ensure required fields exist
  const requiredFields = [
    'id', 'title', 'description', 'category', 'difficulty', 
    'gridSize', 'emojiSet', 'input', 'expectedOutput', 
    'examples', 'hints', 'transformationType',
    'basePoints', 'requiredRankLevel'
  ];
  
  for (const field of requiredFields) {
    if (task[field] === undefined) {
      return { valid: false, errors: [`Missing required field: ${field}`] };
    }
  }
  
  // Check that input and expectedOutput are 2D arrays
  if (!Array.isArray(task.input) || !task.input.every(Array.isArray)) {
    return { valid: false, errors: ['Input must be a 2D array'] };
  }
  
  if (!Array.isArray(task.expectedOutput) || !task.expectedOutput.every(Array.isArray)) {
    return { valid: false, errors: ['ExpectedOutput must be a 2D array'] };
  }
  
  // Check examples
  if (!Array.isArray(task.examples) || task.examples.length === 0) {
    return { valid: false, errors: ['Task must have at least one example'] };
  }
  
  for (const example of task.examples) {
    if (!example.input || !example.output) {
      return { valid: false, errors: ['Each example must have input and output'] };
    }
  }
  
  return { valid: true };
}

/**
 * Saves a task to a JSON file
 */
function saveTask(task, taskId) {
  const tasksDir = path.join(__dirname, '../data/tasks');
  const taskPath = path.join(tasksDir, `${taskId}.json`);
  
  // Make sure directory exists
  if (!fs.existsSync(tasksDir)) {
    fs.mkdirSync(tasksDir, { recursive: true });
  }
  
  // Validate task using local validation
  const validationResult = validateTask(task);
  if (!validationResult.valid) {
    console.error(`❌ Task ${taskId} validation failed:`, validationResult.errors);
    return false;
  }
  
  // Write the task to file
  try {
    fs.writeFileSync(taskPath, JSON.stringify(task, null, 2), 'utf8');
    console.log(`✅ Task ${taskId} saved successfully`);
    return true;
  } catch (err) {
    console.error(`❌ Error saving task ${taskId}:`, err);
    return false;
  }
}

/**
 * Main function to generate all the -014 series diagonal reflection tasks
 */
async function generateSeries014Tasks() {
  console.log('Generating -014 series diagonal reflection tasks with higher pattern density...');
  
  // For each category, generate a -014 task
  for (const category of categories) {
    console.log(`\nProcessing category: ${category.code} (${category.fullName})`);
    
    // Generate a -014 task with primary diagonal reflection
    // Using 4x4 grid with digits 1-7 to ensure patterns are visible
    const taskId = `${category.code}-014`;
    const gridSize = 4;
    
    // Create input grid with very high non-zero density
    let inputGrid = createDenseGrid(4, 1, 7, 0.9); // 90% chance of non-zero values
    
    // Apply transformation
    let outputGrid = applyPrimaryDiagonalReflection(inputGrid);
    
    // Create separate test input/output for validation
    let testInputGrid = createDenseGrid(4, 1, 7, 0.9); // Create separate test grid
    let testOutputGrid = applyPrimaryDiagonalReflection(testInputGrid);
    
    // Generate examples with high non-zero density
    const examples = [];
    for (let i = 0; i < 3; i++) {
      const exampleInput = createDenseGrid(4, 1, 7, 0.9);
      const exampleOutput = applyPrimaryDiagonalReflection(exampleInput);
      examples.push({ input: exampleInput, output: exampleOutput });
    }
    
    // Create hints
    const hints = [
      "Imagine a line going from the top-left corner to the bottom-right corner of the grid ↘️. Flip the grid over this line.",
      "The top-right corner will swap with the bottom-left corner, like looking in a mirror diagonally.",
      "Notice how every number in row 1 moves to column 1, numbers in row 2 move to column 2, and so on."
    ];
    
    // Create task object with ALL required fields
    const task = {
      id: taskId,
      title: "Primary Diagonal Reflection - Dense Pattern",
      description: "Reflect the grid across the primary diagonal (top-left to bottom-right) with high-density non-zero values.",
      category: category.fullName,
      emojiSet: categoryEmojiSets[category.code],
      difficulty: 'Intermediate',
      gridSize: gridSize,
      timeLimit: null,
      basePoints: 100000,
      requiredRankLevel: 1, // Always set to 1 per schema.ts
      input: inputGrid,
      expectedOutput: outputGrid,
      testInput: testInputGrid,  // Use the prepared test input grid
      testOutput: testOutputGrid, // Use the prepared test output grid
      examples: examples,
      hints: hints,
      transformationType: 'primary_diagonal_reflection',
      generated: true
    };
    
    saveTask(task, taskId);
  }
  
  console.log('\nAll -014 series diagonal reflection tasks generated successfully!');
}

// Run the generation process
generateSeries014Tasks().catch(err => {
  console.error('Error generating tasks:', err);
  process.exit(1);
});
