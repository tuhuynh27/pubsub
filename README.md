![Node CI](https://github.com/oddx-team/pubsub/workflows/Node%20CI/badge.svg)

# Lightweight PubSub (4KBs)

Lightweight PubSub (4KBs) use for Browser and Node.js

## Development

Build:
```bash
npm run build
```

Run tests:
```bash
npm run test:unit
```

## Install

```bash
npm install @oddx/pubsub
```

## Usage

```typescript
import usePubsub from '@oddx/pubsub'

const eventBus = usePubsub()

function publisher() {
    let count = 0
    setInterval(() => {
        eventBus.publish('hello', 'world', 'here', count)
        count += 1
    }, 1000)
}

function subscriber() {
    const unsubscribe = eventBus.subscribe('hello', (d1: string, d2: string, d3: number) => {
        console.log(d1)
        console.log(d2)
        console.log(d3)
    })

    setTimeout(() => {
        unsubscribe()
    }, 3000)
}
```

## Usage for Deno

```typescript
import usePubSub from "https://raw.githubusercontent.com/oddx-team/pubsub/master/src/index.ts";

const eventBus = usePubSub();
```
