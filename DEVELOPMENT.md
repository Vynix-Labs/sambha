# Sambha Development Guide

This document provides comprehensive information about setting up and working
with the Sambha monorepo.

## 🏗️ Project Structure

```
sambha/
├── apps/                    # Applications
│   ├── backend/            # Node.js API server (Hono)
│   ├── web/               # Web application (Next.js)
│   ├── mobile/            # React Native mobile app
│   ├── landing/           # Landing page (Next.js)
│   └── contracts/         # Cairo smart contracts
├── packages/              # Shared packages
│   ├── ui/               # Shared UI components
│   ├── eslint-config/    # ESLint configuration
│   └── typescript-config/ # TypeScript configuration
├── scripts/              # Development scripts
├── .github/              # CI/CD workflows
└── docker-compose.yml    # Development environment
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9.0.0+
- Docker & Docker Compose
- Scarb (Cairo package manager)
- Starknet Foundry

### Automated Setup

Run the automated setup script to configure your development environment:

```bash
./scripts/setup-dev.sh
```

This script will:

- Install required tools
- Set up environment files
- Install dependencies
- Initialize the database
- Build contracts
- Start infrastructure services

### Manual Setup

If you prefer manual setup:

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment files:**

   ```bash
   cp .env.example .env
   cp apps/backend/.env.example apps/backend/.env.local
   cp apps/web/.env.example apps/web/.env.local
   ```

3. **Start infrastructure services:**

   ```bash
   docker-compose up -d mongodb redis starknet-devnet
   ```

4. **Build shared packages:**

   ```bash
   pnpm run build --filter="./packages/*"
   ```

5. **Build Cairo contracts:**
   ```bash
   pnpm run build:contracts
   ```

## 🛠️ Development Commands

### Root Level Commands

```bash
# Start all applications in development mode
pnpm run dev

# Build all applications and packages
pnpm run build

# Run all tests
pnpm run test

# Lint all code
pnpm run lint

# Format all code
pnpm run format

# Type check all code
pnpm run type-check

# Clean all build artifacts
pnpm run clean
```

### Application-Specific Commands

```bash
# Backend
pnpm run dev:backend
pnpm --filter backend build
pnpm --filter backend test

# Web App
pnpm run dev:web
pnpm --filter web build
pnpm --filter web test

# Mobile App
pnpm run dev:mobile
pnpm --filter mobile build
pnpm --filter mobile test

# Landing Page
pnpm run dev:landing
pnpm --filter landing build
pnpm --filter landing test

# Cairo Contracts
pnpm run build:contracts
pnpm run test:contracts
```

### Helper Scripts

```bash
# Start complete development environment
./scripts/dev.sh

# Run all tests (including contracts)
./scripts/test-all.sh

# Build all components
./scripts/build-all.sh
```

## 🧪 Testing Strategy

### Testing Pyramid

1. **Unit Tests** - Test individual functions and components
2. **Integration Tests** - Test API endpoints and database interactions
3. **E2E Tests** - Test complete user workflows
4. **Contract Tests** - Test Cairo smart contracts

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific app
pnpm --filter backend test
pnpm --filter web test

# Run contract tests
pnpm test:contracts

# Run tests with coverage
pnpm test -- --coverage

# Run tests in watch mode
pnpm test -- --watch
```

### Cairo Contract Testing

```bash
# Run Scarb tests
cd apps/contracts
scarb test

# Run Starknet Foundry tests
snforge test

# Run tests with gas profiling
snforge test --gas
```

## 🐳 Docker Development

### Full Stack with Docker

```bash
# Start all services
docker-compose up

# Start specific services
docker-compose up mongodb redis starknet-devnet

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build
```

### Individual Dockerfiles

Each application has its own Dockerfile for containerization:

- `apps/backend/Dockerfile` - Backend API
- `apps/web/Dockerfile` - Web application
- `apps/landing/Dockerfile` - Landing page

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Runs on every push and PR
   - Tests all applications and contracts
   - Performs linting and type checking
   - Builds Docker images
   - Security auditing

2. **Deploy Workflow** (`.github/workflows/deploy.yml`)
   - Deploys to staging on main branch
   - Deploys to production on tags
   - Manual deployment option

