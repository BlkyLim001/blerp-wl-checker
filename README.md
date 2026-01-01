# The Miden Wars - Survival Economy Quiz Game

A full-stack web application for managing and playing The Miden Wars, a persistent survival economy quiz game where players compete to build massive stacks of Miden Points (MP).

## Features

### Phase 1: Entry & Validation
- Player registration system
- Entry bonus awarding (+100 MP for validated players)
- Decay penalty system (-40 MP for players who don't register)

### Phase 2: The Mining Phase (The Quiz)
- Real-time quiz system with 5 rounds
- First 3 correct answers receive +20 MP each
- Live leaderboard updates via WebSocket

### Phase 3: The Dark Market
- PvP market system
- Purchase shields (20 MP) to block attacks
- Purchase attacks (30 MP) to damage opponents
- 5-minute market window

### Phase 4: The Reveal & Persistence
- Automatic damage calculation
- War report generation
- Player elimination at 0 MP
- Persistent MP across sessions

## Tech Stack

- **Backend**: Node.js, Express, SQLite
- **Frontend**: React, React Router
- **Real-time**: Socket.io
- **Database**: SQLite3

## Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

## Running the Application

### Development Mode (Both Server and Client)
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- React frontend on `http://localhost:3000`

### Run Separately

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

## Usage Guide

### For Players

1. **Register**: Go to the home page and register with your name
2. **View Dashboard**: Check your MP, history, and status
3. **Enter Arena**: Join the active game session
4. **Answer Questions**: Submit answers during the Mining Phase (first 3 correct get +20 MP)
5. **Market Phase**: Purchase shields or attacks during the 5-minute window
6. **Survive**: Keep your MP above 0 to stay in the game!

### For Admins (The Banker, The Voice, Operators)

1. **Create Session**: Start a new weekly session
2. **Registration Phase**: 
   - Monitor registrations
   - Award entry bonuses (+100 MP)
   - Apply decay penalties (-40 MP)
3. **Mining Phase**: 
   - Post questions (5 rounds)
   - Monitor answers
   - Close questions when done
4. **Market Phase**: 
   - Open the market
   - Monitor transactions
   - Close market after 5 minutes
5. **Calculate Damage**: 
   - Process all attacks and shields
   - View war report
   - See eliminations

## Game Flow

1. **Registration** → Players register for the week
2. **Validation** → Players validate via Twitter (manual process)
3. **Entry Bonus** → Admin awards +100 MP to validated players
4. **Mining Phase** → 5 rounds of questions (10 min each)
5. **Market Open** → 5-minute PvP window
6. **Calculate Damage** → Process all transactions
7. **War Report** → Reveal results and eliminations
8. **Persistence** → MP carries over to next week

## Database

The application uses SQLite3 with the following main tables:
- `players` - Player information and MP
- `sessions` - Weekly game sessions
- `registrations` - Player registrations per session
- `questions` - Quiz questions
- `answers` - Player answers
- `transactions` - Market purchases (shields/attacks)
- `damage_log` - Damage calculation results
- `mp_history` - Complete MP change history

## API Endpoints

### Game
- `GET /api/game/session/current` - Get current session
- `GET /api/game/leaderboard` - Get leaderboard
- `POST /api/game/answer` - Submit answer
- `POST /api/game/purchase` - Purchase shield/attack

### Players
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get player by ID
- `POST /api/players/register` - Register new player
- `GET /api/players/:id/history` - Get MP history

### Admin
- `POST /api/admin/session/create` - Create session
- `POST /api/admin/session/register` - Register player
- `POST /api/admin/session/validate` - Validate registration
- `POST /api/admin/session/award-bonuses` - Award entry bonuses
- `POST /api/admin/session/apply-decay` - Apply decay penalty
- `POST /api/admin/question/post` - Post question
- `POST /api/admin/question/close` - Close question
- `POST /api/admin/session/status` - Update session status
- `POST /api/admin/session/process-damage` - Process damage
- `GET /api/admin/session/:id/war-report` - Get war report

## Notes

- The Twitter validation step is manual (as per the game rules)
- Operators (Legacy for shields, Prince for attacks) would need to be integrated separately if using DM-based transactions
- The current implementation allows direct purchases through the web interface
- All MP changes are logged in the `mp_history` table for audit purposes

## License

MIT

