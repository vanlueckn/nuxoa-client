# nuxoa-client

[![npm version](https://img.shields.io/npm/v/nuxoa-client.svg)](https://www.npmjs.com/package/nuxoa-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> ⚠️ **Unofficial**: This is a community-made client and is not officially affiliated with or endorsed by NUXOA.

TypeScript client for the [NUXOA](https://nuxoa.de) API. Manage cloud servers, dedicated servers, domains, DNS records, hosting, and IP addresses programmatically.

## Installation

```bash
# npm
npm install nuxoa-client

# yarn
yarn add nuxoa-client

# pnpm
pnpm add nuxoa-client

# bun
bun add nuxoa-client
```

## Quick Start

```typescript
import { NuxoaClient } from 'nuxoa-client';

const client = new NuxoaClient({
  customerId: 'your-customer-id',
  apiKey: 'your-api-key',
});

// List all cloud servers
const servers = await client.cloud.list();
console.log(servers);
```

## Configuration

```typescript
interface NuxoaClientConfig {
  customerId: string;   // Your NUXOA customer ID
  apiKey: string;       // Your NUXOA API key
  baseUrl?: string;     // Optional: Custom API base URL
}
```

## API Reference

The client provides access to the following endpoints:

### Cloud Servers (`client.cloud`)

Manage virtual cloud servers.

```typescript
// List all cloud servers
const servers = await client.cloud.list();

// Get a specific server
const server = await client.cloud.get(serverId);

// Start a server
await client.cloud.start(serverId);

// Stop a server
await client.cloud.stop(serverId);

// Restart a server
await client.cloud.restart(serverId);

// Reinstall a server
await client.cloud.reinstall(serverId, { os: 'ubuntu-22.04' });
```

### Dedicated Servers (`client.dedicated`)

Manage dedicated servers.

```typescript
// List all dedicated servers
const servers = await client.dedicated.list();

// Get a specific server
const server = await client.dedicated.get(serverId);

// Restart a server
await client.dedicated.restart(serverId);
```

### Domains (`client.domain`)

Manage domain registrations.

```typescript
// List all domains
const domains = await client.domain.list();

// Get domain details
const domain = await client.domain.get(domainId);

// Check domain availability
const available = await client.domain.check('example.com');
```

### DNS (`client.dns`)

Manage DNS zones and records.

```typescript
// List DNS zones
const zones = await client.dns.listZones();

// Get zone details
const zone = await client.dns.getZone(zoneId);

// List records in a zone
const records = await client.dns.listRecords(zoneId);

// Create a DNS record
await client.dns.createRecord(zoneId, {
  type: 'A',
  name: 'www',
  content: '192.0.2.1',
  ttl: 3600,
});

// Update a DNS record
await client.dns.updateRecord(zoneId, recordId, {
  content: '192.0.2.2',
});

// Delete a DNS record
await client.dns.deleteRecord(zoneId, recordId);
```

### Hosting (`client.hosting`)

Manage web hosting packages.

```typescript
// List hosting packages
const packages = await client.hosting.list();

// Get hosting details
const hosting = await client.hosting.get(hostingId);
```

### IP Addresses (`client.ip`)

Manage IP address allocations.

```typescript
// List IP addresses
const ips = await client.ip.list();

// Get IP details
const ip = await client.ip.get(ipId);
```

## Error Handling

The client throws `NuxoaApiError` for API errors:

```typescript
import { NuxoaClient, NuxoaApiError } from 'nuxoa-client';

try {
  await client.cloud.get('invalid-id');
} catch (error) {
  if (error instanceof NuxoaApiError) {
    console.error('API Error:', error.message);
    console.error('Status:', error.statusCode);
    console.error('Response:', error.response);
  }
}
```

## TypeScript Support

This package includes full TypeScript type definitions. All request and response types are exported:

```typescript
import type {
  CloudServer,
  DedicatedServer,
  Domain,
  DnsZone,
  DnsRecord,
  HostingPackage,
  IpAddress,
} from 'nuxoa-client';
```

## Requirements

- Node.js 18+ or Bun
- ESM or CommonJS environments supported

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning:

- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `feat!:` or `BREAKING CHANGE:` - Breaking changes (major version bump)

## License

[MIT](LICENSE)

## Links

- [NUXOA Website](https://nuxoa.de)
- [API Documentation](https://manager.nuxoa.de/api/docs)
- [npm Package](https://www.npmjs.com/package/nuxoa-client)
- [GitHub Repository](https://github.com/vanlueckn/nuxoa-client)