### Workflow Features

- **Change Detection** - Only runs tests/builds for changed components
- **Parallel Execution** - Tests run in parallel for speed
- **Caching** - Dependencies and build artifacts are cached
- **Security** - Dependency auditing and vulnerability scanning

## 📦 Package Management

### Workspace Configuration

The monorepo uses pnpm workspaces configured in `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Adding Dependencies

```bash
# Add to root (affects all packages)
pnpm add -w package-name

# Add to specific app
pnpm --filter backend add package-name

# Add dev dependency
pnpm --filter web add -D package-name

# Add shared package dependency
pnpm --filter backend add @sambha/ui
```

### Turborepo Configuration

Turborepo handles task orchestration and caching. Configuration in `turbo.json`:

- **build** - Builds applications with proper dependencies
- **dev** - Starts development servers
- **test** - Runs tests with build dependencies
- **lint** - Lints code
- **type-check** - Type checks TypeScript

## 🔧 Environment Configuration

### Environment Files

- `.env` - Root environment variables
- `apps/*/env.local` - Application-specific environment
- `.env.example` - Template files for reference

### Required Environment Variables

#### Backend (`apps/backend/.env.local`)

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/sambha
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
STARKNET_PRIVATE_KEY=0x...
STARKNET_RPC_URL=http://localhost:5050
```

#### Web App (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STARKNET_NETWORK=goerli
NEXT_PUBLIC_STARKNET_RPC_URL=http://localhost:5050
```

## 🗄️ Database Setup

### MongoDB

Development database runs in Docker with initialization script:

```javascript
// scripts/mongo-init.js
db = db.getSiblingDB("sambha");

// Collections and indexes are created automatically
```

### Redis

Used for caching and session storage. Runs in Docker container.

## ⚡ StarkNet Development

### Local StarkNet Node

```bash
# Start StarkNet devnet
docker-compose up -d starknet-devnet

# Access at http://localhost:5050
```

### Contract Development

```bash
# Navigate to contracts
cd apps/contracts

# Build contracts
scarb build

# Run tests
scarb test

# Format code
scarb fmt

# Check syntax
scarb check
```

### Deployment

```bash
# Deploy to local devnet
sncast deploy --url http://localhost:5050

# Deploy to testnet
sncast deploy --url https://starknet-goerli.infura.io/v3/YOUR_KEY
```

## 🔍 Debugging

### Application Debugging

- **Backend**: Use VS Code debugger or `console.log`
- **Web/Landing**: Browser DevTools and Next.js built-in debugging
- **Mobile**: React Native Flipper or Metro debugger

### Contract Debugging

```bash
# Run with verbose output
scarb test --verbose

# Debug with Starknet Foundry
snforge test --debug
```

### Database Debugging

```bash
# Connect to MongoDB
docker exec -it sambha-mongodb mongosh

# Connect to Redis
docker exec -it sambha-redis redis-cli
```

## 📋 Code Quality

### Linting and Formatting

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Scarb fmt** - Cairo code formatting

### Pre-commit Hooks

Husky runs pre-commit hooks for:

- Linting
- Type checking
- Formatting
- Test running

### Code Standards

- Use TypeScript for all JavaScript code
- Follow conventional commit messages
- Write tests for new features
- Document complex functions
- Use proper error handling

## 🚨 Troubleshooting

### Common Issues

1. **Dependencies not installing**

   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **Turbo cache issues**

   ```bash
   pnpm turbo clean
   ```

3. **Docker services not starting**

   ```bash
   docker-compose down
   docker-compose up --build
   ```

4. **Scarb build failing**
   ```bash
   cd apps/contracts
   scarb clean
   scarb build
   ```

### Getting Help

- Check the [Requirements Document](requirements.md)
- Review application-specific READMEs
- Check GitHub Issues
- Contact the team on Discord

## 🎯 Next Steps

1. **Review the codebase** - Familiarize yourself with the structure
2. **Run the tests** - Ensure everything works locally
3. **Make a small change** - Test the development workflow
4. **Read the requirements** - Understand the product vision
5. **Start contributing** - Pick up an issue and start coding!

Happy coding! 🚀
