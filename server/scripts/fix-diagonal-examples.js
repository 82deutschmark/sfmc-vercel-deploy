/**
 * Script to fix diagonal reflection examples in task files
 * 
 * This script repairs the examples in all diagonal reflection task files to ensure
 * they correctly demonstrate the intended transformation. Previously, the examples
 * contained unrelated random grids that didn't follow the transformation pattern.
 * 
 * @author Cascade
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Transformation functions - identical to those in batch-save-diagonal-tasks.js
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

// Clone a grid to avoid reference issues
function cloneGrid(grid) {
  return grid.map(row => [...row]);
}

// Function to fix a single task file
function fixTaskFile(filePath) {
  try {
    // Read the task file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const task = JSON.parse(fileContent);
    
    // Only process diagonal reflection tasks
    if (task.transformationType !== 'primary_diagonal_reflection' && 
        task.transformationType !== 'secondary_diagonal_reflection') {
      return false;
    }
    
    console.log(`Processing: ${filePath}`);
    
    // Fix each example by applying the correct transformation
    if (task.examples && Array.isArray(task.examples)) {
      task.examples.forEach((example, index) => {
        if (example.input) {
          const inputGrid = example.input;
          const transformFunction = task.transformationType === 'primary_diagonal_reflection' 
            ? applyPrimaryDiagonalReflection 
            : applySecondaryDiagonalReflection;
          
          // Apply the correct transformation to the input grid
          example.output = transformFunction(cloneGrid(inputGrid));
        }
      });
    }
    
    // Fix test case if present
    if (task.testInput) {
      const transformFunction = task.transformationType === 'primary_diagonal_reflection' 
        ? applyPrimaryDiagonalReflection 
        : applySecondaryDiagonalReflection;
      
      // Ensure test output correctly reflects the transformation of test input
      task.testOutput = transformFunction(cloneGrid(task.testInput));
    }
    
    // Write the updated task back to the file
    fs.writeFileSync(filePath, JSON.stringify(task, null, 2));
    console.log(`✅ Fixed examples in: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error);
    return false;
  }
}

// Main function to find and fix all diagonal reflection task files
async function fixAllDiagonalExamples() {
  console.log('Fixing diagonal reflection examples in task files...');
  
  const tasksDir = path.join(__dirname, '..', 'data', 'tasks');
  const files = fs.readdirSync(tasksDir);
  
  let fixedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  
  // Process all JSON files in the tasks directory
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(tasksDir, file);
      
      try {
        const result = fixTaskFile(filePath);
        if (result) {
          fixedCount++;
        } else {
          skippedCount++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        errorCount++;
      }
    }
  }
  
  console.log(`\nSummary:`);
  console.log(`  Total diagonal reflection tasks fixed: ${fixedCount}`);
  console.log(`  Skipped (non-diagonal tasks): ${skippedCount}`);
  console.log(`  Errors: ${errorCount}`);
}

// Run the fix
fixAllDiagonalExamples().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
});
