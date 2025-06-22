# Mission Control 2045

A Space Force-themed ARC-AGI puzzle game where cadets complete operational tasks to advance through enlisted ranks.

## ARC-AGI Framework

The Abstract and Reasoning Corpus for Artificial General Intelligence (ARC-AGI) is a benchmark designed to measure intelligence. This project leverages puzzles and logic from:

- Official ARC Prize: https://arcprize.org/arc-agi
- Puzzle datasets: https://github.com/arcprize/ARC-AGI-2/tree/main/data
- Reference: https://github.com/fchollet/ARC-AGI

## Architecture Overview

### System Design
- **Frontend**: React + TypeScript with Vite
- **Backend**: Express.js with TypeScript
- **Storage**: In-memory with modular JSON task loading
- **UI**: Tailwind CSS + shadcn/ui components  (This is just for the prototype)

### Directory Structure
```
├── client/                 # Frontend React application
│   └── src/
│       ├── components/     # Reusable UI components
│       │   ├── game/       # Game-specific components
│       │   └── ui/         # Base UI components (shadcn)
│       ├── constants/      # Emoji sets and game constants
│       ├── pages/          # Route components
│       └── types/          # TypeScript type definitions
├── server/                 # Backend Express application
│   ├── cli/                # CLI utilities (task generation, etc.)
│   ├── data/
│   │   └── tasks/          # Individual JSON task files
│   ├── templates/          # Task and story templates
│   │   ├── generators/
│   │   ├── categories.ts
│   │   ├── transformations.ts
│   │   └── validators.ts
│   ├── tools/              # Code-generation helpers
│   │   ├── task-factory.ts
│   │   └── story-factory.ts   # Narrative wrapper (NEW)
│   ├── services/           # Business logic services
│   ├── tests/              # Automated backend tests
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API route handlers
│   └── storage.ts          # Data storage interface
├── docs/                   # Technical and design documentation
│   └── story_wrapper_system_plan.md   # Narrative wrapper plan (NEW)
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema and types
└── README.md               # This file
```

## Task System Architecture

### Transformation System

#### Available Transformations
1. **Geometric Transformations**
   - `horizontal_reflection`: Flip grid left-to-right
   - `vertical_reflection`: Flip grid top-to-bottom (NEW)
   - `rotation_90deg`: Rotate grid 90° clockwise
   - `rotation_270deg`: Rotate grid 270° clockwise (replaces object_counting)

2. **Logical Transformations**
   - `pattern_completion`: Complete the pattern in the grid

#### Transformation Properties
Each transformation includes:
- Unique type identifier
- Name and description
- Category (geometric/logical)
- Difficulty level
- Hint patterns
- Associated grid generator

### Task Generation

#### CLI Commands
```bash
# Generate a single task
npx tsx server/cli/generate-task.ts single -c CATEGORY -t TRANSFORMATION -s SIZE -o OUTPUT_FILE

# Example: Generate SEC task with vertical reflection
npx tsx server/cli/generate-task.ts single -c SEC -t vertical_reflection -s 4 -o server/data/tasks/SEC-100.json
```

#### Task Generation Process
1. Selects transformation type based on category
2. Generates appropriate grid examples
3. Applies story wrapper with Space-Force theme
4. Validates the task
5. Saves to specified location

### Modular Task Loading
Tasks are stored as individual JSON files in `server/data/tasks/` for easy maintenance and scalability. The time limit on all tasks should be null unless otherwise specified.

#### Task File Structure
```json
{
  "id": "OS-001",
  "title": "Oxygen Sensor Calibration",
  "description": "Task description for context",
  "category": "🛡️ O₂ Sensor Check",
  "difficulty": "Basic",
  "gridSize": 2,
  "timeLimit": null,
  "basePoints": 350,
  "requiredRankLevel": 1,
  "emojiSet": "status_main",
  "examples": [
    {
      "input": [[0, 1], [1, 0]],
      "output": [[1, 0], [0, 1]]
    }
  ],
  "testInput": [[0, 1], [1, 0]],
  "testOutput": [[1, 0], [0, 1]],
  "hints": [
    "Progressive hint 1",
    "Progressive hint 2", 
    "Final solution hint"
  ]
}
```

