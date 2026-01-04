# Integration Tests

This directory contains integration tests for the NUXOA API client. These tests make real API calls to the NUXOA API and require valid credentials.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials and test data in `.env`:
   - `NUXOA_CUSTOMER_ID` - Your customer ID (required)
   - `NUXOA_API_KEY` - Your API key (required)
   - Various test IDs for specific endpoints

3. Run the integration tests:
   ```bash
   bun test tests/integration/
   ```

## Test Files

- `cloud.test.ts` - Tests for all 20 cloud server endpoints
- `dedicated.test.ts` - Tests for all 5 dedicated server endpoints
- `ip.test.ts` - Tests for all 6 IP subnet endpoints
- `domain.test.ts` - Tests for all 7 domain endpoints
- `dns.test.ts` - Tests for all 5 DNS zone endpoints
- `hosting.test.ts` - Tests for both hosting endpoints

## Important Notes

⚠️ **These tests make real API calls that can:**
- Create/delete servers
- Order services (may incur charges)
- Cancel contracts
- Modify DNS records
- Transfer domains

Always review the test data before running!

## Skipping Tests

If environment variables are not set, tests will be automatically skipped. You can also skip specific tests by removing the corresponding environment variables.

## Test Coverage

Total 45 endpoints across 6 categories:
- Cloud Server: 20 endpoints
- Dedicated Server: 5 endpoints
- IP Subnet: 6 endpoints
- Domain: 7 endpoints
- DNS: 5 endpoints
- Hosting: 2 endpoints
