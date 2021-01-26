![Node CI](https://github.com/oddx-team/pubsub/workflows/Node%20CI/badge.svg)

# Tiny PubSub (0.3KB)

Lightweight (335 Bytes gzipped) publish/subscribe library written in TypeScript, use for Browser and Node.js / Deno

## Features

- No dependency
- Tiny size, just 335 Bytes (less than 1KB) minified and gzipped
- TypeScript with static types
- Functional style with Closure

## Install

```bash
npm install @reactif/pubsub
```

## Usage

```typescript
import usePubSub from '@reactif/pubsub'

const eventBus = usePubSub()

function publisher() {
    let count = 0
    setInterval(() => {
        eventBus.publish('hello', count)
        count += 1
    }, 1000)
}

function subscriber() {
    const unsubscribe = eventBus.subscribe('hello', (d1: string, d2: number) => {
        console.log(d1)
        console.log(d2)
    })

    eventBus.subscribeOnce('hello', (d1: string) => {
        console.log(d1)
    })

    setTimeout(() => {
        unsubscribe()
    }, 3000)
}

// Clear all subscribers
eventBus.clearAllSubscriptions('hello')

// Count all subscribers
const count = eventBus.countSubscription('hello') // count: number
```

## Usage for Deno

```typescript
import usePubSub from 'https://raw.githubusercontent.com/oddx-team/pubsub/master/src/index.ts'

const eventBus = usePubSub()
eventBus.subscribe('time', (data: number) => {
  console.log(data)
})

setInterval(() => {
  eventBus.publish('time', new Date().getTime())
}, 100)
```