### Emoji Set System
Emoji sets follow ARC-AGI (Abstract and Reasoning Corpus for Artificial General Intelligence) conventions with exactly 10 emojis per set, mapping to numerical indices 0-9.

#### Available Emoji Sets
- `status_main`: Basic status indicators
- `tech_set1`: Power and Fuel systems
- `tech_set2`: Communication systems
- `celestial_set1`: Planetary bodies
- `celestial_set2`: Stellar objects
- `nav_alerts`: Navigation vectors
- `status_alerts`: Warning systems
- `weather_climate`: Atmospheric conditions

## Game Mechanics

### Rank Progression
Players advance through Space Force enlisted ranks by earning points:
- Specialist 1-4 (E-1 to E-4)
- Sergeant (E-5)
- Staff Sergeant (E-6)
- Technical Sergeant (E-7)
- Master Sergeant (E-8)
- Senior Master Sergeant (E-9)
- Chief Master Sergeant (E-10)

### Task Categories
- **🛡️ O₂ Sensor Check**: Oxygen system diagnostics (OS-XXX)
- **🚀 Pre-Launch Ops**: Launch preparation tasks (PL-XXX)
- **⚡ Fuel Systems**: Fuel flow and mixture analysis (FS-XXX)
- **🧭 Navigation**: Directional calibration (NAV-XXX)
- **📡 Communications**: Communication systems (COM-XXX) 
- **⚡ Power Systems**: Power flow and distribution (PWR-XXX)
- **🔒 Security**: Security systems (SEC-XXX)

### Timer System
- **Speed Bonus**: Tasks count up, rewarding faster completion
- **Time Limited**: Limits are all set to null for development, but can be added for expanded difficulty and point rewards.

## Development Guidelines

### Task Generation Tools

The project includes CLI tools for generating puzzle tasks programmatically:

```powershell
# Generate a single task
npx tsx server\cli\generate-task.ts single -c <CATEGORY> -t <TRANSFORMATION> -s <SIZE> -o <OUTPUT_PATH>

# Generate all tasks for a category
npx tsx server\cli\generate-task.ts category -c <CATEGORY> -o <OUTPUT_DIR>

# Generate all tasks for all categories
npx tsx server\cli\generate-task.ts all -o <OUTPUT_DIR>

# List available categories and transformations
npx tsx server\cli\generate-task.ts list
```

Parameters:
- `-c, --category`: Category code (e.g., COM, NAV, FS)
- `-t, --transformation`: Transformation type (e.g., horizontal_reflection, rotation_90deg)
- `-s, --size`: Grid size (2-4)
- `-d, --difficulty`: Difficulty level (Basic, Intermediate, Advanced)
- `-o, --output`: Output file or directory

See the comprehensive guide in `docs/task_generation_guide.md` for more details.

### Adding New Tasks
1. Create a new JSON file in `server/data/tasks/`
2. Follow the task file structure above
3. **IMPORTANT**: Use numbers 0-9 in the logic/data files, not emojis
4. Emojis are only mapped in the UI layer using `client/src/constants/spaceEmojis.ts`
5. Test the task transformation logic
6. Add progressive hints for player assistance

### Standard for Puzzle Representation
- **Logic/Data Files**: Always use integers 0-9 in data files (input, output arrays)
- **UI Rendering**: Numbers are mapped to emojis only during rendering

- The app should be able to import standard ARC-AGI files like those from the official repositories
- Note: Existing files in the tasks folder may use emojis directly, but all new files should follow the standard integer format

### SOURCE Emoji Sets
1.  `client/src/constants/spaceEmojis.ts` is the source of truth for emoji mapping!!
2. Maintain exactly 10 emojis per set
3. Keep index 0 as `⬛` (black background)
4. `EMOJI_SET_INFO` is the source of truth for emoji set metadata!!

### SOURCE Task Sets 
1. Tasks should have their transformation types in the description
2. This allows for 40 different types of task in each category.

