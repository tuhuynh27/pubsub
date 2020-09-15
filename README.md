![Node CI](https://github.com/oddx-team/pubsub/workflows/Node%20CI/badge.svg)

# Lightweight PubSub (4KB)

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
npm install oddx/pubsub
```

## Usage

```javascript
import usePubsub from 'oddx/pubsub'

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
