import usePubsub from '../src/index'

const eventBus = usePubsub()

function main() {
  setInterval(() => {
    eventBus.publish('test', 'ping')
  }, 1000)
}

interface Subscriber {
  index: number
  count: number
  unsub?: () => void
}

let subscribers: Subscriber[] = new Array(100).fill(null).map((e, i) => {
  return {
    index: i,
    count: 0,
    unsub: null
  }
})

function test() {
  subscribers.forEach((e, i) => {
    e.unsub = eventBus.subscribe('test', (ping: string) => {
      e.count++
    })
  })
}

jest.useFakeTimers('modern')

it('pubSub', () => {
  main()
  test()
  
  jest.advanceTimersByTime(1100)
  subscribers.forEach(s => {
    expect(s.count).toBe(1)
  })
  
  jest.advanceTimersByTime(1100)
  subscribers.forEach(s => {
    expect(s.count).toBe(2)
  })
  
  jest.advanceTimersByTime(1100)
  subscribers.forEach(s => {
    expect(s.count).toBe(3)
  })
  
  // Unsubscribe index 69
  subscribers[69].unsub()
  
  jest.advanceTimersByTime(1100)
  expect(subscribers[69].count).toBe(3)
  expect(subscribers[0].count).toBe(4)
  expect(subscribers[50].count).toBe(4)
  
  // Unsubscribe index 70
  subscribers[70].unsub()
  jest.advanceTimersByTime(1100)
  expect(subscribers[70].count).toBe(4)
  expect(subscribers[0].count).toBe(5)
  expect(subscribers[50].count).toBe(5)
})