### Ready-to-Use Template (copy & replace fields)
```jsonc
{
  "id": "<CATEGORY-XXX>",
  "title": "<Creative title incorporating the logic of the transformation>",
  "description": "<Creative player-facing story about the task as it relates to the operations of ground control at the US Space Force>",
  "category": "<COM-XXX Communications / FS-XXX Fuel Systems / NAV-XXX Navigation / OS-XXX Oxygen Sensors / PL-XXX Pre-Launch / PWR-XXX Power Systems / SEC-XXX Security>",
  "difficulty": "Basic",
  "gridSize": 3,
  "timeLimit": null,
  "basePoints": 1500,
  "requiredRankLevel": 1,
  "emojiSet": "<EMOJI-SET-NAME>",
  "examples": [ /* two example objects */ ],
  "testInput": [ /* grid */ ],
  "testOutput": [ /* grid */ ],
  "hints": [
    "<Hint 1>",
    "<Hint 2>",
    "⬛ <background clarification>"
  ]
}
```

# ARC-AGI Transformation Types

## Geometric Transformations
- Rotation (90°, 180°, 270°)
- Reflection (horizontal, vertical, diagonal)
- Translation (moving objects)
- Scaling (resize objects)

## Pattern Operations
- Pattern completion
- Pattern extension
- Pattern repetition
- Sequence prediction

## Logical Operations
- AND operations
- OR operations
- XOR operations
- NOT operations
- Conditional logic

## Grid Operations
- Grid splitting (horizontal, vertical, quadrant)
- Grid merging
- Grid overlay
- Grid subtraction

## Object Manipulation
- Object counting
- Object sorting
- Object grouping
- Object filtering

## Spatial Relationships
- Inside/outside relationships
- Adjacent/touching relationships
- Containment relationships
- Proximity relationships

## Color Operations
- Color mapping
- Color replacement
- Color pattern matching
- Color logic operations

## Shape Operations
- Shape detection
- Shape transformation
- Shape combination
- Shape decomposition

## Rule Inference
- Single rule application
- Multiple rule application
- Rule interaction
- Rule generalization

## Abstract Reasoning
- Symbol interpretation
- Semantic relationships
- Conceptual mapping
- Abstract pattern recognition

### UI Components
- Game components in `client/src/components/game/`
- Use existing shadcn components for consistency
- Follow space theme with dark backgrounds and cyan accents

## API Endpoints

### Players
- `GET /api/players/:id` - Get player data
- `POST /api/players` - Create new player
- `POST /api/players/:id/validate-solution` - Submit task solution

### Tasks
- `GET /api/tasks` - Get all available tasks
- `GET /api/tasks/:id` - Get specific task



## Narrative Story Wrapper System

### Purpose
Adds a light-hearted Space-Force-2050 story layer to every ARC-AGI puzzle without touching core puzzle data.

### How It Works
1. `server/data/problems.json` – Holds every narrative template.  Keys are transformation types; each array contains one template per task **category** (O₂ Sensor Check, Pre-Launch Ops, Fuel Systems, Navigation, Communications, Power Systems, Security).
2. `server/data/antagonists.json` – List of mischievous characters (e.g. "Rick the Intern") that caused the mishap.
3. `server/data/components.json` – List of ship components the antagonist fiddled with.
4. `server/templates/storyTemplates.ts` – Loader that reads `problems.json` at runtime and exposes templates to the factory.
5. `server/tools/story-factory.ts` – Pure function that:
   - Randomly selects an antagonist + component.
   - Picks the correct template for the task’s `transformationType` + `category`.
   - Substitutes `{{antagonist}}` and `{{component}}` placeholders.
   - Returns an enriched task object ready for the API/UI.

### Updating Stories (Writers-Friendly)
- Open `server/data/problems.json`.
- Find the transformation type you want (e.g. `rotation_90deg`).
- Add or edit an object in the array with fields: `id`, `category`, `title`, `description`.
- Keep it short (<60-char title, <180-char description) and include placeholders where relevant.
- No code changes are needed – the loader will pick it up automatically.

---

## Future Enhancements

### Scalability Considerations
- Database migration from in-memory to persistent storage

### Feature Roadmap
- Unity port
- UI/UX improvements
- Officer track with complex transformations
